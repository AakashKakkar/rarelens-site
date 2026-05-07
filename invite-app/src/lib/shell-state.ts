import {
  fallbackShareDescription,
  fallbackShareTitle,
  getAndroidStoreUrl,
  getIosStoreUrl,
  unavailableDescription,
  unavailableTitle,
} from "@/lib/env";
import {
  buildInviteAppRoute,
  type InviteResolverPayload,
  type ResolverOutcome,
  type ShareResolverPayload,
  type ShareType,
} from "@/lib/resolvers";

export type ResolverShellState = {
  eyebrow: string;
  title: string;
  description: string;
  status: "open" | "blocked" | "install" | "unavailable" | "outage";
  avatarUrl: string | null;
  avatarLabel: string;
  appRoute: string | null;
  iosStoreUrl: string;
  androidStoreUrl: string;
  socialProof: string | null;
  primaryAction: string;
};

const stores = {
  iosStoreUrl: getIosStoreUrl(),
  androidStoreUrl: getAndroidStoreUrl(),
};

export function unavailableShell(
  overrides: Partial<ResolverShellState> = {},
): ResolverShellState {
  return {
    eyebrow: "RareLens",
    title: unavailableTitle,
    description: unavailableDescription,
    status: "unavailable",
    avatarUrl: null,
    avatarLabel: "RareLens",
    appRoute: null,
    socialProof: null,
    primaryAction: "Get RareLens",
    ...stores,
    ...overrides,
  };
}

export function shareShellState(
  outcome: ResolverOutcome<ShareResolverPayload>,
  expectedType: Exclude<ShareType, null>,
): ResolverShellState {
  if (!outcome.ok) {
    return unavailableShell({
      title: "RareLens is having trouble opening this link",
      description: "Please try again in a moment.",
      status: "outage",
    });
  }

  const share = outcome.data;

  if (share.status !== "ok" || share.type !== expectedType || !share.preview) {
    return unavailableShell();
  }

  const subject = share.preview.subject;
  const sharer = share.preview.sharer;
  const subjectName = subject?.name ?? "this RareLens profile";
  const sharerName = sharer?.name ?? "Someone";
  const isProfile = expectedType === "profile";
  const appRoute = share.destination?.app_route ?? null;

  if (share.access.state === "blocked") {
    return {
      eyebrow: isProfile ? "Profile share" : "Content share",
      title: isProfile ? `See ${subjectName} on RareLens` : "Open this RareLens share",
      description:
        share.access.reason === "not_answered_today"
          ? "Answer today's prompt in RareLens to unlock this share."
          : "Open RareLens to see whether this share is available to you.",
      status: "blocked",
      avatarUrl: subject?.profile_image_url ?? null,
      avatarLabel: subjectName,
      appRoute,
      socialProof: null,
      primaryAction: "Open RareLens",
      ...stores,
    };
  }

  if (share.access.state === "unknown") {
    return {
      eyebrow: isProfile ? "Profile share" : "Content share",
      title: fallbackShareTitle,
      description: fallbackShareDescription,
      status: "install",
      avatarUrl: subject?.profile_image_url ?? null,
      avatarLabel: subjectName,
      appRoute,
      socialProof: null,
      primaryAction: "Open RareLens",
      ...stores,
    };
  }

  return {
    eyebrow: isProfile ? "Profile share" : "Content share",
    title: isProfile ? `Open ${subjectName} on RareLens` : "Open this RareLens share",
    description:
      share.preview.card_text ??
      (isProfile
        ? `${sharerName} shared ${subjectName}'s RareLens profile.`
        : `${sharerName} shared something from RareLens.`),
    status: "open",
    avatarUrl: subject?.profile_image_url ?? null,
    avatarLabel: subjectName,
    appRoute,
    socialProof: subject?.primary_major
      ? [subject.primary_major, subject.class_year].filter(Boolean).join(" · ")
      : null,
    primaryAction: "Open RareLens",
    ...stores,
  };
}

export function inviteShellState(
  outcome: ResolverOutcome<InviteResolverPayload>,
): ResolverShellState {
  if (!outcome.ok) {
    return unavailableShell({
      title: "RareLens is having trouble opening this invite",
      description: "Please try again in a moment.",
      status: "outage",
    });
  }

  const invite = outcome.data;

  if (invite.status !== "valid" || !invite.inviter) {
    return unavailableShell({
      title:
        invite.status === "exhausted"
          ? "This RareLens invite has already been used"
          : "This RareLens invite is unavailable",
      description:
        invite.status === "inactive"
          ? "This invite is not active right now."
          : unavailableDescription,
    });
  }

  const count = invite.social_proof?.count;
  const formattedCount =
    typeof count === "number"
      ? `${new Intl.NumberFormat("en-US").format(count)} people are already on RareLens.`
      : null;

  return {
    eyebrow: "RareLens invite",
    title: `${invite.inviter.name} invited you to RareLens`,
    description: "Open the app to accept your invite.",
    status: "open",
    avatarUrl: invite.inviter.profile_image_url,
    avatarLabel: invite.inviter.name,
    appRoute: buildInviteAppRoute(invite),
    socialProof: formattedCount,
    primaryAction: "Accept invite",
    ...stores,
  };
}
