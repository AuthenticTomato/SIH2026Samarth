import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/samarth/SiteChrome";
import { AI_DISCLAIMER } from "@/data/mockData";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of use — Samarth prototype" },
      {
        name: "description",
        content:
          "Terms governing use of the Samarth hackathon prototype, including permitted use, no-warranty terms and limits of liability.",
      },
      { property: "og:title", content: "Terms of use — Samarth prototype" },
      { property: "og:description", content: "Terms governing use of the Samarth prototype." },
    ],
  }),
  component: () => (
    <LegalPage
      title="Terms of use"
      intro="By using this prototype you accept the terms below. They exist to make plain what this software is and is not."
    >
      <section>
        <h2>1. Nature of the service</h2>
        <p>
          Samarth is a demonstration prototype built for Smart India Hackathon 2026 by [placeholder
          legal entity name]. It is not a government service, is not endorsed by any government
          body or lending institution, and does not process real applications.
        </p>
      </section>
      <section>
        <h2>2. Permitted use</h2>
        <ul>
          <li>Evaluating and demonstrating the prototype's workflow.</li>
          <li>Educational and research review of the interaction design.</li>
          <li>
            Not permitted: presenting output as an official determination, using it to solicit
            money from applicants, or reproducing it as a government-affiliated service.
          </li>
        </ul>
      </section>
      <section>
        <h2>3. No advice, no decision</h2>
        <p>
          Nothing shown constitutes financial, legal or eligibility advice. Match scores,
          eligibility verdicts, document verification results, branch recommendations and repayment
          figures are simulated and indicative. Only a lending institution can verify eligibility
          and sanction credit.
        </p>
      </section>
      <section>
        <h2>4. Accuracy</h2>
        <p>
          Scheme names, terms, interest bands, moratorium periods and lending-partner details in
          this prototype are fictional and written for demonstration. They do not reproduce any
          real scheme or institution.
        </p>
      </section>
      <section>
        <h2>5. No warranty</h2>
        <p>
          The prototype is provided "as is" without warranty of any kind, express or implied,
          including fitness for a particular purpose and uninterrupted availability.
        </p>
      </section>
      <section>
        <h2>6. Limitation of liability</h2>
        <p>
          To the fullest extent permitted by law, [placeholder legal entity name] is not liable for
          any loss arising from reliance on prototype output, including financial loss, missed
          deadlines or rejected applications.
        </p>
      </section>
      <section>
        <h2>7. Intellectual property</h2>
        <p>
          Interface design and code belong to [placeholder legal entity name]. Third-party
          components remain under their respective licences.
        </p>
      </section>
      <section>
        <h2>8. Changes and governing law</h2>
        <p>
          These terms may change without notice during the prototype period. They are governed by
          the laws of [placeholder jurisdiction].
        </p>
      </section>
      <section>
        <h2>9. AI disclaimer</h2>
        <p>{AI_DISCLAIMER}</p>
      </section>
    </LegalPage>
  ),
});
