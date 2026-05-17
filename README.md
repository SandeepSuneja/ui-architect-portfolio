# ui-architect-portfolio

Personal portfolio site for **Sandeep Suneja** — Senior Technical Lead specializing in Angular, enterprise UI architecture, and scalable front-end systems.

Built with **Angular 19** (standalone components, signals) and deployed as a static site to **AWS S3** via GitHub Actions.

## Tech stack

- **Angular 19** — standalone components, signals, SCSS
- **Vitest** — unit tests with V8 coverage (100% on application code)
- **GitHub Actions** — CI build and S3 deploy
- **AWS S3** (+ optional CloudFront) — static hosting

## Prerequisites

- [Node.js](https://nodejs.org/) 20.x (matches CI)
- npm 10+

## Getting started

```bash
npm install
npm start
```

Open [http://localhost:4200](http://localhost:4200).

## Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Dev server with live reload |
| `npm run build` | Production build → `dist/portfolio/browser/` |
| `npm run watch` | Development build in watch mode |
| `npm test` | Run unit tests once |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:coverage` | Tests with coverage report (100% thresholds) |

## Testing

Tests use [Vitest](https://vitest.dev/) with `@angular/core/testing` and the Analog Vite Angular plugin. Coverage is enforced at **100%** for statements, branches, functions, and lines under `src/app/`.

```bash
npm run test:coverage
```

Reports are written to `coverage/`. Type-only files in `src/app/models/` and the bootstrap entry `src/main.ts` are excluded from coverage.

## Project structure

```
src/app/
├── components/     # Page sections (hero, about, skills, projects, …)
├── data/           # Portfolio content (portfolio.data.ts)
├── directives/     # In-view and scroll-reveal helpers
├── models/         # TypeScript interfaces
└── services/       # TweakService (live theme editing)
```

| Component | Section |
|-----------|---------|
| `NavComponent` | Fixed navigation |
| `HeroComponent` | Hero + animated code block |
| `AboutComponent` | Bio, stats, career timeline |
| `SkillsComponent` | Skill cards + marquee |
| `ProjectsComponent` | Professional and personal project cards |
| `EducationComponent` | Degree cards |
| `ContactComponent` | Contact channels and footer |
| `TweaksPanelComponent` | Live theme tweaks |

### Live tweaks

Press **Ctrl/Cmd + T** or click the **◇** button to open the tweaks panel — accent color, display font, motion, and grid backdrop can be changed at runtime.

Content (timeline, skills, projects, education) lives in [`src/app/data/portfolio.data.ts`](src/app/data/portfolio.data.ts).

## CI/CD

### CI (pull requests and `main`)

[`.github/workflows/ci.yml`](.github/workflows/ci.yml) installs dependencies and runs `npm run build`.

### Deploy (`main` only)

[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) builds and syncs `dist/portfolio/browser/` to S3 bucket **`ui-architect-portfolio`**.

**GitHub secrets required:**

| Secret | Purpose |
|--------|---------|
| `AWS_ACCESS_KEY_ID` | Deploy IAM user access key |
| `AWS_SECRET_ACCESS_KEY` | Deploy IAM user secret |
| `AWS_REGION` | Bucket region (e.g. `us-east-1`) |
| `CLOUDFRONT_DISTRIBUTION_ID` | Optional — invalidates CDN after deploy |

Full bucket policy, IAM setup, and hosting notes: **[docs/aws-deploy-setup.md](docs/aws-deploy-setup.md)**.

## Legacy prototype

The original React + Babel prototype is preserved in `legacy/` for reference.
