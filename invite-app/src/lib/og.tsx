/* eslint-disable @next/next/no-img-element */

import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { siteName } from "@/lib/env";
import type {
  InviteResolverPayload,
  PersonPreview,
  ShareResolverPayload,
} from "@/lib/resolvers";

export const ogSize = {
  width: 1200,
  height: 630,
};

let ogFontPromise: Promise<{
  regular: ArrayBuffer;
  bold: ArrayBuffer;
  black: ArrayBuffer;
}> | null = null;

function loadOgFont() {
  function toArrayBuffer(buffer: Buffer) {
    return buffer.buffer.slice(
      buffer.byteOffset,
      buffer.byteOffset + buffer.byteLength,
    ) as ArrayBuffer;
  }

  ogFontPromise ??= Promise.all([
    readFile(new URL("../../assets/Inter-Regular.woff", import.meta.url)),
    readFile(new URL("../../assets/Inter-Bold.woff", import.meta.url)),
    readFile(new URL("../../assets/Inter-Black.woff", import.meta.url)),
  ]).then(([regular, bold, black]) => ({
    regular: toArrayBuffer(regular),
    bold: toArrayBuffer(bold),
    black: toArrayBuffer(black),
  }));

  return ogFontPromise;
}

type RareLensOgProps = {
  variant: "profile" | "invite" | "content" | "fallback";
  primaryText: string;
  secondaryText?: string | null;
  person?: PersonPreview | null;
  chips?: string[];
  footerText?: string | null;
};

function classChip(classYear?: string | null) {
  if (!classYear) {
    return null;
  }

  const year = classYear.trim();
  return `Class of ${year}`;
}

function personChips(person?: PersonPreview | null) {
  return [
    classChip(person?.class_year),
    person?.primary_major?.trim() || null,
  ].filter(Boolean) as string[];
}

function truncateText(text: string, maxLength: number) {
  const normalized = text.replace(/\s+/g, " ").trim();

  if (normalized.length <= maxLength) {
    return normalized;
  }

  return `${normalized.slice(0, maxLength - 3).trimEnd()}...`;
}

function initialsFor(label: string) {
  const words = label.trim().split(/\s+/).filter(Boolean);

  if (words.length >= 2) {
    return `${words[0]?.[0] ?? ""}${words[1]?.[0] ?? ""}`.toUpperCase();
  }

  return label.trim().charAt(0).toUpperCase() || "R";
}

function fitPrimaryText(text: string, variant: RareLensOgProps["variant"]) {
  const length = text.length;

  if (variant === "content" || variant === "fallback") {
    return length > 26 ? 58 : 72;
  }

  if (length > 96) {
    return 38;
  }

  if (length > 76) {
    return 42;
  }

  if (length > 58) {
    return 48;
  }

  if (length > 42) {
    return 54;
  }

  if (length > 22) {
    return 64;
  }

  return 82;
}

const imageDataUrlCache = new Map<string, Promise<string | null>>();

async function fetchImageDataUrl(imageUrl?: string | null) {
  if (!imageUrl) {
    return null;
  }

  let parsedUrl: URL;

  try {
    parsedUrl = new URL(imageUrl);
  } catch {
    return null;
  }

  if (!["http:", "https:"].includes(parsedUrl.protocol)) {
    return null;
  }

  const cached = imageDataUrlCache.get(parsedUrl.href);

  if (cached) {
    return cached;
  }

  const promise = (async () => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2500);

    try {
      const response = await fetch(parsedUrl.href, {
        cache: "no-store",
        signal: controller.signal,
      });

      if (!response.ok) {
        return null;
      }

      const contentType = response.headers
        .get("content-type")
        ?.split(";")[0]
        ?.trim()
        ?.toLowerCase();

      if (
        !contentType ||
        !["image/jpeg", "image/png", "image/webp"].includes(contentType)
      ) {
        return null;
      }

      const imageBuffer = await response.arrayBuffer();

      if (imageBuffer.byteLength > 4_000_000) {
        return null;
      }

      return `data:${contentType};base64,${Buffer.from(imageBuffer).toString("base64")}`;
    } catch {
      return null;
    } finally {
      clearTimeout(timeout);
    }
  })();

  imageDataUrlCache.set(parsedUrl.href, promise);

  return promise;
}

async function withSafeProfileImage(person?: PersonPreview | null) {
  if (!person) {
    return person;
  }

  return {
    ...person,
    profile_image_url: await fetchImageDataUrl(person.profile_image_url),
  };
}

function InitialBlock({ label }: { label: string }) {
  return (
    <div
      style={{
        width: 384,
        height: 384,
        borderRadius: 34,
        background: "#181a1f",
        border: "1px solid #343741",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#ffffff",
        fontSize: 124,
        fontWeight: 900,
        letterSpacing: 0,
      }}
    >
      {initialsFor(label)}
    </div>
  );
}

function Chip({ label }: { label: string }) {
  return (
    <div
      style={{
        height: 44,
        borderRadius: 22,
        padding: "0 18px",
        background: "rgba(255,255,255,0.08)",
        border: "1px solid rgba(255,255,255,0.14)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#d7d9df",
        fontSize: 20,
        fontWeight: 700,
        lineHeight: 1,
      }}
    >
      {label}
    </div>
  );
}

function BrandMark() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        color: "#d7d9df",
        fontSize: 22,
        fontWeight: 800,
      }}
    >
      <div
        style={{
          width: 28,
          height: 28,
          borderRadius: 8,
          background: "#ffffff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#111216",
          fontSize: 10,
          fontWeight: 900,
        }}
      >
        R
      </div>
      RareLens
    </div>
  );
}

function personAccent(variant: RareLensOgProps["variant"]) {
  if (variant === "invite") {
    return "#2f6df3";
  }

  if (variant === "content") {
    return "#2f7670";
  }

  return "#b66b2e";
}

function RareLensOg({
  variant,
  primaryText,
  secondaryText,
  person,
  chips = [],
  footerText,
}: RareLensOgProps) {
  const safeChips = chips.length > 0 ? chips.slice(0, 2) : personChips(person);
  const personName = person?.name ?? siteName;
  const primary = truncateText(primaryText, variant === "invite" ? 72 : 104);
  const secondary = secondaryText ? truncateText(secondaryText, 44) : null;
  const primaryFontSize = fitPrimaryText(primary, variant);
  const accent = personAccent(variant);
  const showPerson = variant === "profile" || variant === "invite";

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        background: "#090a0d",
        color: "#ffffff",
        fontFamily: "RareLensOgSans",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            variant === "invite"
              ? "linear-gradient(135deg, rgba(47,109,243,0.20), rgba(9,10,13,0) 52%)"
              : "linear-gradient(135deg, rgba(182,107,46,0.18), rgba(9,10,13,0) 52%)",
          display: "flex",
        }}
      />

      <div
        style={{
          position: "absolute",
          right: 64,
          top: 48,
          display: "flex",
        }}
      >
        <BrandMark />
      </div>

      {showPerson ? (
        <div
          style={{
            position: "absolute",
            left: 72,
            top: 76,
            width: 408,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 18,
            zIndex: 1,
          }}
        >
          <div
            style={{
              width: 408,
              height: 408,
              borderRadius: 40,
              background: accent,
              padding: 12,
              display: "flex",
            }}
          >
            {person?.profile_image_url ? (
              <img
                alt={personName}
                src={person.profile_image_url}
                width={384}
                height={384}
                style={{
                  width: 384,
                  height: 384,
                  borderRadius: 30,
                  objectFit: "cover",
                }}
              />
            ) : (
              <InitialBlock label={personName} />
            )}
          </div>

          {safeChips.length > 0 ? (
            <div
              style={{
                width: 408,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
              }}
            >
              {safeChips.map((chip) => (
                <Chip key={chip} label={chip} />
              ))}
            </div>
          ) : null}
        </div>
      ) : null}

      <div
        style={{
          position: "absolute",
          left: showPerson ? 560 : 170,
          right: showPerson ? 76 : 170,
          top: 122,
          bottom: 96,
          display: "flex",
          flexDirection: "column",
          alignItems: showPerson ? "flex-start" : "center",
          justifyContent: "center",
          textAlign: showPerson ? "left" : "center",
          zIndex: 1,
        }}
      >
        <div
          style={{
            maxWidth: showPerson ? 560 : 760,
            fontSize: primaryFontSize,
            lineHeight: 0.96,
            fontWeight: 900,
            letterSpacing: 0,
          }}
        >
          {primary}
        </div>

        {secondary ? (
          <div
            style={{
              marginTop: 24,
              color: "#c8cbd3",
              fontSize: showPerson ? 34 : 32,
              lineHeight: 1.16,
              fontWeight: 700,
              maxWidth: showPerson ? 540 : 720,
            }}
          >
            {secondary}
          </div>
        ) : null}

        {footerText ? (
          <div
            style={{
              marginTop: 34,
              color: "#9da3af",
              fontSize: 24,
              lineHeight: 1.2,
              fontWeight: 700,
              maxWidth: showPerson ? 520 : 720,
            }}
          >
            {truncateText(footerText, 54)}
          </div>
        ) : null}
      </div>

      {variant !== "fallback" ? (
        <div
          style={{
            position: "absolute",
            right: 72,
            bottom: 56,
            fontSize: 68,
            lineHeight: 1,
            zIndex: 2,
          }}
        >
          👇🏼
        </div>
      ) : null}
    </div>
  );
}

export async function renderOgImage(props: RareLensOgProps) {
  const fontData = await loadOgFont();

  return new ImageResponse(<RareLensOg {...props} />, {
    ...ogSize,
    emoji: "twemoji",
    fonts: [
      {
        name: "RareLensOgSans",
        data: fontData.regular,
        weight: 400,
        style: "normal",
      },
      {
        name: "RareLensOgSans",
        data: fontData.bold,
        weight: 700,
        style: "normal",
      },
      {
        name: "RareLensOgSans",
        data: fontData.black,
        weight: 800,
        style: "normal",
      },
      {
        name: "RareLensOgSans",
        data: fontData.black,
        weight: 900,
        style: "normal",
      },
    ],
  });
}

export function renderFallbackOgImage() {
  return renderOgImage({
    variant: "fallback",
    primaryText: "RareLens link unavailable",
    secondaryText: "This link may have expired or been removed.",
  });
}

export async function renderShareProfileOgImage(
  share: ShareResolverPayload | null,
) {
  if (!share || share.status !== "ok" || !share.preview) {
    return renderFallbackOgImage();
  }

  const subject = share.preview.subject;
  const sharerName = share.preview.sharer?.name ?? "Someone";
  const subjectName = subject?.name ?? "this profile";
  const isOtherProfile = share.preview.kind === "profile_other";

  return renderOgImage({
    variant: "profile",
    primaryText: isOtherProfile
      ? `${sharerName} sees ${subjectName}'s answers every day.`
      : `${subjectName} answered today.`,
    secondaryText: isOtherProfile
      ? "You're not seeing what they see."
      : "You can't see it.",
    person: await withSafeProfileImage(subject),
  });
}

export async function renderShareContentOgImage(
  share: ShareResolverPayload | null,
) {
  if (!share || share.status !== "ok" || !share.preview) {
    return renderOgImage({
      variant: "content",
      primaryText: "Shared from RareLens",
      secondaryText: "Open this share in RareLens",
    });
  }

  const subject = share.preview.subject;

  return renderOgImage({
    variant: "content",
    primaryText: "Shared from RareLens",
    secondaryText: subject?.name ? `${subject.name} on RareLens` : "Open this share in RareLens",
    person: await withSafeProfileImage(subject),
  });
}

export async function renderInviteOgImage(invite: InviteResolverPayload | null) {
  if (!invite || invite.status !== "valid" || !invite.inviter) {
    return renderOgImage({
      variant: "fallback",
      primaryText: "RareLens invite unavailable",
      secondaryText: "This invite may have expired.",
    });
  }

  const count = invite.social_proof?.count;
  const inviter = invite.inviter;

  return renderOgImage({
    variant: "invite",
    primaryText: `You got one of ${truncateText(inviter.name, 28)}'s 5 invites`,
    secondaryText: null,
    person: await withSafeProfileImage(inviter),
    chips: [],
    footerText:
      typeof count === "number" && count > 0
        ? `${new Intl.NumberFormat("en-US").format(count)} people are already on RareLens`
        : null,
  });
}
