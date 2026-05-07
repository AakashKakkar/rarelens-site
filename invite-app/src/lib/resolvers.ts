import { getApiBaseUrl, getInviteDeeplinkBase } from "@/lib/env";

export type ResolverPurpose = "attribution" | "og";

export type ShareStatus = "ok" | "invalid";
export type ShareType = "profile" | "content" | null;
export type AccessState = "allowed" | "blocked" | "unknown";
export type InviteStatus = "valid" | "invalid" | "inactive" | "exhausted";

export type PersonPreview = {
  id: string;
  name: string;
  profile_image_url: string | null;
  class_year: string | null;
  primary_major: string | null;
};

export type SharePreview = {
  kind: "profile_other" | "content" | string;
  image_url: string | null;
  message_text: string | null;
  card_text: string | null;
  subject: PersonPreview | null;
  sharer: {
    id: string;
    name: string;
  } | null;
};

export type ShareResolverPayload = {
  status: ShareStatus;
  reason: string | null;
  type: ShareType;
  preview: SharePreview | null;
  destination: {
    app_route: string;
    web_path: string;
  } | null;
  access: {
    state: AccessState;
    reason: string | null;
  };
  meta: {
    version: number;
    token: string;
    click_id: string | null;
    timestamp: string;
  };
};

export type InviteResolverPayload = {
  status: InviteStatus;
  click_id: string | null;
  invite_code: string;
  canonical_url: string;
  inviter: PersonPreview | null;
  social_proof: {
    count: number;
  } | null;
};

export type ResolverOutcome<T> =
  | {
      ok: true;
      data: T;
    }
  | {
      ok: false;
      error: "missing_api_base_url" | "network" | "bad_status" | "bad_json";
      status?: number;
    };

async function fetchResolver<T>(
  path: string,
  purpose: ResolverPurpose,
): Promise<ResolverOutcome<T>> {
  const baseUrl = getApiBaseUrl();

  if (!baseUrl) {
    return { ok: false, error: "missing_api_base_url" };
  }

  const headers: HeadersInit = {
    accept: "application/json",
  };

  if (purpose === "og") {
    headers["X-Resolver-Purpose"] = "og";
  }

  let response: Response;

  try {
    response = await fetch(`${baseUrl}${path}`, {
      cache: "no-store",
      headers,
    });
  } catch {
    return { ok: false, error: "network" };
  }

  if (!response.ok) {
    return { ok: false, error: "bad_status", status: response.status };
  }

  try {
    return { ok: true, data: (await response.json()) as T };
  } catch {
    return { ok: false, error: "bad_json", status: response.status };
  }
}

export function resolveShare(shareToken: string, purpose: ResolverPurpose) {
  return fetchResolver<ShareResolverPayload>(
    `/api/v1/public/share/resolve/${encodeURIComponent(shareToken)}/`,
    purpose,
  );
}

export function resolveInvite(inviteCode: string, purpose: ResolverPurpose) {
  return fetchResolver<InviteResolverPayload>(
    `/api/v1/public/invites/${encodeURIComponent(inviteCode)}/`,
    purpose,
  );
}

export function buildInviteAppRoute(invite: InviteResolverPayload) {
  if (invite.status !== "valid" || !invite.click_id) {
    return null;
  }

  const url = new URL(getInviteDeeplinkBase());
  url.searchParams.set("invite_code", invite.invite_code);
  url.searchParams.set("click_id", invite.click_id);

  return url.toString();
}
