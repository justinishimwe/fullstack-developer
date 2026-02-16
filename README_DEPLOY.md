# Deploying this Portfolio (Netlify / Vercel / GitHub)

This project is a Vite + React + TypeScript app. Below are concise steps to produce a production build and deploy to Netlify, Vercel, or GitHub Pages. Also included: cleanup for accidental `git` npm package and local Git setup.

1) Clean up accidental `git` npm package (recommended)

Powershell / Command Prompt:

```powershell
cd "C:\Users\Oreste\Desktop\Code-Companion\Code-Companion"
npm uninstall git
npm install
```

2) Build locally (verify)

```bash
npm run build
# then preview the production build
npm run preview
```

3) Deploy to Netlify (recommended for static sites)

Option A — Connect repository (recommended):
- Push your repo to GitHub (see section below).
- In Netlify dashboard, choose "New site from Git" and connect your GitHub repo.
- Set build command: `npm run build` and publish directory: `dist`.

Option B — CLI quick deploy (no Git required):

Install Netlify CLI (if you want to deploy directly from this machine):

```bash
npm install -g netlify-cli
netlify deploy --dir=dist --prod
```

4) Deploy to Vercel

Vercel can deploy directly from a Git repo. Create a new project and point it to this repository. Use build command `npm run build` and output directory `dist`.

5) Git / GitHub quick setup (how to push repo)

Install Git for Windows if not installed: https://git-scm.com/download/win or use `winget`:

```powershell
winget install --id Git.Git -e --source winget
```

Then in project root:

```bash
git config --global user.name "Your Name"
git config --global user.email "justinishimwe01@gmail.com"
git init
git add .
git commit -m "Initial commit: portfolio"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

6) Notes & Troubleshooting
- Vite builds to `dist` by default (see `netlify.toml`).
- If your repo has separate `client/` folder with its own package.json, run build from that folder and set Netlify publish dir accordingly (e.g., `client/dist`).
- If `npm run dev` fails locally, run `npm install` and check the console errors — most environment issues are missing deps or leftover dev-only plugins.

If you'd like, I can: uninstall the accidental `git` npm package for you, run a local build and produce a zip artifact ready to upload to Netlify, and/or prepare a GitHub repo commit and push (but I will need the Git CLI available or your GitHub credentials/permissions to push from here). Tell me which of these you'd like me to do next.
