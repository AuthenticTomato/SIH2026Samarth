import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/samarth/SiteChrome";
import { AI_DISCLAIMER } from "@/data/mockData";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy policy — Samarth prototype" },
      {
        name: "description",
        content:
          "What Samarth collects, where it is processed, how long it is kept and what rights you have. Prototype policy with placeholder entity details.",
      },
      { property: "og:title", content: "Privacy policy — Samarth prototype" },
      { property: "og:description", content: "What Samarth collects and how it is handled." },
    ],
  }),
  component: () => (
    <LegalPage
      title="Privacy policy"
      intro="Samarth is a hackathon prototype with no backend. This policy describes both what actually happens today and what a production deployment would be obliged to state."
    >
      <section>
        <h2>1. Who we are</h2>
        <p>
          This prototype is operated by [placeholder legal entity name], contactable at [placeholder
          contact email], [placeholder registered address]. We are not a government body and not a
          lending institution.
        </p>
      </section>
      <section>
        <h2>2. What happens in this prototype today</h2>
        <ul>
          <li>No account is created and no login exists.</li>
          <li>No data is transmitted to any server. There is no database.</li>
          <li>
            Anything you type, and any file you select, stays inside your browser tab and is
            discarded when you close or refresh the page.
          </li>
          <li>Uploaded files are not read, parsed or stored — verification results are fixed demo output.</li>
        </ul>
      </section>
      <section>
        <h2>3. Data a production version would collect</h2>
        <ul>
          <li>Identity data: name, contact number, district and state.</li>
          <li>Category and income data drawn from the certificates you submit.</li>
          <li>Enterprise data: activity, stage, customers, expected revenue.</li>
          <li>Credit data: requested amount, tenure preference, generated project report.</li>
          <li>Voice recordings and their transcripts, where voice onboarding is used.</li>
          <li>Technical data: device type, browser, coarse location for branch routing.</li>
        </ul>
      </section>
      <section>
        <h2>4. Purpose and lawful basis</h2>
        <p>
          Data would be processed solely to estimate eligibility, match schemes, generate an
          application dossier and route it to a lending partner you explicitly select. The basis is
          your specific, revocable consent, captured before any sharing occurs.
        </p>
      </section>
      <section>
        <h2>5. Sharing</h2>
        <p>
          A dossier would be shared only with the lending partner you choose, only after you tick
          the consent box, and only for the purpose of assessing that application. No data would be
          sold, and no data would be used for advertising.
        </p>
      </section>
      <section>
        <h2>6. Retention</h2>
        <p>
          A production deployment would retain application data for [placeholder retention period]
          and voice recordings for [placeholder retention period], after which records would be
          deleted or irreversibly anonymised. In this prototype, retention is zero.
        </p>
      </section>
      <section>
        <h2>7. Your rights</h2>
        <ul>
          <li>Access a copy of the data held about you.</li>
          <li>Correct anything inaccurate, including AI-extracted fields.</li>
          <li>Withdraw consent and have the dossier recalled where not yet acted upon.</li>
          <li>Request erasure, subject to any statutory record-keeping the lender is bound by.</li>
          <li>Complain to [placeholder supervisory authority].</li>
        </ul>
      </section>
      <section>
        <h2>8. Security</h2>
        <p>
          A production deployment would state encryption in transit and at rest, role-based access
          for reviewers, and audit logging of every dossier view. This prototype makes no such
          claims because it processes nothing.
        </p>
      </section>
      <section>
        <h2>9. AI disclaimer</h2>
        <p>{AI_DISCLAIMER}</p>
      </section>
    </LegalPage>
  ),
});
