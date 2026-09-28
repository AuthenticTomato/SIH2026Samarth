import { Info } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Small always-visible marker for simulated data. Used anywhere a real build
 * would surface a live value, verification result or status.
 */
export function DemoBadge({
  label = "Demo data",
  title = "Simulated value shown for prototype demonstration only.",
  className,
}: {
  label?: string;
  title?: string;
  className?: string;
}) {
  return (
    <span
      title={title}
      className={cn(
        "inline-flex items-center gap-1 rounded-full border border-border bg-muted px-2 py-0.5 text-[11px] font-medium tracking-wide text-muted-foreground uppercase",
        className,
      )}
    >
      <Info className="size-3" aria-hidden />
      {label}
    </span>
  );
}

export function PrototypeNote({ children }: { children: React.ReactNode }) {
  return (
    <p className="rounded-lg border border-dashed border-border bg-muted/60 p-3 text-sm text-muted-foreground">
      {children}
    </p>
  );
}
