import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  FileText,
  Mic,
  Sparkles,
  Target,
  Wallet,
} from "lucide-react";
import { SitePage } from "@/components/samarth/SiteChrome";
import { DemoBadge } from "@/components/samarth/DemoBadge";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs, formatINR, impactMetrics, schemes } from "@/data/mockData";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Samarth — Credit should be accessible to everyone" },
      {
        name: "description",
        content:
          "A voice-first prototype that helps SC beneficiaries discover concessional credit schemes, build a bank-ready application and track it. Hackathon demo with simulated data.",
      },
      { property: "og:title", content: "Samarth — Credit should be accessible to everyone" },
      {
        property: "og:description",
        content:
          "Discover concessional credit schemes, build a bank-ready application and track it. Smart India Hackathon 2026 prototype.",
      },
    ],
  }),
  component: Home,
});

const PILLARS = [
  { icon: Mic, name: "SPEAK", text: "Describe your work in your own language. No forms first." },
  { icon: Target, name: "MATCH", text: "See which modelled schemes actually fit your situation." },
  { icon: FileText, name: "BUILD", text: "Documents read and checked, gaps flagged in plain words." },
  { icon: Sparkles, name: "PLAN", text: "A structured project report generated from a conversation." },
  { icon: Building2, name: "CONNECT", text: "Routed to a lending partner with funding available." },
  { icon: BadgeCheck, name: "TRACK", text: "One dossier, one reference, visible progress throughout." },
];

function Home() {
  return (
    <SitePage>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="hairline-grid pointer-events-none absolute inset-0" aria-hidden />
        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <div className="max-w-3xl">
            <DemoBadge label="Prototype simulation" />
            <h1 className="mt-5 font-display text-5xl leading-[1.05] sm:text-7xl">
              Credit should be accessible to everyone.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Samarth turns a two-minute spoken description of your livelihood into a matched
              scheme, a checked document set, a written project report and a bank-ready dossier —
              without a single form to start with.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="h-12 text-base">
                <Link to="/apply/voice">
                  Start My Application <ArrowRight className="ml-1 size-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-12 text-base">
                <Link to="/how-it-works">See How It Works</Link>
              </Button>
            </div>
            <p className="mt-6 max-w-lg text-sm leading-relaxed text-muted-foreground">
              Nothing you enter leaves your browser. This prototype has no backend, no login and no
              storage — it is a demonstration of a workflow, not a live service.
            </p>
          </div>
        </div>
      </section>

      {/* Scheme showcase */}
      <section className="border-b border-border py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="font-display text-3xl sm:text-4xl">Schemes modelled in this demo</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Structures written for demonstration. Not an official listing.
              </p>
            </div>
            <DemoBadge />
          </div>
          <div className="mt-8 flex snap-x gap-4 overflow-x-auto pb-4">
            {schemes.map((s) => (
              <article
                key={s.id}
                className="surface w-[300px] shrink-0 snap-start p-6 sm:w-[340px]"
              >
                <span className="text-xs font-medium tracking-wide text-olive uppercase">
                  {s.focus}
                </span>
                <h3 className="mt-3 text-lg font-semibold">{s.name}</h3>
                <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{s.tagline}</p>
                <dl className="mt-5 space-y-2 text-sm">
                  <div className="flex justify-between gap-3">
                    <dt className="text-muted-foreground">Loan range</dt>
                    <dd className="text-right font-medium">
                      {formatINR(s.minLoan)}–{formatINR(s.maxLoan)}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt className="text-muted-foreground">Interest</dt>
                    <dd className="text-right font-medium">{s.interestRate}</dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt className="text-muted-foreground">Moratorium</dt>
                    <dd className="text-right font-medium">{s.moratorium}</dd>
                  </div>
                </dl>
                <DemoBadge className="mt-5" />
              </article>
            ))}
          </div>
          <div className="grid gap-4 border-t border-border pt-8 sm:grid-cols-4">
            {[
              { k: "4", v: "Scheme structures modelled" },
              { k: "5", v: "Lending partners modelled" },
              { k: "2", v: "Languages in the demo" },
              { k: "8", v: "Steps from voice to dossier" },
            ].map((item) => (
              <div key={item.v}>
                <p className="font-display text-4xl">{item.k}</p>
                <p className="mt-1 text-sm text-muted-foreground">{item.v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem */}
      <section className="border-b border-border bg-card py-16">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 md:grid-cols-2">
          <div>
            <h2 className="font-display text-3xl sm:text-4xl">
              The credit exists. Reaching it is the problem.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Concessional credit for SC entrepreneurs is designed to be reachable, yet the path to
              it assumes literacy, paperwork fluency, travel, and knowing which of many overlapping
              schemes applies to you. Applications fail long before a bank ever sees them.
            </p>
          </div>
          <ul className="space-y-4">
            {[
              "Applicants rarely know which scheme fits their activity and income band.",
              "Certificates are collected in the wrong order and rejected on technicalities.",
              "A detailed project report is expected, but nobody explains how to write one.",
              "Branch selection is guesswork — some branches have no funding left this cycle.",
              "Once submitted, an applicant has no visibility into where the file is stuck.",
            ].map((item) => (
              <li key={item} className="surface flex gap-3 p-4 text-sm text-muted-foreground">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-olive" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* How it works */}
      <section className="border-b border-border py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="font-display text-3xl sm:text-4xl">Three steps, plainly</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              { n: "01", t: "Speak", d: "Say what you do and what you need. We turn it into structured information you can correct." },
              { n: "02", t: "Build", d: "Documents are read, eligibility is estimated, a scheme is matched and a project report is drafted." },
              { n: "03", t: "Connect", d: "A single dossier with a QR reference goes to a lending partner, and you watch it move." },
            ].map((s) => (
              <div key={s.n} className="surface p-6">
                <span className="font-display text-3xl text-olive">{s.n}</span>
                <h3 className="mt-4 text-lg font-semibold">{s.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Six pillars */}
      <section className="border-b border-border bg-foreground py-16 text-background">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="font-display text-3xl sm:text-4xl">The six-pillar journey</h2>
          <p className="mt-2 text-sm text-background/70">
            SPEAK · MATCH · BUILD · PLAN · CONNECT · TRACK
          </p>
          <div className="mt-10 grid gap-px overflow-hidden rounded-xl bg-background/15 sm:grid-cols-2 lg:grid-cols-3">
            {PILLARS.map((p) => (
              <div key={p.name} className="bg-foreground p-6">
                <p.icon className="size-5 text-background/70" aria-hidden />
                <h3 className="mt-4 text-sm font-semibold tracking-widest">{p.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-background/70">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact metrics */}
      <section className="border-b border-border py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <h2 className="font-display text-3xl sm:text-4xl">Demo metrics</h2>
            <DemoBadge label="Simulated" />
          </div>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground">
            These figures describe the prototype's simulated dataset. They are not measurements of
            any real programme.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {impactMetrics.map((m) => (
              <div key={m.label} className="surface p-6">
                <p className="font-display text-4xl">{m.value}</p>
                <p className="mt-2 text-sm text-muted-foreground">{m.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-b border-border bg-card py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="font-display text-3xl sm:text-4xl">Questions worth asking</h2>
          <Accordion type="single" collapsible className="mt-6">
            {faqs.map((f) => (
              <AccordionItem key={f.q} value={f.q}>
                <AccordionTrigger className="text-left text-base">{f.q}</AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <Wallet className="mx-auto size-6 text-olive" aria-hidden />
          <h2 className="mt-5 font-display text-4xl sm:text-5xl">
            Walk the whole journey in ten minutes.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Load the sample beneficiary and move from spoken words to a bank-ready dossier.
          </p>
          <Button asChild size="lg" className="mt-8 h-12 text-base">
            <Link to="/apply/voice">
              Start My Application <ArrowRight className="ml-1 size-4" />
            </Link>
          </Button>
        </div>
      </section>
    </SitePage>
  );
}
