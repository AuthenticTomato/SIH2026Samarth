import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/samarth/SiteChrome";
import { AI_DISCLAIMER } from "@/data/mockData";

export const Route = createFileRoute("/consent")({
  head: () => ({
    meta: [
      { title: "Consent notice — Samarth prototype" },
      {
        name: "description",
        content:
          "What you are consenting to when you share a Samarth dossier with a lending partner, and how consent can be withdrawn.",
      },
      { property: "og:title", content: "Consent notice — Samarth prototype" },
      { property: "og:description", content: "What sharing a Samarth dossier would mean." },
    ],
  }),
  component: () => (
    <LegalPage
      title="Consent notice"
      intro="Sharing an application is a deliberate act. This notice states what that act would mean in a production deployment, and what it means here."
    >
      <section>
        <h2>1. In this prototype</h2>
        <p>
          Ticking the consent box at the dossier step does not transmit anything. It exists to
          demonstrate that consent must be explicit, informed and separate from every other action
          in the journey.
        </p>
      </section>
      <section>
        <h2>2. What you would be consenting to</h2>
        <ul>
          <li>Sharing your profile, verified document summary, eligibility result, matched scheme, project report and loan plan with the one lending partner you select.</li>
          <li>That partner contacting you on the number you provided regarding this application.</li>
          <li>Processing of the shared dossier for assessing this credit application only.</li>
        </ul>
      </section>
      <section>
        <h2>3. What you would not be consenting to</h2>
        <ul>
          <li>Sharing with any other lender, agent or intermediary.</li>
          <li>Marketing of any kind, from us or from the partner.</li>
          <li>Any use of your voice recording beyond producing your own transcript.</li>
          <li>Automated decision-making without human review by the lender.</li>
        </ul>
      </section>
      <section>
        <h2>4. Withdrawing consent</h2>
        <p>
          Consent could be withdrawn at any time by writing to [placeholder contact email], quoting
          your application reference. Withdrawal stops further processing; it cannot reverse a
          decision already recorded by a lender under their own statutory obligations.
        </p>
      </section>
      <section>
        <h2>5. Human review</h2>
        <p>
          Automated output only ever prepares an application. Assessment, verification and the
          decision itself remain with a human officer at the lending institution.
        </p>
      </section>
      <section>
        <h2>6. AI disclaimer</h2>
        <p>{AI_DISCLAIMER}</p>
      </section>
    </LegalPage>
  ),
});
