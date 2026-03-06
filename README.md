# PromptPortal — Prompt Engineering Learning Portal

A modern mini documentation-style learning portal for Prompt Engineering, built with **React + Vite**, featuring:

- Top navbar + documentation sidebar
- **Dark / Light mode** (persisted in `localStorage`)
- **Search** that filters topics and prompt cards
- Prompt example cards with **Copy Prompt** (Clipboard API)
- Responsive layout (mobile / tablet / desktop)
- Ready to deploy on **GitHub Pages**

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Deploy to GitHub Pages

This project is preconfigured for a repo named **`prompt-engineering-portal`**.

1. Create a GitHub repository named `prompt-engineering-portal`
2. Push this project to that repository
3. Deploy:

```bash
npm run deploy
```

If your repository name is different, update `base` in `vite.config.js`:

- `base: '/<your-repo-name>/'`

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
