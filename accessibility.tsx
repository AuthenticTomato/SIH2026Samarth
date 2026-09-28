import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/samarth/SiteChrome";

export const Route = createFileRoute("/accessibility")({
  head: () => ({
    meta: [
      { title: "Accessibility statement — Samarth prototype" },
      {
        name: "description",
        content:
          "Samarth's accessibility commitments, the measures taken so far, known gaps in the prototype and how to report a barrier.",
      },
      { property: "og:title", content: "Accessibility statement — Samarth prototype" },
      { property: "og:description", content: "Accessibility commitments, gaps and feedback route." },
    ],
  }),
  component: () => (
    <LegalPage
      title="Accessibility"
      intro="A credit interface that excludes people with low literacy, low vision or unsteady hands has failed at its only job. This statement records where the prototype stands."
    >
      <section>
        <h2>1. Commitment</h2>
        <p>
          We aim for WCAG 2.1 Level AA as the baseline for any production deployment, with
          voice-first interaction as the primary path rather than an accommodation bolted on later.
        </p>
      </section>
      <section>
        <h2>2. Measures taken in this prototype</h2>
        <ul>
          <li>Voice onboarding first; typing is optional and always available as a fallback.</li>
          <li>Large tap targets — primary controls are at least 44px tall.</li>
          <li>High-contrast text on solid surfaces; no text placed over busy imagery.</li>
          <li>Semantic headings, landmarks and labelled form controls throughout.</li>
          <li>Visible keyboard focus and full keyboard operability of the journey.</li>
          <li>Meaning never carried by colour alone; every status also carries a word.</li>
          <li>Plain language, short sentences, and explanations beside every automated judgement.</li>
          <li>Motion limited to short, non-essential transitions.</li>
        </ul>
      </section>
      <section>
        <h2>3. Known gaps</h2>
        <ul>
          <li>Screen-reader announcements for asynchronous results are not yet exhaustive.</li>
          <li>Hindi copy covers the demo transcript, not the whole interface.</li>
          <li>The QR image is decorative in this build and conveys no readable content.</li>
          <li>Charts in the district view have no tabular equivalent yet.</li>
          <li>No formal audit has been carried out by an external assessor.</li>
        </ul>
      </section>
      <section>
        <h2>4. Assistive routes we would add</h2>
        <ul>
          <li>Read-aloud of every screen in the user's chosen language.</li>
          <li>Additional regional languages beyond English and Hindi.</li>
          <li>An assisted mode for a facilitator completing the journey alongside an applicant.</li>
          <li>Low-bandwidth and low-end device modes.</li>
        </ul>
      </section>
      <section>
        <h2>5. Reporting a barrier</h2>
        <p>
          Write to [placeholder accessibility contact email] or use the contact page and select
          "Accessibility barrier". A production deployment would acknowledge within [placeholder
          response time].
        </p>
      </section>
    </LegalPage>
  ),
});
