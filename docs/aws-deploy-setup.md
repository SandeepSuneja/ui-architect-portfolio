# AWS deployment setup

GitHub Actions deploys the production build to S3 bucket **`ui-architect-portfolio`** on every push to `main`.

## 1. S3 bucket

Create (or use) bucket `ui-architect-portfolio` in your AWS account.

**Static website hosting** (if not using CloudFront):

1. S3 → bucket → **Properties** → **Static website hosting** → Enable  
2. Index document: `index.html`  
3. Error document: `error.html` (workflow uploads this for Angular client-side routes)

**Block public access**: allow public read for website hosting, or front the bucket with CloudFront (recommended for HTTPS).

Example bucket policy (public read; adjust if using CloudFront OAI instead):

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::ui-architect-portfolio/*"
    }
  ]
}
```

## 2. IAM user for GitHub Actions

Create an IAM user (e.g. `github-actions-ui-architect-portfolio`) with this policy:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "DeployPortfolio",
      "Effect": "Allow",
      "Action": [
        "s3:ListBucket",
        "s3:GetObject",
        "s3:PutObject",
        "s3:DeleteObject"
      ],
      "Resource": [
        "arn:aws:s3:::ui-architect-portfolio",
        "arn:aws:s3:::ui-architect-portfolio/*"
      ]
    },
    {
      "Sid": "CloudFrontInvalidate",
      "Effect": "Allow",
      "Action": ["cloudfront:CreateInvalidation"],
      "Resource": "*"
    }
  ]
}
```

Remove the `CloudFrontInvalidate` statement if you do not use CloudFront.

## 3. GitHub repository secrets

In **Settings → Secrets and variables → Actions**, add:

| Secret | Example | Required |
|--------|---------|----------|
| `AWS_ACCESS_KEY_ID` | AKIA... | Yes |
| `AWS_SECRET_ACCESS_KEY` | ... | Yes |
| `AWS_REGION` | `us-east-1` | Yes |
| `CLOUDFRONT_DISTRIBUTION_ID` | `E1234ABCDEF` | No |

## 4. Workflows

| Workflow | Trigger | Purpose |
|----------|---------|--------|
| [ci.yml](../.github/workflows/ci.yml) | PR and push to `main` | `npm ci` + production build |
| [deploy.yml](../.github/workflows/deploy.yml) | Push to `main`, manual | Build + sync to S3 |

Manual deploy: **Actions → Deploy to S3 → Run workflow**.
