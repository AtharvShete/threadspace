# Threadspace

A community discussion app maintained by Atharv Shete. Find your people, share ideas, and join thoughtful conversations.

## Features

- Community creation and subscriptions
- Personalized feeds and infinite scrolling
- Newest and most-discussed feed sorting
- Indigo styling, responsive navigation, and a community-focused home page
- Google sign-in with NextAuth
- Rich post editing with images and link previews
- Post and comment voting
- Nested comments and replies
- Optimistic updates with TanStack Query
- PostgreSQL storage through Prisma and caching with Upstash Redis

## Local setup

Clone this repository and install dependencies:

Use Node.js 22.18 or newer and Yarn 1.22.22. The test command uses Node's built-in TypeScript support.

```bash
git clone https://github.com/AtharvShete/reddit-clone.git
cd reddit-clone
yarn install
```

Create a `.env` file in the project root and supply your own service credentials:

```dotenv
DATABASE_URL=postgresql://USER:PASSWORD@HOST:5432/DATABASE
NEXTAUTH_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
UPLOADTHING_SECRET=
UPLOADTHING_APP_ID=
REDIS_URL=
REDIS_SECRET=
```

Configure a Google OAuth web application with `http://localhost:3000/api/auth/callback/google` as a redirect URI. The app also uses UploadThing for uploads and Upstash Redis for caching. Keep credentials out of version control.

Initialize the database schema and start the development server:

```bash
yarn prisma db push
yarn dev
```

Open [localhost:3000](http://localhost:3000).

## Commands

| Command | Purpose |
| --- | --- |
| `yarn dev` | Start the development server |
| `yarn build` | Create a production build |
| `yarn start` | Run the production build |
| `yarn lint` | Run ESLint checks |
| `yarn typecheck` | Check TypeScript types |
| `yarn test` | Verify feed ordering and pagination |

## Stack

| Package | Version |
| --- | --- |
| Next.js | 15.5.7 |
| React | 18.3.1 |
| Tailwind CSS / PostCSS plugin | 4.1.17 |
| Prisma | 6.19.0 |
| TypeScript | 5.9.3 |

These versions were published before December 5, 2025. See [dependency migration notes](docs/dependency-migration.md) for configuration changes, verification commands, and rollback guidance.

## Project structure

- `src/app`: pages, layouts, and API routes
- `src/components`: shared UI components
- `src/lib`: authentication, database, and caching helpers
- `prisma/schema.prisma`: database models

## Acknowledgements

This project is derived from [Breadit by Joscha Neske](https://github.com/joschan21/breadit). Thanks to its original contributors, [shadcn Taxonomy](https://github.com/shadcn/taxonomy) for post editor inspiration, and [Code with Antonio](https://www.youtube.com/@codewithantonio) for design inspiration.

The upstream README identifies the project as MIT licensed; retain applicable upstream license and copyright notices when redistributing it.

Documentation updated: December 5, 2025.
