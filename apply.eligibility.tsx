import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, Check, Loader2, TriangleAlert, X } from "lucide-react";
import { ApplyShell } from "@/components/samarth/ApplyShell";
import { DemoBadge, PrototypeNote } from "@/components/samarth/DemoBadge";
import { Button } from "@/components/ui/button";
import { useApplication } from "@/context/ApplicationContext";
import { eligibilityService, type EligibilityResult } from "@/services";

export const Route = createFileRoute("/apply/eligibility")({
  head: () => ({
    meta: [
      { title: "Eligibility estimate — Samarth" },
      {
        name: "description",
        content:
          "A plain-language eligibility estimate across category, income, business, loan size and location. A prototype estimate, never a sanction decision.",
      },
      { property: "og:title", content: "Eligibility estimate — Samarth" },
      { property: "og:description", content: "A plain-language eligibility estimate, not a decision." },
    ],
  }),
  component: EligibilityStep,
});

const VERDICT_STYLES: Record<EligibilityResult["verdict"], string> = {
  Eligible: "bg-olive text-olive-foreground",
  "Needs Clarification": "bg-warning text-warning-foreground",
  "Not Currently Eligible": "bg-destructive text-destructive-foreground",
};

function EligibilityStep() {
  const { profile, eligibility, update } = useApplication();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(!eligibility);

  useEffect(() => {
    if (eligibility) return;
    let active = true;
    void eligibilityService
      .evaluate({
        annualIncome: profile.annualIncome || 280000,
        loanRequirement: profile.loanRequirement || 250000,
        business: profile.business || "Dairy enterprise",
        location: profile.location || "Varanasi, Uttar Pradesh",
      })
      .then((res) => {
        if (!active) return;
        update({ eligibility: res });
        setLoading(false);
      });
    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ApplyShell
      title="Where you stand."
      subtitle="Each check below is shown with its reason, so you know what to fix rather than just that something failed."
    >
      {loading || !eligibility ? (
        <div className="surface flex items-center gap-3 p-8">
          <Loader2 className="size-5 animate-spin text-olive" />
          <p className="text-sm text-muted-foreground">Running the eligibility estimate…</p>
        </div>
      ) : (
        <>
          <div className="surface p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span
                className={`rounded-full px-4 py-1.5 text-sm font-semibold ${VERDICT_STYLES[eligibility.verdict]}`}
              >
                {eligibility.verdict}
              </span>
              <DemoBadge label="Prototype estimate" />
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Based on what you told us and the documents you added, your profile fits the modelled
              scheme criteria used in this prototype.
            </p>
          </div>

          <ul className="space-y-3">
            {eligibility.checks.map((c) => (
              <li key={c.label} className="surface flex gap-4 p-5">
                <span
                  className={`mt-0.5 grid size-7 shrink-0 place-items-center rounded-full ${
                    c.passed
                      ? "bg-olive text-olive-foreground"
                      : "bg-warning text-warning-foreground"
                  }`}
                >
                  {c.passed ? <Check className="size-4" /> : <X className="size-4" />}
                </span>
                <div>
                  <p className="text-base font-semibold">{c.label}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{c.detail}</p>
                </div>
              </li>
            ))}
          </ul>

          <PrototypeNote>
            <span className="inline-flex items-start gap-2">
              <TriangleAlert className="mt-0.5 size-4 shrink-0" />
              This is a prototype estimate, not an official sanction decision. Only a lending
              institution can verify eligibility and approve credit.
            </span>
          </PrototypeNote>

          <Button
            size="lg"
            className="h-12 w-full text-base"
            onClick={() => navigate({ to: "/apply/schemes" })}
          >
            See matched schemes <ArrowRight className="ml-1 size-4" />
          </Button>
        </>
      )}
    </ApplyShell>
  );
}
