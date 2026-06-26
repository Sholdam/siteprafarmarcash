import { cn } from "@/lib/cn";
import { AdsenseUnit } from "@/components/adsense-unit";

export type AdSlotVariant =
  | "rail-left"
  | "rail-right"
  | "banner-top"
  | "banner-middle"
  | "banner-bottom"
  | "mobile-inline";

type AdSlotProps = {
  variant: AdSlotVariant;
  label?: string;
  className?: string;
};

const sizes: Record<AdSlotVariant, string> = {
  "rail-left": "min-h-[320px] w-full",
  "rail-right": "min-h-[320px] w-full",
  "banner-top": "min-h-16 w-full",
  "banner-middle": "min-h-16 w-full",
  "banner-bottom": "min-h-16 w-full",
  "mobile-inline": "min-h-16 w-full",
};

function getAdSlotId(variant: AdSlotVariant) {
  if (variant === "rail-left" || variant === "rail-right") {
    return process.env.NEXT_PUBLIC_ADSENSE_SLOT_RAIL;
  }

  return process.env.NEXT_PUBLIC_ADSENSE_SLOT_BANNER;
}

export function AdPlaceholder({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex h-full min-h-[inherit] w-full flex-col items-center justify-center rounded-lg border border-dashed border-slate-200 bg-white/40 px-4 py-3 text-center text-slate-400",
        className,
      )}
    >
      <span className="text-[10px] font-semibold uppercase tracking-[0.18em]">
        Publicidade
      </span>
    </div>
  );
}

export function AdSlot({ variant, label, className }: AdSlotProps) {
  const adsEnabled = process.env.NEXT_PUBLIC_ENABLE_ADS === "true";
  const adClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
  const adSlot = getAdSlotId(variant);
  const canRenderAd = adsEnabled && adClient && adSlot;

  return (
    <aside
      aria-label={label ?? "Publicidade"}
      className={cn("overflow-hidden", sizes[variant], className)}
    >
      {canRenderAd ? (
        <AdsenseUnit client={adClient} slot={adSlot} />
      ) : (
        <AdPlaceholder />
      )}
    </aside>
  );
}

export function AdRail({ side }: { side: "left" | "right" }) {
  return (
    <div className="sticky top-24 hidden opacity-60 2xl:block">
      <AdSlot variant={side === "left" ? "rail-left" : "rail-right"} />
    </div>
  );
}

export function AdBanner({
  variant = "banner-middle",
  className,
}: {
  variant?: Extract<AdSlotVariant, "banner-top" | "banner-middle" | "banner-bottom" | "mobile-inline">;
  className?: string;
}) {
  return <AdSlot variant={variant} className={cn("my-7 opacity-70", className)} />;
}

export function MonetizedLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto grid w-full max-w-[1480px] grid-cols-1 gap-6 px-4 py-6 sm:px-6 sm:py-8 lg:px-8 2xl:grid-cols-[150px_minmax(0,1040px)_150px]">
      <AdRail side="left" />
      <main className="min-w-0">{children}</main>
      <AdRail side="right" />
    </div>
  );
}
