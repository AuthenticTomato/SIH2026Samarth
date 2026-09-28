import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Clock } from "lucide-react";
import { SitePage } from "@/components/samarth/SiteChrome";
import { DemoBadge, PrototypeNote } from "@/components/samarth/DemoBadge";
import { Button } from "@/components/ui/button";
import { useApplication } from "@/context/ApplicationContext";
import { formatINR, getScheme } from "@/data/mockData";
import { routingService } from "@/services";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Track your application — Samarth" },
      {
        name: "description",
        content:
          "A stage-by-stage timeline of your credit application from start to disbursement, with simulated timestamps and SLA status.",
      },
      { property: "og:title", content: "Track your application — Samarth" },
      { property: "og:description", content: "Follow your application from start to disbursement." },
    ],
  }),
  component: Dashboard,
});

const STAGES = [
  { key: "started", label: "Application started", note: "Voice onboarding completed" },
  { key: "documents", label: "Documents checked", note: "Caste, income and ID read" },
  { key: "scheme", label: "Scheme matched", note: "Recommendation accepted" },
  { key: "dpr", label: "Project report ready", note: "Draft generated and reviewed" },
  { key: "submitted", label: "Submitted to lending partner", note: "Dossier shared with consent" },
  { key: "review", label: "Under review", note: "Branch officer assessing the file" },
  { key: "decision", label: "Decision", note: "Sanction, clarification or rejection" },
  { key: "disbursement", label: "Disbursement", note: "Funds released in tranches" },
] as const;

function Dashboard() {
  const app = useApplication();
  const partner = routingService.list().find((p) => p.id === app.partnerId);
  const scheme = app.selectedSchemeId ? getScheme(app.selectedSchemeId) : null;

  const reached = app.reference
    ? 5
    : app.dpr
      ? 3
      : app.selectedSchemeId
        ? 2
        : app.documents.length
          ? 1
          : app.profile.name
            ? 0
            : -1;

  const submitted = app.submittedAt ? new Date(app.submittedAt) : null;
  const stamp = (i: number) => {
    if (i > reached) return "Pending";
    if (!submitted) return "Just now";
    const d = new Date(submitted.getTime() - (reached - i) * 26 * 60 * 1000);
    return d.toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" });
  };

  return (
    <SitePage>
      <section className="border-b border-border">
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
          <DemoBadge label="Prototype simulation" />
          <h1 className="mt-4 font-display text-4xl sm:text-5xl">Your application</h1>
          {reached < 0 ? (
            <>
              <p className="mt-4 max-w-xl text-sm text-muted-foreground">
                Nothing to track yet. Start the journey and this timeline fills in as you move.
              </p>
              <Button asChild size="lg" className="mt-6 h-12 text-base">
                <Link to="/apply/voice">Start My Application</Link>
              </Button>
            </>
          ) : (
            <dl className="mt-6 grid gap-4 sm:grid-cols-4">
              {[
                { l: "Reference", v: app.reference ?? "Not submitted" },
                { l: "Applicant", v: app.profile.name || "—" },
                { l: "Amount", v: formatINR(app.loan.amount) },
                { l: "Partner", v: partner?.name ?? "Not selected" },
              ].map((k) => (
                <div key={k.l} className="surface p-4">
                  <dt className="text-xs tracking-wide text-muted-foreground uppercase">{k.l}</dt>
                  <dd className="mt-1 text-sm font-semibold break-words">{k.v}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      </section>

      {reached >= 0 && (
        <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-lg font-semibold">Progress</h2>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-olive px-3 py-1 text-xs font-medium text-olive-foreground">
              <Clock className="size-3.5" /> SLA on track — 4 working days left
            </span>
          </div>

          <ol className="mt-8 relative border-l border-border pl-8">
            {STAGES.map((s, i) => {
              const done = i < reached;
              const current = i === reached;
              return (
                <li key={s.key} className="relative pb-8 last:pb-0">
                  <span
                    className={cn(
                      "absolute -left-[41px] grid size-6 place-items-center rounded-full border-2 bg-background",
                      done && "border-olive bg-olive text-olive-foreground",
                      current && "border-foreground",
                      !done && !current && "border-border",
                    )}
                  >
                    {done && <Check className="size-3.5" />}
                    {current && <span className="size-2 rounded-full bg-foreground" />}
                  </span>
                  <div
                    className={cn(
                      "surface p-4",
                      current && "border-foreground",
                      !done && !current && "opacity-60",
                    )}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="text-base font-semibold">{s.label}</p>
                      <span className="text-xs text-muted-foreground">{stamp(i)}</span>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">{s.note}</p>
                    {current && (
                      <p className="mt-3 text-xs font-medium text-olive">Current stage</p>
                    )}
                  </div>
                </li>
              );
            })}
          </ol>

          {scheme && (
            <div className="surface mt-6 p-5 text-sm">
              <p className="font-semibold">{scheme.name}</p>
              <p className="mt-1 text-muted-foreground">
                {scheme.interestRate} · {scheme.moratorium} · {scheme.tenure}
              </p>
              <DemoBadge className="mt-3" />
            </div>
          )}

          <PrototypeNote>
            Prototype simulation — stages, timestamps and SLA status are generated locally. No
            lender has received or reviewed anything.
          </PrototypeNote>
        </section>
      )}
    </SitePage>
  );
}
