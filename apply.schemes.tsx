import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, ChevronDown, Loader2 } from "lucide-react";
import { ApplyShell } from "@/components/samarth/ApplyShell";
import { DemoBadge, PrototypeNote } from "@/components/samarth/DemoBadge";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useApplication } from "@/context/ApplicationContext";
import { schemeService, type SchemeMatch } from "@/services";
import { formatINR } from "@/data/mockData";

export const Route = createFileRoute("/apply/schemes")({
  head: () => ({
    meta: [
      { title: "Scheme match — Samarth" },
      {
        name: "description",
        content:
          "A recommended concessional-credit scheme with a match score, the reasons behind it and alternatives. AI match does not guarantee approval.",
      },
      { property: "og:title", content: "Scheme match — Samarth" },
      { property: "og:description", content: "Find the scheme that fits you, with reasons shown." },
    ],
  }),
  component: SchemeStep,
});

function MatchRing({ score }: { score: number }) {
  const r = 34;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative grid size-24 shrink-0 place-items-center">
      <svg viewBox="0 0 80 80" className="absolute size-24 -rotate-90">
        <circle cx="40" cy="40" r={r} className="fill-none stroke-muted" strokeWidth="7" />
        <circle
          cx="40"
          cy="40"
          r={r}
          className="fill-none stroke-olive"
          strokeWidth="7"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c - (score / 100) * c}
        />
      </svg>
      <span className="font-display text-2xl">{score}%</span>
    </div>
  );
}

function SchemeStep() {
  const { profile, selectedSchemeId, update } = useApplication();
  const navigate = useNavigate();
  const [data, setData] = useState<{ recommended: SchemeMatch; alternatives: SchemeMatch[] } | null>(
    null,
  );

  useEffect(() => {
    let active = true;
    void schemeService
      .match({
        annualIncome: profile.annualIncome || 280000,
        loanRequirement: profile.loanRequirement || 250000,
      })
      .then((res) => {
        if (!active) return;
        setData(res);
        update({ matchScore: res.recommended.score });
        if (!selectedSchemeId) update({ selectedSchemeId: res.recommended.scheme.id });
      });
    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!data) {
    return (
      <ApplyShell title="Find the scheme that fits you.">
        <div className="surface flex items-center gap-3 p-8">
          <Loader2 className="size-5 animate-spin text-olive" />
          <p className="text-sm text-muted-foreground">Comparing your profile against modelled schemes…</p>
        </div>
      </ApplyShell>
    );
  }

  const { recommended, alternatives } = data;

  return (
    <ApplyShell
      title="Find the scheme that fits you."
      subtitle="One recommendation, with the reasoning laid out, plus alternatives if you disagree."
    >
      <article className="surface border-olive/40 p-6">
        <div className="flex items-center justify-between gap-4">
          <span className="text-xs font-medium tracking-widest text-olive uppercase">
            Recommended
          </span>
          <DemoBadge />
        </div>

        <div className="mt-4 flex flex-col gap-5 sm:flex-row sm:items-center">
          <MatchRing score={recommended.score} />
          <div>
            <h2 className="text-xl font-semibold">{recommended.scheme.name}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{recommended.scheme.tagline}</p>
          </div>
        </div>

        <ul className="mt-6 space-y-2">
          {recommended.reasons.map((r) => (
            <li key={r} className="flex gap-2 text-sm text-muted-foreground">
              <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-olive" aria-hidden />
              {r}
            </li>
          ))}
        </ul>

        <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-border pt-5 text-sm">
          <div>
            <dt className="text-muted-foreground">Loan range</dt>
            <dd className="mt-1 font-medium">
              {formatINR(recommended.scheme.minLoan)} – {formatINR(recommended.scheme.maxLoan)}
            </dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Concessional interest</dt>
            <dd className="mt-1 font-medium">{recommended.scheme.interestRate}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Moratorium</dt>
            <dd className="mt-1 font-medium">{recommended.scheme.moratorium}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Tenure</dt>
            <dd className="mt-1 font-medium">{recommended.scheme.tenure}</dd>
          </div>
        </dl>

        <Collapsible className="mt-6">
          <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg border border-border px-4 py-3 text-sm font-medium">
            Why this recommendation?
            <ChevronDown className="size-4" />
          </CollapsibleTrigger>
          <CollapsibleContent className="px-4 py-4 text-sm leading-relaxed text-muted-foreground">
            {recommended.rationale}
          </CollapsibleContent>
        </Collapsible>

        <Button
          size="lg"
          className="mt-6 h-12 w-full text-base"
          onClick={() => {
            update({ selectedSchemeId: recommended.scheme.id });
            navigate({ to: "/apply/dpr" });
          }}
        >
          Continue with this scheme <ArrowRight className="ml-1 size-4" />
        </Button>
      </article>

      <h2 className="pt-2 text-sm font-semibold tracking-widest text-muted-foreground uppercase">
        Alternatives
      </h2>
      <div className="space-y-4">
        {alternatives.map((alt) => (
          <article key={alt.scheme.id} className="surface p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-base font-semibold">{alt.scheme.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{alt.rationale}</p>
              </div>
              <span className="shrink-0 rounded-full bg-muted px-3 py-1 text-sm font-medium">
                {alt.score}%
              </span>
            </div>
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
              <p className="text-xs text-muted-foreground">
                {formatINR(alt.scheme.minLoan)} – {formatINR(alt.scheme.maxLoan)} ·{" "}
                {alt.scheme.interestRate}
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  update({ selectedSchemeId: alt.scheme.id, matchScore: alt.score });
                  navigate({ to: "/apply/dpr" });
                }}
              >
                Choose this instead
              </Button>
            </div>
          </article>
        ))}
      </div>

      <PrototypeNote>
        AI match does not guarantee approval. Scores are computed on demo data using a simple
        prototype heuristic and are not an eligibility determination.
      </PrototypeNote>
    </ApplyShell>
  );
}
