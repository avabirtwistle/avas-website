# Portfolio

Personal website for Ava Birtwistle — software engineering student with a computer systems minor.

## Run locally

```bash
npm install
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`).

## Customize content

Edit **`src/data/content.ts`** to update:

- Name, email, GitHub, LinkedIn links
- About text
- Skills, projects, and experience entries
- Scroll statement lines in the hero chapter

Drop your resume PDF at **`public/resume.pdf`** for the download link in the header and contact section.

## Build for production

```bash
npm run build
npm run preview
```

Deploy the `dist/` folder to Netlify, Vercel, GitHub Pages, or any static host.

## Stack

- React + TypeScript + Vite
- GSAP ScrollTrigger (scroll cadence / pinned sections)
- Lenis (smooth scroll)
- React Three Fiber (3D chip hero)
