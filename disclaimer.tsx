import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/samarth/SiteChrome";
import { AI_DISCLAIMER } from "@/data/mockData";

export const Route = createFileRoute("/disclaimer")({
  head: () => ({
    meta: [
      { title: "AI disclaimer and prototype limitations — Samarth" },
      {
        name: "description",
        content:
          "The full AI disclaimer for Samarth, plus an honest list of what is simulated and what the prototype cannot do.",
      },
      { property: "og:title", content: "AI disclaimer and prototype limitations — Samarth" },
      {
        property: "og:description",
        content: "What is simulated in Samarth and what the prototype cannot do.",
      },
    ],
  }),
  component: () => (
    <LegalPage
      title="AI disclaimer"
      intro="This page states, in one place, exactly how much weight the output of this prototype deserves."
    >
      <section>
        <blockquote className="rounded-xl border-l-4 border-olive bg-muted p-5 text-base leading-relaxed text-foreground not-italic">
          {AI_DISCLAIMER}
        </blockquote>
      </section>
      <section>
        <h2>1. No official status</h2>
        <p>
          Samarth is not a government website, is not affiliated with any ministry, department,
          bank, regional rural bank or microfinance institution, and carries no endorsement from
          any of them.
        </p>
      </section>
      <section>
        <h2>2. What is simulated</h2>
        <ul>
          <li>Voice recognition — a fixed sample transcript is played back, no audio is captured.</li>
          <li>Document verification — results are pre-written and unrelated to any file you select.</li>
          <li>Eligibility — a prototype estimate against invented thresholds, never a sanction.</li>
          <li>Scheme matching — a heuristic score over fictional schemes; not an entitlement.</li>
          <li>Project reports — template text assembled from your answers, not a vetted appraisal.</li>
          <li>Loan figures — indicative arithmetic; not a quotation, offer or sanction letter.</li>
          <li>Lending-partner data — fictional branches, distances, funding status and turnaround.</li>
          <li>Submission, QR dossier, WhatsApp sharing and status tracking — all simulated.</li>
        </ul>
      </section>
      <section>
        <h2>3. Known limitations</h2>
        <ul>
          <li>No backend, no authentication, no persistence — refreshing clears everything.</li>
          <li>No real language model runs; nothing you type influences the underlying data.</li>
          <li>Only English and Hindi are demonstrated, and only in the interface copy.</li>
          <li>The QR image is a visual placeholder, not a scannable code.</li>
          <li>Accessibility work is in progress; see the accessibility statement.</li>
        </ul>
      </section>
      <section>
        <h2>4. If you need a real decision</h2>
        <p>
          Approach the lending institution directly, or the district office responsible for the
          scheme you are interested in. Verify all terms with them. Do not act financially on
          anything this prototype displays.
        </p>
      </section>
    </LegalPage>
  ),
});
