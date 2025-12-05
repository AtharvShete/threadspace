# Dependency migration

Updated December 5, 2025. Selected direct package releases were available by December 5, 2025; these pins are a historical compatibility target rather than a claim that they are the latest releases. The lockfile records the full resolved dependency tree.

## Historical version limitations

Next.js 15.5.7 received later security fixes documented in the [December 11, 2025 advisory](https://nextjs.org/blog/security-update-2025-12-11). Upgrade to a currently patched version before publishing this snapshot as a live application. The existing Vercel deployment and its environment variables have not been changed.

## Next.js 13 to 15.5.7

- Followed the [Next.js 15 upgrade guide](https://nextjs.org/docs/app/guides/upgrading/version-15).
- Await dynamic route `params` and home page `searchParams`.
- Removed the obsolete `experimental.appDir` option.
- Replaced the deprecated `next lint` command with ESLint directly.
- Kept React on 18.3.1, within Next.js 15.5.7's declared peer range and compatible with the existing Mantine 6 and TanStack Query 4 dependencies.

## Tailwind CSS 3 to 4.1.17

- Followed the [Tailwind upgrade guide](https://tailwindcss.com/docs/upgrade-guide). [Tailwind 4.1](https://tailwindcss.com/blog/tailwindcss-v4-1) was released April 3, 2025.
- Use `@tailwindcss/postcss`; remove the standalone Autoprefixer dependency.
- Replace `@tailwind` directives with `@import 'tailwindcss'`.
- Load the existing theme and animation/typography plugins explicitly with `@config`.
- Define container padding and centering with `@utility`, because v4 removed the old container configuration.
- Preserve class-based dark mode with `@custom-variant`.
- Update outline, shadow, and flex utility names where their v4 behavior changed.
- Update tailwind-merge to 3.4.0 for the v4 utility vocabulary.
- Tailwind v4 targets modern browsers: Safari 16.4+, Chrome 111+, and Firefox 128+.

## Prisma 4 to 6.19.0

- Followed the [Prisma 5](https://www.prisma.io/docs/guides/upgrade-prisma-orm/v5) and [Prisma 6](https://www.prisma.io/docs/guides/upgrade-prisma-orm/v6) upgrade guides.
- Upgrade `prisma` and `@prisma/client` together and regenerate the client.
- The existing schema uses explicit join models, no `Bytes` fields, and no full-text-search preview flag; the corresponding v6 migrations do not apply.
- No database changes are needed for the branding and feed sorting work. Do not reset an existing database during this upgrade.

## Verification

```bash
yarn install --frozen-lockfile
yarn prisma validate
yarn prisma generate
yarn test
yarn typecheck
yarn lint
yarn build
```

Provide environment variables and running services to verify database-backed feeds, Google authentication, Redis, and uploads. A production build also requires access to the configured Google font.

## Rollback

Revert the dependency migration commit, then run `yarn install --frozen-lockfile` and `yarn prisma generate`. Keep package.json, yarn.lock, routing changes, and Tailwind configuration together when reverting. This migration does not alter stored data.

The original Git history is preserved locally in `.git/history-backups/before-reset-2026-10-05.bundle`.
