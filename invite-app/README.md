# RareLens Invite Web

Standalone Next.js app for `invite.rarelens.ai`.

## Local setup

```bash
npm install
npm run dev
```

Required environment:

- `RARELENS_API_BASE_URL=https://socialbackend-production-89c7.up.railway.app`
- `RARELENS_PUBLIC_BASE_URL`
- `NEXT_PUBLIC_IOS_APP_STORE_URL`
- `NEXT_PUBLIC_ANDROID_PLAY_STORE_URL`
- `NEXT_PUBLIC_INVITE_DEEPLINK_BASE`

## Resolver modes

Canonical page routes call backend resolvers in attribution mode and do not send
`X-Resolver-Purpose`.

Metadata and OG routes always send:

```http
X-Resolver-Purpose: og
```

This prevents crawler/unfurl traffic from creating backend sessions.

## Deploy

Create a separate Vercel project for this app and use `invite-app` as the project
root if this folder remains inside a larger repository. Validate preview/staging
first, then attach `invite.rarelens.ai`.
