import { Link, useRouterState } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { PrototypeBanner, SiteHeader } from "./SiteChrome";
import { useApplication } from "@/context/ApplicationContext";
import { cn } from "@/lib/utils";

export const APPLY_STEPS = [
  { key: "voice", to: "/apply/voice", label: "Speak", short: "Speak" },
  { key: "documents", to: "/apply/documents", label: "Documents", short: "Docs" },
  { key: "eligibility", to: "/apply/eligibility", label: "Eligibility", short: "Check" },
  { key: "schemes", to: "/apply/schemes", label: "Scheme match", short: "Match" },
  { key: "dpr", to: "/apply/dpr", label: "Project report", short: "DPR" },
  { key: "loan", to: "/apply/loan", label: "Loan plan", short: "Plan" },
  { key: "lending-partner", to: "/apply/lending-partner", label: "Lending partner", short: "Connect" },
  { key: "dossier", to: "/apply/dossier", label: "Bank dossier", short: "Share" },
] as const;

export function ApplyShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  const { completed } = useApplication();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const currentIndex = Math.max(
    0,
    APPLY_STEPS.findIndex((s) => s.to === pathname),
  );
  const progress = ((currentIndex + 1) / APPLY_STEPS.length) * 100;

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <div className="no-print">
        <PrototypeBanner />
        <SiteHeader />
      </div>

      <div className="no-print sticky top-[61px] z-30 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto max-w-5xl px-4 py-3 sm:px-6">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>
              Step {currentIndex + 1} of {APPLY_STEPS.length}
            </span>
            <span>{APPLY_STEPS[currentIndex]?.label}</span>
          </div>
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-olive transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <ol className="mt-3 hidden items-center justify-between gap-1 md:flex">
            {APPLY_STEPS.map((step, i) => {
              const done = completed[step.key];
              const active = i === currentIndex;
              return (
                <li key={step.key} className="flex-1">
                  <Link
                    to={step.to}
                    className={cn(
                      "flex items-center gap-2 rounded-md px-2 py-1.5 text-xs transition-colors",
                      active
                        ? "bg-muted font-medium text-foreground"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    <span
                      className={cn(
                        "grid size-5 shrink-0 place-items-center rounded-full border text-[10px]",
                        done
                          ? "border-olive bg-olive text-olive-foreground"
                          : active
                            ? "border-foreground text-foreground"
                            : "border-border",
                      )}
                    >
                      {done ? <Check className="size-3" /> : i + 1}
                    </span>
                    <span className="truncate">{step.short}</span>
                  </Link>
                </li>
              );
            })}
          </ol>
        </div>
      </div>

      <main className="mx-auto w-full max-w-3xl flex-1 px-4 pt-8 pb-20 sm:px-6">
        <h1 className="font-display text-3xl sm:text-4xl">{title}</h1>
        {subtitle && (
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{subtitle}</p>
        )}
        <div className="mt-8 space-y-6">{children}</div>
      </main>
    </div>
  );
}
