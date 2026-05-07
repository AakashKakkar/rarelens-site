export const siteName = "RareLens";

export const defaultPublicBaseUrl = "https://invite.rarelens.ai";
export const fallbackShareTitle = "Open this RareLens link";
export const fallbackShareDescription = "This RareLens link is ready to open in the app.";
export const unavailableTitle = "This RareLens link is unavailable";
export const unavailableDescription =
  "The link may have expired, been removed, or is temporarily unavailable.";

function withoutTrailingSlash(value: string) {
  return value.replace(/\/+$/, "");
}

export function getApiBaseUrl() {
  const value = process.env.RARELENS_API_BASE_URL?.trim();
  return value ? withoutTrailingSlash(value) : null;
}

export function getPublicBaseUrl() {
  return withoutTrailingSlash(
    process.env.RARELENS_PUBLIC_BASE_URL?.trim() || defaultPublicBaseUrl,
  );
}

export function absoluteUrl(path: string) {
  return new URL(path, `${getPublicBaseUrl()}/`).toString();
}

export function getInviteDeeplinkBase() {
  return (
    process.env.NEXT_PUBLIC_INVITE_DEEPLINK_BASE?.trim() || "rarelens://invite"
  );
}

export function getIosStoreUrl() {
  return process.env.NEXT_PUBLIC_IOS_APP_STORE_URL?.trim() || "https://www.rarelens.ai";
}

export function getAndroidStoreUrl() {
  return (
    process.env.NEXT_PUBLIC_ANDROID_PLAY_STORE_URL?.trim() ||
    "https://www.rarelens.ai"
  );
}
