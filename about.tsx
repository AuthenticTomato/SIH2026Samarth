import { createFileRoute } from "@tanstack/react-router";
import { SitePage } from "@/components/samarth/SiteChrome";
import { DemoBadge } from "@/components/samarth/DemoBadge";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Samarth — a hackathon prototype for credit access" },
      {
        name: "description",
        content:
          "Why Samarth exists, what it does and does not claim, and how the prototype was built for Smart India Hackathon 2026.",
      },
      { property: "og:title", content: "About Samarth — a hackathon prototype" },
      {
        property: "og:description",
        content: "Why Samarth exists and what this prototype does and does not claim.",
      },
    ],
  }),
  component: About,
});

function About() {
  return (
    <SitePage>
      <section className="border-b border-border">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
          <DemoBadge label="Prototype simulation" />
          <h1 className="mt-5 font-display text-5xl sm:text-6xl">About Samarth</h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
            Samarth means capable. The premise of this project is that the people concessional
            credit is designed for are already capable — what fails them is the interface.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl space-y-10 px-4 py-14 text-sm leading-relaxed text-muted-foreground sm:px-6">
        <div>
          <h2 className="text-lg font-semibold text-foreground">What this is</h2>
          <p className="mt-3">
            A working front-end prototype built for Smart India Hackathon 2026. It demonstrates an
            end-to-end journey: voice onboarding, document reading, eligibility explanation, scheme
            matching, project-report generation, loan planning, lending-partner routing and a
            shareable dossier — plus reviewer and district views.
          </p>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-foreground">What this is not</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li>Not an official government portal and not endorsed by any government body.</li>
            <li>Not affiliated with any bank, regional rural bank, or microfinance institution.</li>
            <li>Not a source of official scheme terms — every scheme here is written for demo.</li>
            <li>Not connected to any live system: there is no backend, no login and no storage.</li>
          </ul>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-foreground">How it is built</h2>
          <p className="mt-3">
            The interface is a client-side React application. Every intelligent behaviour — speech
            recognition, document extraction, matching, report drafting, routing — sits behind a
            small service function that currently returns fixed demo data after a short simulated
            delay. That boundary is deliberate: each one is a slot where a real model or API would
            attach in a production build, without the interface changing.
          </p>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-foreground">Design principles</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li>Speaking beats typing. Typing is a fallback, never the entry point.</li>
            <li>Every automated judgement shows its reasons, and every reason can be disputed.</li>
            <li>Uncertainty is labelled, not hidden. "Needs review" is a valid, visible outcome.</li>
            <li>No result is presented as a decision. Only a lender decides.</li>
          </ul>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-foreground">Team and contact</h2>
          <p className="mt-3">
            Built by [placeholder team name] for Smart India Hackathon 2026. Reach us at
            [placeholder contact email]. The legal entity behind this prototype is [placeholder
            legal entity name].
          </p>
        </div>
      </section>
    </SitePage>
  );
}
