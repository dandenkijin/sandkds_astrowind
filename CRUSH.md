# CRUSH.md

Repo: AstroWind (Astro 5 + Tailwind + Svelte + TinaCMS)

Build/dev
- Dev: npm run dev
- Start (alias): npm run start
- Build: npm run build
- Preview local build: npm run preview
- Tina dev (CMS + Astro): npm run tina-dev
- Tina build (generate + build site): npm run tina-build

Lint/format/typecheck
- Full check (types + eslint + prettier): npm run check
- Typecheck (Astro diagnostics): npm run check:astro
- Lint: npm run check:eslint
- Format check: npm run check:prettier
- Autofix lint: npm run fix:eslint
- Autofix format: npm run fix:prettier
- Autofix all: npm run fix

Tests
- No test runner configured. If adding Vitest: npm i -D vitest @vitest/coverage-v8; add scripts: "test", "test:watch", and run: npx vitest path/to/file.test.ts. Update this file after adding.

Code style
- Language: TypeScript (tsconfig extends astro/base; strictNullChecks on). Path alias ~/* -> src/*
- Lint: ESLint flat config with eslint-plugin-astro and typescript-eslint. Prefer-const disabled; unused vars must be prefixed with _; TS non-null allowed.
- Formatting: Prettier (printWidth 120, semi true, singleQuote true, trailingComma es5). Use prettier-plugin-astro; .astro files parsed by Astro.
- Imports: Use type-only imports when possible; prefer absolute via ~/* for src; keep side-effect CSS imports minimal; group std/lib/local in that order.
- Components: Astro for pages/layouts, Svelte for interactive widgets. Co-locate assets under src/components/**. Use PascalCase for components, camelCase for vars/functions, SCREAMING_SNAKE_CASE for const enums.
- Types: Define shared .d.ts in src/types; avoid any; use unknown + narrow; prefer readonly and const assertions.
- Errors: Never swallow; return Result-like unions or throw with message + cause; handle async with try/catch and narrow error type.
- Content: MD/MDX under src/data or src/content; frontmatter validated via content/config.ts.
- CSS: Tailwind first; global in src/styles/global.css; prefer utility classes; use tailwind-merge for dynamic classnames.

CI/CD
- Node 18/20/21 supported; Netlify/Vercel configs present; run npm run build for deploy.

Cursor/Copilot rules
- None found (.cursor/rules, .cursorrules, .github/copilot-instructions.md not present). Add here if introduced later.
