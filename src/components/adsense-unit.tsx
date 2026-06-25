"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    adsbygoogle?: Array<Record<string, unknown>>;
  }
}

export function AdsenseUnit({
  client,
  slot,
}: {
  client: string;
  slot: string;
}) {
  useEffect(() => {
    try {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
    } catch {
      // Ad blockers or pending approval can prevent ad rendering.
    }
  }, []);

  return (
    <ins
      className="adsbygoogle block h-full min-h-[inherit] w-full"
      data-ad-client={client}
      data-ad-slot={slot}
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
}
