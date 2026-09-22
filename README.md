# GitHub User Explorer

A Vite, React, and TypeScript application for searching GitHub users, viewing profile information, filtering and sorting repositories, and opening repository details.

## Features

- Typed GitHub API models and custom data-fetching hooks
- User search with loading, not-found, rate-limit, and network error states
- User profile and repository detail pages
- Repository sorting by stars, forks, updated date, and name
- Language filtering
- Search history stored in typed localStorage state
- React Router navigation with a wildcard 404 page

## Development

```bash
npm install
npm run dev
```

## Validation

```bash
npm run lint
npm run build
```

## Deployment

This project includes `vercel.json` so client-side routes work correctly after deployment.

1. Import the repository into Vercel.
2. Use `npm run build` as the build command and `dist` as the output directory.
3. Deploy the project.

The same build command and `dist` directory can be used with Netlify. Configure a rewrite from `/*` to `/index.html` when deploying there.
  },
])

```
