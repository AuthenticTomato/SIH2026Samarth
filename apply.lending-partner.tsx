import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Check, MapPin } from "lucide-react";
import { ApplyShell } from "@/components/samarth/ApplyShell";
import { DemoBadge, PrototypeNote } from "@/components/samarth/DemoBadge";
import { Button } from "@/components/ui/button";
import { useApplication } from "@/context/ApplicationContext";
import { routingService, type PartnerFilter } from "@/services";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/apply/lending-partner")({
  head: () => ({
    meta: [
      { title: "Lending partner routing — Samarth" },
      {
        name: "description",
        content:
          "Compare demo bank, regional rural bank and microfinance branches by distance, funding availability and portfolio health before applying.",
      },
      { property: "og:title", content: "Lending partner routing — Samarth" },
      { property: "og:description", content: "Compare branches by distance and funding availability." },
    ],
  }),
  component: PartnerStep,
});

const FILTERS: { key: PartnerFilter; label: string }[] = [
  { key: "nearest", label: "Nearest" },
  { key: "active", label: "Active funding" },
  { key: "psb", label: "PSB" },
  { key: "rrb", label: "RRB" },
  { key: "lownpa", label: "Low NPA" },
];

const STATUS_STYLE: Record<string, string> = {
  "Active funding": "bg-olive text-olive-foreground",
  "Limited funding": "bg-warning text-warning-foreground",
  Paused: "bg-muted text-muted-foreground",
};

function PartnerStep() {
  const { partnerId, update } = useApplication();
  const navigate = useNavigate();
  const [filter, setFilter] = useState<PartnerFilter>("nearest");
  const partners = routingService.filter(filter);

  return (
    <ApplyShell
      title="Where should this go?"
      subtitle="Branches differ. Some have exhausted their funding for the cycle, some turn files around in a week. Pick with that in front of you."
    >
      {/* Static map stand-in. A later build can drop an OpenStreetMap / Leaflet
          canvas in here, centred on the applicant's district, with a marker per partner. */}
      <div className="surface relative h-40 overflow-hidden">
        <div className="hairline-grid absolute inset-0" aria-hidden />
        <div className="absolute inset-0 grid place-items-center text-center">
          <div>
            <MapPin className="mx-auto size-5 text-olive" />
            <p className="mt-2 text-sm font-medium">Varanasi district</p>
            <p className="text-xs text-muted-foreground">
              Map placeholder — a live map would render partner locations here
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <Button
            key={f.key}
            size="sm"
            variant={filter === f.key ? "default" : "outline"}
            onClick={() => setFilter(f.key)}
          >
            {f.label}
          </Button>
        ))}
      </div>

      <div className="space-y-4">
        {partners.map((p) => {
          const selected = partnerId === p.id;
          const disabled = p.fundingAvailability === "Paused";
          return (
            <article
              key={p.id}
              className={cn("surface p-5", selected && "border-olive ring-1 ring-olive")}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-base font-semibold">{p.name}</h2>
                    <span className="rounded-full border border-border px-2 py-0.5 text-[11px] font-medium">
                      {p.type}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{p.branch}</p>
                </div>
                <span
                  className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${STATUS_STYLE[p.fundingAvailability]}`}
                >
                  {p.fundingAvailability}
                </span>
              </div>

              <dl className="mt-4 grid grid-cols-3 gap-3 border-t border-border pt-4 text-sm">
                <div>
                  <dt className="text-xs text-muted-foreground">Distance</dt>
                  <dd className="mt-0.5 font-medium">{p.distanceKm} km</dd>
                </div>
                <div>
                  <dt className="text-xs text-muted-foreground">Portfolio NPA</dt>
                  <dd className="mt-0.5 font-medium">{p.npaBand}</dd>
                </div>
                <div>
                  <dt className="text-xs text-muted-foreground">Avg. turnaround</dt>
                  <dd className="mt-0.5 font-medium">{p.avgTurnaround}</dd>
                </div>
              </dl>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                <DemoBadge />
                <Button
                  size="sm"
                  variant={selected ? "default" : "outline"}
                  disabled={disabled}
                  onClick={() => update({ partnerId: p.id })}
                >
                  {selected ? (
                    <>
                      <Check className="mr-1 size-3.5" /> Selected
                    </>
                  ) : disabled ? (
                    "Not accepting files"
                  ) : (
                    "Select this partner"
                  )}
                </Button>
              </div>
            </article>
          );
        })}
      </div>

      <PrototypeNote>
        Demo data — partner names, distances, funding status, NPA bands and turnaround times are
        fictional and do not describe any real institution or branch.
      </PrototypeNote>

      <Button
        size="lg"
        className="h-12 w-full text-base"
        disabled={!partnerId}
        onClick={() => navigate({ to: "/apply/dossier" })}
      >
        {partnerId ? "Build my dossier" : "Select a lending partner to continue"}
        {partnerId && <ArrowRight className="ml-1 size-4" />}
      </Button>
    </ApplyShell>
  );
}
