# ui-architect-portfolio

Angular portfolio for Sandeep Suneja — Senior Technical Lead.

## Run locally

```bash
npm install
npm start
```

Open [http://localhost:4200](http://localhost:4200).

## Build

```bash
npm run build
```

Output is in `dist/portfolio/`.

## Project structure

| Component | Section |
|-----------|---------|
| `NavComponent` | Top navigation |
| `HeroComponent` | Hero + code typing animation |
| `AboutComponent` | About + career timeline |
| `SkillsComponent` | Skills grid + marquee |
| `ProjectsComponent` | Project cards |
| `EducationComponent` | Education cards |
| `ContactComponent` | Contact CTA |
| `TweaksPanelComponent` | Live theme tweaks (Ctrl/Cmd + T or ◇ button) |

The original React + Babel prototype is preserved in `legacy/`.

## CI/CD (GitHub Actions → AWS S3)

Pushes to `main` build the app and deploy to S3 bucket **`ui-architect-portfolio`**.

1. Add GitHub secrets: `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_REGION`
2. Optional: `CLOUDFRONT_DISTRIBUTION_ID` to invalidate CDN after deploy
3. See [docs/aws-deploy-setup.md](docs/aws-deploy-setup.md) for IAM policy and bucket setup

```bash
# Local production build (same artifact CI uploads)
npm run build
# Output: dist/portfolio/browser/
```
