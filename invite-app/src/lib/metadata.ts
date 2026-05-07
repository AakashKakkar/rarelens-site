import type { Metadata } from "next";
import {
  absoluteUrl,
  siteName,
  unavailableDescription,
  unavailableTitle,
} from "@/lib/env";
import type {
  InviteResolverPayload,
  ResolverOutcome,
  ShareResolverPayload,
} from "@/lib/resolvers";

type OgImage = {
  url: string;
  alt: string;
};

function metadata(
  title: string,
  description: string,
  path: string,
  image: OgImage,
): Metadata {
  const url = absoluteUrl(path);

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName,
      type: "website",
      images: [
        {
          url: image.url,
          secureUrl: image.url,
          type: "image/png",
          width: 1200,
          height: 630,
          alt: image.alt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image.url],
    },
  };
}

export function fallbackMetadata(path: string): Metadata {
  return metadata(unavailableTitle, unavailableDescription, path, {
    url: absoluteUrl("/og/fallback/image.png"),
    alt: "RareLens",
  });
}

export function shareProfileMetadata(
  outcome: ResolverOutcome<ShareResolverPayload>,
  shareToken: string,
): Metadata {
  const path = `/share/profile/${shareToken}`;
  const imageUrl = absoluteUrl(`/og/share/profile/${shareToken}/image.png`);

  if (!outcome.ok || outcome.data.status !== "ok" || !outcome.data.preview) {
    return fallbackMetadata(path);
  }

  const preview = outcome.data.preview;
  const subjectName = preview.subject?.name ?? "RareLens";
  const sharerName = preview.sharer?.name;
  const title = `Check out ${subjectName} on RareLens`;
  const description = sharerName
    ? `Shared by ${sharerName}`
    : "Shared on RareLens";

  return metadata(title, description, path, {
    url: imageUrl,
    alt: `${subjectName} on RareLens`,
  });
}

export function shareContentMetadata(
  _outcome: ResolverOutcome<ShareResolverPayload>,
  shareToken: string,
): Metadata {
  const path = `/share/content/${shareToken}`;

  return metadata(
    "Open this RareLens share",
    "Someone shared something from RareLens.",
    path,
    {
      url: absoluteUrl(`/og/share/content/${shareToken}/image.png`),
      alt: "RareLens content share",
    },
  );
}

export function inviteMetadata(
  outcome: ResolverOutcome<InviteResolverPayload>,
  inviteCode: string,
): Metadata {
  const path = `/invite/${inviteCode}`;
  const imageUrl = absoluteUrl(`/og/invite/${inviteCode}/image.png`);

  if (!outcome.ok || outcome.data.status !== "valid" || !outcome.data.inviter) {
    return metadata("RareLens invite unavailable", unavailableDescription, path, {
      url: imageUrl,
      alt: "RareLens invite",
    });
  }

  const inviter = outcome.data.inviter;
  const socialProofCount = outcome.data.social_proof?.count;
  const description =
    typeof socialProofCount === "number" && socialProofCount > 0
      ? `${new Intl.NumberFormat("en-US").format(socialProofCount)} people are already on RareLens`
      : "Join friends on RareLens";

  return metadata(
    `${inviter.name} invited you to RareLens`,
    description,
    path,
    {
      url: imageUrl,
      alt: `${inviter.name}'s RareLens invite`,
    },
  );
}
