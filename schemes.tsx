import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SitePage } from "@/components/samarth/SiteChrome";
import { DemoBadge, PrototypeNote } from "@/components/samarth/DemoBadge";
import { Button } from "@/components/ui/button";
import { formatINR, schemes } from "@/data/mockData";

export const Route = createFileRoute("/schemes")({
  head: () => ({
    meta: [
      { title: "Modelled credit schemes — Samarth prototype" },
      {
        name: "description",
        content:
          "Four demonstration concessional-credit scheme structures with loan ranges, interest bands, moratorium periods and eligibility criteria. Demo data, not an official listing.",
      },
      { property: "og:title", content: "Modelled credit schemes — Samarth prototype" },
      {
        property: "og:description",
        content: "Four demonstration concessional-credit scheme structures. Demo data only.",
      },
    ],
  }),
  component: Schemes,
});

function Schemes() {
  return (
    <SitePage>
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <DemoBadge />
          <h1 className="mt-5 font-display text-5xl sm:text-6xl">Modelled schemes</h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
            These four structures were written for this prototype to demonstrate how scheme
            matching would behave. They are illustrative and do not reproduce, replace or represent
            any actual scheme, notification or circular.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <PrototypeNote>
          Demo data — based on general scheme structure, not an official listing. Always confirm
          real terms with the lending institution or the relevant department.
        </PrototypeNote>

        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          {schemes.map((s) => (
            <article key={s.id} className="surface flex flex-col p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="text-xs font-medium tracking-wide text-olive uppercase">
                    {s.focus}
                  </span>
                  <h2 className="mt-2 text-xl font-semibold">{s.name}</h2>
                </div>
                <DemoBadge />
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.description}</p>

              <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-border pt-5 text-sm">
                <div>
                  <dt className="text-muted-foreground">Loan range</dt>
                  <dd className="mt-1 font-medium">
                    {formatINR(s.minLoan)} – {formatINR(s.maxLoan)}
                  </dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Interest</dt>
                  <dd className="mt-1 font-medium">{s.interestRate}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Moratorium</dt>
                  <dd className="mt-1 font-medium">{s.moratorium}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Tenure</dt>
                  <dd className="mt-1 font-medium">{s.tenure}</dd>
                </div>
              </dl>

              <h3 className="mt-6 text-xs font-semibold tracking-widest text-muted-foreground uppercase">
                Eligibility criteria
              </h3>
              <ul className="mt-3 space-y-2">
                {s.eligibility.map((e) => (
                  <li key={e} className="flex gap-2 text-sm text-muted-foreground">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-olive" aria-hidden />
                    {e}
                  </li>
                ))}
              </ul>

              <p className="mt-6 text-xs text-muted-foreground">{s.source}</p>
            </article>
          ))}
        </div>

        <Button asChild size="lg" className="mt-10 h-12 text-base">
          <Link to="/apply/voice">
            Find my match <ArrowRight className="ml-1 size-4" />
          </Link>
        </Button>
      </section>
    </SitePage>
  );
}
