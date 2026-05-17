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

## 2. IAM user for GitHub Actions (`deployUser`)

Attach this policy to the IAM user whose keys are in GitHub Secrets (e.g. **`deployUser`**).

`aws s3 sync` calls **ListObjectsV2**, which requires **`s3:ListBucket` on the bucket ARN** (not only object-level permissions).

### Policy (recommended — split bucket vs objects)

In **IAM → Users → deployUser → Add permissions → Create inline policy → JSON**:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "ListBucket",
      "Effect": "Allow",
      "Action": ["s3:ListBucket", "s3:GetBucketLocation"],
      "Resource": "arn:aws:s3:::ui-architect-portfolio"
    },
    {
      "Sid": "ObjectReadWrite",
      "Effect": "Allow",
      "Action": ["s3:GetObject", "s3:PutObject", "s3:DeleteObject"],
      "Resource": "arn:aws:s3:::ui-architect-portfolio/*"
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

Remove the `CloudFrontInvalidate` block if you do not use CloudFront.

A copy-paste file is also at [iam-deploy-policy.json](./iam-deploy-policy.json).

### Attach via AWS CLI

```bash
aws iam put-user-policy \
  --user-name deployUser \
  --policy-name ui-architect-portfolio-deploy \
  --policy-document file://docs/iam-deploy-policy.json
```

### Troubleshooting `AccessDenied` on `ListObjectsV2`

| Symptom | Fix |
|---------|-----|
| `not authorized to perform: s3:ListBucket` on `arn:aws:s3:::ui-architect-portfolio` | Add the **ListBucket** statement above to **`deployUser`** (bucket ARN, no `/*`). |
| Policy exists but still denied | Confirm GitHub Secrets use **deployUser** access keys, not another user. |
| Denied on `PutObject` only | Add **ObjectReadWrite** statement (`arn:.../ui-architect-portfolio/*`). |
| Bucket in another account | IAM user and bucket must be in the **same** AWS account (or use cross-account role). |

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
