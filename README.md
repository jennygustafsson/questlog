# Questlog

Live site: https://questlog-kappa-three.vercel.app

A React app for viewing, adding, editing, and deleting games in a backlog. The games come from the Questlog API. There is no login. Each person has their own handle in the URL, so the games stay separate.

The handle in this project is `jenny`.

## Get started

```bash
npm install
npm run dev
```

The app opens at the address Vite prints, for example `http://localhost:5173`.

## Pages

- `/` shows all games. You can filter by Want to play, Playing, Completed, and Dropped.
- `/games/new` is the form for adding a game. Title and platform are required.
- `/games/:id` shows one game, including a cover when the API sends an image URL. You can also edit or delete the game there.
- An unknown address shows the page "Sidan finns inte".

A loading message is shown until the games have been fetched. A failed request shows an error message.

## API

Docs: https://questlog-api.vercel.app/docs

Base URL: `https://questlog-api.vercel.app/api/jenny`

- `GET /games` fetches the games. `?status=` filters by `want`, `playing`, `completed`, or `dropped`.
- `GET /games/:id` fetches one game.
- `POST /games` creates a game.
- `PATCH /games/:id` updates a game.
- `DELETE /games/:id` deletes a game.
