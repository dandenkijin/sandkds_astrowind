/**
 * Catalyst SDK initializer.
 * Centralizes creation of the Zoho Catalyst client for AppSail/Node runtimes.
 *
 * Usage:
 *   import catalyst from './catalyst';
 *   const app = catalyst(req); // pass the raw request object in HTTP handlers
 */
 
import catalystSDK from 'zcatalyst-sdk-node';
import type { CatalystApp as ZCatalystApp } from 'zcatalyst-sdk-node/lib/catalyst-app';

/**
 * Re-export the SDK's CatalystApp type to avoid mismatches.
 */
export type CatalystApp = ZCatalystApp;

/**
 * Guard lists for prototype pollution prevention in dynamic path usage.
 */
const POLLUTION_SEGMENTS = new Set(['__proto__', 'prototype', 'constructor']);

/**
 * Split a path into safe tokens supporting dot and bracket notation.
 * Examples:
 *   "a.b[0].c" -> ["a","b","0","c"]
 *   ["a","b.c","__proto__"] -> ["a","b","c","__proto__"]
 */
export function tokenizePath(path: string | string[]): string[] {
  const raw = Array.isArray(path) ? path.flatMap((s) => String(s).split('.')) : String(path).split('.');
  const tokens: string[] = [];
  for (const t of raw) {
    // No need to escape brackets inside a character class for this rule set
    const parts = String(t).split(/[[\]]+/).filter(Boolean);
    tokens.push(...parts);
  }
  return tokens.filter(Boolean);
}

/**
 * Runtime guard against prototype pollution keys in dynamic paths.
 * Throws when encountering "__proto__", "prototype", or "constructor" (and constructor.prototype).
 */
export function rejectPrototypePollutionSegments(path: string | string[]): void {
  const tokens = tokenizePath(path);
  for (const s of tokens) {
    if (POLLUTION_SEGMENTS.has(s)) {
      throw new Error(`Blocked unsafe path segment: ${s}`);
    }
    if (/^constructor(\.prototype)?$/i.test(s)) {
      throw new Error(`Blocked unsafe path pattern: ${s}`);
    }
  }
}

/**
 * Minimal safe deep-set that avoids prototype pollution by validating each segment
 * and only creating plain objects.
 */
export function safeSet<T extends Record<string, unknown>>(
  target: T,
  path: string | string[],
  value: unknown
): T {
  rejectPrototypePollutionSegments(path);
  const segments = tokenizePath(path);
  // Use an index signature to avoid 'any'
  let cursor: Record<string, unknown> = target as Record<string, unknown>;
  for (let i = 0; i < segments.length; i++) {
    const key = segments[i] as string;
    if (i === segments.length - 1) {
      cursor[key] = value;
    } else {
      const next = cursor[key];
      if (typeof next !== 'object' || next === null || Array.isArray(next)) {
        cursor[key] = {};
      }
      cursor = cursor[key] as Record<string, unknown>;
    }
  }
  return target;
}

/**
 * Dev/test sanity check: detect if Object prototype is polluted.
 * Call in development or tests to fail fast if pollution occurs.
 */
export function assertNotPolluted(): void {
  // Access via typed index signature to avoid using 'any'
  const proto = Object.prototype as Record<string, unknown>;
  if (typeof proto.__polluted_marker__ !== 'undefined') {
    throw new Error('Prototype pollution detected at runtime');
  }
}

/**
 * Initialize Catalyst using the request-scoped initializer.
 * The SDK v3 expects a generic object (often the raw request) with headers/env context.
 */
export default function catalyst(req?: unknown): CatalystApp {
  // Prefer request-scoped initialization (recommended for web apps)
  return catalystSDK.initialize((req as Record<string, unknown>) ?? ({} as Record<string, unknown>));
}

