import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SitePage } from "@/components/samarth/SiteChrome";
import { DemoBadge } from "@/components/samarth/DemoBadge";
import { Button } from "@/components/ui/button";
import { AI_DISCLAIMER } from "@/data/mockData";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title: "How Samarth works — voice to bank-ready dossier" },
      {
        name: "description",
        content:
          "Eight steps from a spoken description of your livelihood to a bank-ready credit dossier. A walkthrough of the Samarth hackathon prototype.",
      },
      { property: "og:title", content: "How Samarth works — voice to bank-ready dossier" },
      {
        property: "og:description",
        content: "Eight steps from spoken words to a bank-ready credit dossier.",
      },
    ],
  }),
  component: HowItWorks,
});

const STEPS = [
  {
    t: "Speak, in English or Hindi",
    d: "You describe your work, your location and what you need. The prototype plays back a simulated transcript and shows the fields it understood so you can correct them. Nothing is assumed silently.",
    sim: "Simulated speech recognition",
  },
  {
    t: "Documents read and checked",
    d: "Caste certificate, income certificate and ID are read for name, category and income. Each result shows readability and whether it needs review. Sensitive numbers are masked on screen.",
    sim: "Simulated document verification",
  },
  {
    t: "Eligibility, in plain language",
    d: "Instead of a yes/no, you see each check — category, income, business compatibility, loan size, location — with the reason behind it.",
    sim: "Prototype estimate, not a sanction",
  },
  {
    t: "Scheme matched with reasons",
    d: "A match score with the specific reasons behind it, plus alternatives, so you can disagree with the recommendation on informed grounds.",
    sim: "AI match does not guarantee approval",
  },
  {
    t: "Project report from a conversation",
    d: "Five questions become a structured report: summary, business, market, cost, funding, revenue and repayment. Editable and printable.",
    sim: "AI-generated draft",
  },
  {
    t: "Loan and moratorium planned",
    d: "Adjust amount, rate, tenure and moratorium and watch the instalment, interest and timeline move. Estimates only.",
    sim: "Estimate only",
  },
  {
    t: "Routed to a lending partner",
    d: "Branches are ranked by distance, funding availability and portfolio health, so you don't walk to a branch with nothing left to lend.",
    sim: "Demo branch data",
  },
  {
    t: "One dossier, one reference",
    d: "Everything collapses into a single QR-referenced dossier you consent to share, then track through review to decision.",
    sim: "Simulated sharing",
  },
];

function HowItWorks() {
  return (
    <SitePage>
      <section className="border-b border-border">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
          <DemoBadge label="Prototype simulation" />
          <h1 className="mt-5 font-display text-5xl sm:text-6xl">How Samarth works</h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
            Every step below is functional in this prototype, and every step is powered by
            simulated data. Nothing here is verified by, submitted to, or endorsed by any
            institution.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
        <ol className="space-y-4">
          {STEPS.map((s, i) => (
            <li key={s.t} className="surface flex flex-col gap-3 p-6 sm:flex-row sm:gap-6">
              <span className="font-display text-3xl text-olive sm:w-14">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h2 className="text-lg font-semibold">{s.t}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
                <DemoBadge label={s.sim} className="mt-4" />
              </div>
            </li>
          ))}
        </ol>

        <div className="surface mt-10 p-6">
          <h2 className="text-base font-semibold">AI disclaimer</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{AI_DISCLAIMER}</p>
        </div>

        <Button asChild size="lg" className="mt-10 h-12 text-base">
          <Link to="/apply/voice">
            Start My Application <ArrowRight className="ml-1 size-4" />
          </Link>
        </Button>
      </section>
    </SitePage>
  );
}
