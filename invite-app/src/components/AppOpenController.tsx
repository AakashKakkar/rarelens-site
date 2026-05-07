"use client";

import { useEffect, useState } from "react";

type AppOpenControllerProps = {
  appRoute: string | null;
  primaryAction: string;
  iosStoreUrl: string;
  androidStoreUrl: string;
};

function getMobilePlatform() {
  const ua = navigator.userAgent || "";
  const isIos =
    /iPad|iPhone|iPod/.test(ua) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  const isAndroid = /Android/i.test(ua);

  if (isIos) {
    return "ios";
  }

  if (isAndroid) {
    return "android";
  }

  return "desktop";
}

export function AppOpenController({
  appRoute,
  primaryAction,
  iosStoreUrl,
  androidStoreUrl,
}: AppOpenControllerProps) {
  const [showFallback, setShowFallback] = useState(false);
  const [storeUrl, setStoreUrl] = useState(iosStoreUrl);

  useEffect(() => {
    const detectedPlatform = getMobilePlatform();
    const detectedStoreUrl =
      detectedPlatform === "android" ? androidStoreUrl : iosStoreUrl;

    queueMicrotask(() => {
      setStoreUrl(detectedStoreUrl);
    });

    if (!appRoute || detectedPlatform === "desktop") {
      queueMicrotask(() => {
        setShowFallback(true);
      });
      return;
    }

    let likelyOpened = false;

    const markLikelyOpened = () => {
      likelyOpened = true;
    };

    const onVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        markLikelyOpened();
      }
    };

    document.addEventListener("visibilitychange", onVisibilityChange);
    window.addEventListener("pagehide", markLikelyOpened);

    const fallbackTimer = window.setTimeout(() => {
      if (!likelyOpened && document.visibilityState === "visible") {
        setShowFallback(true);
      }
    }, 1000);

    window.location.assign(appRoute);

    return () => {
      window.clearTimeout(fallbackTimer);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("pagehide", markLikelyOpened);
    };
  }, [androidStoreUrl, appRoute, iosStoreUrl]);

  if (!showFallback) {
    return (
      <p className="mt-7 text-sm font-medium text-[#6f6761]">
        Opening RareLens...
      </p>
    );
  }

  return (
    <div className="mt-7 flex w-full flex-col gap-3 sm:flex-row">
      {appRoute ? (
        <a
          className="inline-flex h-12 flex-1 items-center justify-center rounded-[6px] bg-[#161311] px-5 text-sm font-semibold text-white transition hover:bg-[#2a2420]"
          href={appRoute}
        >
          {primaryAction}
        </a>
      ) : null}
      <a
        className="inline-flex h-12 flex-1 items-center justify-center rounded-[6px] border border-[#d7cec6] bg-white px-5 text-sm font-semibold text-[#161311] transition hover:border-[#b8aca1]"
        href={storeUrl}
        rel="noreferrer"
      >
        Get the app
      </a>
    </div>
  );
}
