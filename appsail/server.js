/**
 * Zero-dependency static server for AppSail.
 * Serves the Astro static build from ../dist on PORT (default 8080).
 * No SPA history fallback: unknown non-file routes return 404.
 * Added verbose diagnostics for AppSail runtime troubleshooting.
 */
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Resolve the Astro build output directory (root/dist)
const ROOT = path.resolve(__dirname, '..');
// In AppSail, our working dir is /catalyst (appsail/). The Astro build output we need is:
//  - either copied into appsail/public by the prepare step, or
//  - available at ../dist at runtime if the platform preserves it (often it doesn't).
// Prefer appsail/public (mounted during deploy by appsail:prepare), then fallback to ../dist.
const PREFERRED = path.join(__dirname, 'public');
const FALLBACK = path.join(ROOT, 'dist');
const DIST = fs.existsSync(PREFERRED) ? PREFERRED : FALLBACK;
// eslint-disable-next-line no-console
console.log('[boot] __dirname:', __dirname, '| ROOT:', ROOT, '| PREFERRED:', PREFERRED, '| FALLBACK:', FALLBACK, '| DIST Selected:', DIST);

// Minimal content-type map
const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.cjs': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.wasm': 'application/wasm',
  '.map': 'application/json; charset=utf-8',
  '.avif': 'image/avif',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.otf': 'font/otf'
};

function contentTypeFor(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  return MIME[ext] || 'application/octet-stream';
}

function safeDecodeURI(urlPath) {
  try {
    return decodeURI(urlPath);
  } catch {
    return urlPath;
  }
}

function isPathInside(child, parent) {
  const rel = path.relative(parent, child);
  return !!rel && !rel.startsWith('..') && !path.isAbsolute(rel);
}

function send(res, status, headers, bodyStreamOrBuffer) {
  res.writeHead(status, headers);
  if (bodyStreamOrBuffer instanceof fs.ReadStream) {
    bodyStreamOrBuffer.pipe(res);
  } else if (bodyStreamOrBuffer) {
    res.end(bodyStreamOrBuffer);
  } else {
    res.end();
  }
}

function sendError(res, status, message) {
  const body = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>${status}</title></head><body><h1>${status}</h1><p>${message}</p></body></html>`;
  send(res, status, { 'Content-Type': 'text/html; charset=utf-8' }, body);
}

function tryStat(p) {
  try {
    return fs.statSync(p);
  } catch {
    return null;
  }
}

// Startup diagnostics
(function startupDiagnostics() {
  try {
    // eslint-disable-next-line no-console
    console.log('[diag] CWD:', process.cwd());
    // eslint-disable-next-line no-console
    console.log('[diag] __dirname:', __dirname);
    // eslint-disable-next-line no-console
    console.log('[diag] ROOT:', ROOT);
    // eslint-disable-next-line no-console
    console.log('[diag] DIST:', DIST);
    const distStat = tryStat(DIST);
    // eslint-disable-next-line no-console
    console.log('[diag] DIST exists:', !!distStat, distStat ? (distStat.isDirectory() ? 'dir' : 'file') : 'missing');

    // Log which path was selected
    // eslint-disable-next-line no-console
    console.log('[diag] DIST resolved from:', fs.existsSync(PREFERRED) ? 'appsail/public' : '../dist');

    // List a few top-level files/dirs to confirm packaging
    const listRoot = fs.existsSync(ROOT) ? fs.readdirSync(ROOT).slice(0, 50) : [];
    const listPreferred = fs.existsSync(PREFERRED) ? fs.readdirSync(PREFERRED).slice(0, 50) : [];
    const listFallback = fs.existsSync(FALLBACK) ? fs.readdirSync(FALLBACK).slice(0, 50) : [];
    // eslint-disable-next-line no-console
    console.log('[diag] ROOT contents sample:', listRoot);
    // eslint-disable-next-line no-console
    console.log('[diag] PREFERRED (appsail/public) contents sample:', listPreferred);
    // eslint-disable-next-line no-console
    console.log('[diag] FALLBACK (../dist) contents sample:', listFallback);

    // Ensure a static health file exists in DIST if the directory exists
    const healthPath = path.join(DIST, 'health.txt');
    try {
      const distExists = fs.existsSync(DIST) && tryStat(DIST)?.isDirectory();
      if (!distExists) {
        // eslint-disable-next-line no-console
        console.warn('[diag] DIST directory is missing; health file will not be created. DIST:', DIST);
      } else if (!fs.existsSync(healthPath)) {
        fs.writeFileSync(healthPath, 'ok', 'utf8');
        // eslint-disable-next-line no-console
        console.log('[diag] Created health file at', healthPath);
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn('[diag] Could not create health file (non-fatal):', e?.message || e);
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('[diag] Startup diagnostics failed:', e);
  }
})();

const server = http.createServer((req, res) => {
  const start = Date.now();
  // Normalize and sanitize URL
  const urlObj = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`);
  let reqPath = safeDecodeURI(urlObj.pathname);

  // Root-path workaround: serve a small redirect file that points to /index.html.
  // This avoids relying on any upstream rewrite/default-doc behavior.
  if (reqPath === '/' || reqPath === '') {
    const redirectPath = path.join(DIST, 'redirect.html');
    const redirectStat = tryStat(redirectPath);
    if (redirectStat?.isFile()) {
      const stream = fs.createReadStream(redirectPath);
      // eslint-disable-next-line no-console
      console.log('[req]', req.method, req.url, '-> 200 (root redirect)', redirectPath);
      return send(res, 200, { 'Content-Type': contentTypeFor(redirectPath) }, stream);
    }
    // Fallback to index.html if redirect.html is not present
    const indexPath = path.join(DIST, 'index.html');
    const indexStat = tryStat(indexPath);
    if (indexStat?.isFile()) {
      const stream = fs.createReadStream(indexPath);
      // eslint-disable-next-line no-console
      console.log('[req]', req.method, req.url, '-> 200 (forced index fallback)', indexPath);
      return send(res, 200, { 'Content-Type': contentTypeFor(indexPath) }, stream);
    }
    // eslint-disable-next-line no-console
    console.warn('[req]', req.method, req.url, '-> 500 (no redirect.html or index.html)', redirectPath);
    return sendError(res, 500, 'Index not found');
  }

  // Handle static health endpoint without SSR/API
  if (reqPath === '/health.txt' || reqPath === '/health' || reqPath === '/status') {
    const body = 'ok';
    // eslint-disable-next-line no-console
    console.log('[req]', req.method, req.url, '-> 200 (static health)', `${Date.now() - start}ms`);
    return send(res, 200, { 'Content-Type': 'text/plain; charset=utf-8', 'Content-Length': Buffer.byteLength(body).toString() }, body);
  }

  // Prevent directory traversal
  const joined = path.join(DIST, reqPath);
  const resolved = path.resolve(joined);

  if (!isPathInside(resolved, DIST) && path.resolve(resolved) !== path.resolve(DIST)) {
    // eslint-disable-next-line no-console
    console.warn('[req]', req.method, req.url, '-> 403 Forbidden (path traversal)', { resolved, DIST });
    return sendError(res, 403, 'Forbidden');
  }

  let stat = tryStat(resolved);

  // If path is a directory, attempt to serve index.html
  if (stat?.isDirectory()) {
    const indexPath = path.join(resolved, 'index.html');
    const indexStat = tryStat(indexPath);
    if (indexStat?.isFile()) {
      const stream = fs.createReadStream(indexPath);
      // eslint-disable-next-line no-console
      console.log('[req]', req.method, req.url, '-> 200', indexPath, `${Date.now() - start}ms`);
      return send(res, 200, { 'Content-Type': contentTypeFor(indexPath) }, stream);
    }
    // eslint-disable-next-line no-console
    console.warn('[req]', req.method, req.url, '-> 403 Directory listing forbidden', resolved, `${Date.now() - start}ms`);
    return sendError(res, 403, 'Directory access is forbidden');
  }

  // If file exists, serve it
  if (stat?.isFile()) {
    const ctype = contentTypeFor(resolved);
    const stream = fs.createReadStream(resolved);
    // eslint-disable-next-line no-console
    console.log('[req]', req.method, req.url, '-> 200', resolved, ctype, `${Date.now() - start}ms`);
    return send(res, 200, { 'Content-Type': ctype }, stream);
  }

  // No SPA fallback per your instruction — return 404
  // eslint-disable-next-line no-console
  console.warn('[req]', req.method, req.url, '-> 404 Not Found', resolved, `${Date.now() - start}ms`);
  return sendError(res, 404, 'Not Found');
});

const PORT = Number.parseInt(process.env.PORT || '8080', 10);
server.listen(PORT, '0.0.0.0', () => {
  // eslint-disable-next-line no-console
  console.log(`[diag] Static server listening on http://0.0.0.0:${PORT}`);
  // eslint-disable-next-line no-console
  console.log(`[diag] Serving DIST: ${DIST} (${fs.existsSync(path.join(__dirname, 'public')) ? 'appsail/public' : '../dist'})`);
});
