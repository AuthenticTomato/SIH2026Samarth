import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Check, MessageCircle, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { ApplyShell } from "@/components/samarth/ApplyShell";
import { DemoBadge, PrototypeNote } from "@/components/samarth/DemoBadge";
import { QrCode } from "@/components/samarth/QrCode";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useApplication } from "@/context/ApplicationContext";
import { dossierService, routingService } from "@/services";
import { formatINR, getScheme } from "@/data/mockData";

export const Route = createFileRoute("/apply/dossier")({
  head: () => ({
    meta: [
      { title: "Bank-ready dossier — Samarth" },
      {
        name: "description",
        content:
          "A single QR-referenced dossier combining profile, documents, eligibility, scheme, project report and loan plan, shared only with your consent.",
      },
      { property: "og:title", content: "Bank-ready dossier — Samarth" },
      { property: "og:description", content: "One dossier, one reference, shared only with consent." },
    ],
  }),
  component: DossierStep,
});

function DossierStep() {
  const app = useApplication();
  const navigate = useNavigate();
  const [consent, setConsent] = useState(false);
  const [reference, setReference] = useState(app.reference);

  const partner = routingService.list().find((p) => p.id === app.partnerId);
  const scheme = getScheme(app.selectedSchemeId ?? "dccs");
  const name = app.profile.name || "Meera Devi";
  const ref = reference ?? "SMR-2026-PREVIEW";
  const payload = dossierService.payload(ref, name, app.loan.amount);

  const checklist = [
    { label: "Profile captured", done: Boolean(app.profile.name) },
    { label: `Documents checked (${app.documents.length})`, done: app.documents.length > 0 },
    { label: "Eligibility estimated", done: Boolean(app.eligibility) },
    { label: `Scheme selected — ${scheme.name}`, done: Boolean(app.selectedSchemeId) },
    { label: "Project report generated", done: Boolean(app.dpr) },
    { label: `Loan plan — ${formatINR(app.loan.amount)}`, done: true },
    { label: `Lending partner — ${partner?.name ?? "not selected"}`, done: Boolean(partner) },
  ];

  const confirm = async () => {
    const newRef = app.reference ?? dossierService.createReference(name);
    setReference(newRef);
    app.update({ reference: newRef, submittedAt: new Date().toISOString() });
    toast.success("Simulated submission recorded", {
      description: `Reference ${newRef}. Nothing was transmitted — this is a prototype.`,
    });
    navigate({ to: "/dashboard" });
  };

  return (
    <ApplyShell
      title="You're bank ready."
      subtitle="Everything you built sits in one dossier with a single reference. Nothing is shared until you say so."
    >
      <div className="surface p-6">
        <div className="flex items-center gap-2">
          <ShieldCheck className="size-5 text-olive" />
          <h2 className="text-base font-semibold">Application checklist</h2>
        </div>
        <ul className="mt-5 space-y-3">
          {checklist.map((c) => (
            <li key={c.label} className="flex items-center gap-3 text-sm">
              <span
                className={`grid size-6 shrink-0 place-items-center rounded-full ${
                  c.done ? "bg-olive text-olive-foreground" : "bg-muted text-muted-foreground"
                }`}
              >
                <Check className="size-3.5" />
              </span>
              <span className={c.done ? "" : "text-muted-foreground"}>{c.label}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="surface flex flex-col items-center p-6 text-center">
        <QrCode payload={payload} />
        <p className="mt-5 text-xs tracking-widest text-muted-foreground uppercase">
          Application reference
        </p>
        <p className="mt-1 font-display text-2xl">{ref}</p>
        <DemoBadge label="Placeholder QR — not scannable" className="mt-4" />
        <p className="mt-4 max-w-sm text-sm text-muted-foreground">
          A reviewer would scan this at the branch counter to open your dossier instead of
          re-keying every detail.
        </p>
      </div>

      <div className="surface space-y-5 p-6">
        <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed">
          <Checkbox
            className="mt-0.5"
            checked={consent}
            onCheckedChange={(v) => setConsent(v === true)}
          />
          <span>
            I consent to share my application with the selected lending partner
            {partner ? ` (${partner.name}, ${partner.branch})` : ""}. I understand this prototype
            transmits nothing and that only a lending institution can decide on credit.
          </span>
        </label>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button
            size="lg"
            className="h-12 flex-1 text-base"
            disabled={!consent}
            onClick={() => void confirm()}
          >
            Confirm &amp; Share
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="h-12 flex-1 text-base"
            onClick={async () => {
              const msg = await dossierService.share();
              toast.info(msg, { description: `Reference ${ref} would be sent to the partner.` });
            }}
          >
            <MessageCircle className="mr-1 size-4" /> Send to WhatsApp
          </Button>
        </div>

        <PrototypeNote>
          Simulated — WhatsApp Cloud API integration point. No message is sent and no dossier
          leaves your browser.
        </PrototypeNote>
      </div>
    </ApplyShell>
  );
}
