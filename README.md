# GitHub User Explorer

A React + TypeScript application for searching GitHub users, viewing profile details, browsing repositories, and filtering/sorting results from the GitHub API.

## Overview

This app helps users explore any public GitHub account by:

- searching for a GitHub username
- viewing user profile information
- listing repositories
- sorting repositories by stars, forks, update time, or name
- filtering by language
- keeping recent search history in the browser
- navigating to repository and profile detail views

## Tech Stack

- React
- TypeScript
- Vite
- React Router
- GitHub REST API

## Features

- Search by GitHub username
- User profile card with public profile metadata
- Repository list with sort and language filtering
- Repo detail page and route-based navigation
- Search history stored in local storage
- Loading, error, and not-found states
- Rate limit status display


## Prerequisites

- Node.js 20+ recommended
- npm

## Installation

```bash
npm install
```

## Run Locally

```bash
npm run dev
```

Then open the local URL shown in the terminal, usually:

```text
http://localhost:5173
```

## Build

```bash
npm run build
```

This creates the production bundle in the `dist` folder.

## Lint

```bash
npm run lint
```

## Notes

- This app calls the public GitHub API directly from the browser.
- GitHub API rate limits may affect usage depending on the environment and request volume.
- No API key is required for public repository and user data requests.


