/**
 * Minimal Fastify server for Appsail
 * - Serves prerendered Astro output from ../public
 * - Mounts /api/* endpoints
 * - Implements SPA-style fallback so route URLs (e.g. /blog/x) resolve to index.html
 *
 * Start: node ./server/index.js
 */

import Fastify from 'fastify';
import { fileURLToPath } from 'node:url';
import { dirname, join, normalize, extname } from 'node:path';
import { promises as fs } from 'node:fs';
import { createReadStream } from 'node:fs';
import mime from 'mime';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = Fastify({ logger: true });
const publicDir = join(__dirname, '..', 'public');

// Helper: sanitize path to avoid directory traversal
function safeJoin(base, requested) {
  const normalized = normalize(`/${requested}`).replace(/^\/+/, ''); // ensure leading slash then strip
  return join(base, normalized);
}

async function sendStatic(reply, absPath) {
  try {
    const stat = await fs.stat(absPath);
    if (!stat.isFile()) return reply.code(404).send({ error: 'Not found' });
    const ctype = mime.getType(extname(absPath)) || 'application/octet-stream';
    reply.header('Content-Type', ctype);
    return reply.send(createReadStream(absPath));
  } catch {
    return reply.code(404).send({ error: 'Not found' });
  }
}

// Example API route (expand with your logic)
app.get('/api/catalyst-health', async () => {
  return { status: 'ok', ts: new Date().toISOString() };
});

// 1) Serve exact static files when they exist (assets, images, css, js, etc.)
app.get('/*', async (req, reply) => {
  const urlPath = (req.params['*'] || '').trim();

  // Default root to index.html
  if (urlPath === '') {
    const indexPath = join(publicDir, 'index.html');
    return sendStatic(reply, indexPath);
  }

  // Attempt to serve the requested file
  const abs = safeJoin(publicDir, urlPath);
  try {
    const st = await fs.stat(abs);
    if (st.isFile()) return sendStatic(reply, abs);
  } catch {
    // ignore and fall through to SPA fallback
  }

  // 2) If not a file, attempt route-to-file mapping used by Astro SSG:
  //    - If request ends with '/', map to {path}/index.html
  //    - Else map to {path}/index.html (common for directory-style routes)
  const maybeIndex = safeJoin(
    publicDir,
    `${urlPath.endsWith('/') ? urlPath : `${urlPath}/`}index.html`
  );
  try {
    const st2 = await fs.stat(maybeIndex);
    if (st2.isFile()) return sendStatic(reply, maybeIndex);
  } catch {
    // ignore and fall through
  }

  // 3) SPA fallback: serve root index.html for client-side routers and unknown routes
  const rootIndex = join(publicDir, 'index.html');
  return sendStatic(reply, rootIndex);
});

const port = Number(process.env.PORT || 8080);
const host = '0.0.0.0';

app
  .listen({ port, host })
  .then(() => {
    app.log.info(`Server running on http://${host}:${port}`);
    app.log.info(`Serving static from: ${publicDir}`);
  })
  .catch((err) => {
    app.log.error(err);
    process.exit(1);
  });
