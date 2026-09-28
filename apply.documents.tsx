import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { ArrowRight, CheckCircle2, FileUp, Loader2, TriangleAlert } from "lucide-react";
import { ApplyShell } from "@/components/samarth/ApplyShell";
import { DemoBadge, PrototypeNote } from "@/components/samarth/DemoBadge";
import { Button } from "@/components/ui/button";
import { useApplication } from "@/context/ApplicationContext";
import { DOCUMENT_LABELS, documentService, type DocumentKind, type DocumentResult } from "@/services";

export const Route = createFileRoute("/apply/documents")({
  head: () => ({
    meta: [
      { title: "Document check — Samarth" },
      {
        name: "description",
        content:
          "Upload caste, income and identity documents for a simulated readability and verification check. Demo mode, nothing leaves your browser.",
      },
      { property: "og:title", content: "Document check — Samarth" },
      { property: "og:description", content: "A simulated document readability and verification check." },
    ],
  }),
  component: DocumentsStep,
});

const KINDS: DocumentKind[] = ["caste", "income", "id", "business"];

function UploadZone({
  kind,
  result,
  busy,
  onFile,
}: {
  kind: DocumentKind;
  result?: DocumentResult | undefined;
  busy: boolean;
  onFile: (name: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  if (busy) {
    return (
      <div className="surface flex items-center gap-3 p-6">
        <Loader2 className="size-5 animate-spin text-olive" />
        <div>
          <p className="text-sm font-medium">Reading {DOCUMENT_LABELS[kind]}…</p>
          <p className="text-xs text-muted-foreground">Simulated extraction in progress</p>
        </div>
      </div>
    );
  }

  if (result) {
    const ok = result.status === "Verified";
    return (
      <div className="surface p-6">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            {ok ? (
              <CheckCircle2 className="mt-0.5 size-5 text-olive" />
            ) : (
              <TriangleAlert className="mt-0.5 size-5 text-warning" />
            )}
            <div>
              <p className="text-base font-semibold">{result.label}</p>
              <p className="text-xs text-muted-foreground">{result.fileName}</p>
            </div>
          </div>
          <span
            className={`rounded-full px-2.5 py-1 text-xs font-medium ${ok ? "bg-olive text-olive-foreground" : "bg-warning text-warning-foreground"}`}
          >
            {result.status}
          </span>
        </div>
        <dl className="mt-5 grid gap-3 border-t border-border pt-4 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-muted-foreground">Detected type</dt>
            <dd className="mt-0.5 font-medium">{result.detectedType}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Extracted name</dt>
            <dd className="mt-0.5 font-medium">{result.extractedName}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Extracted detail</dt>
            <dd className="mt-0.5 font-medium">{result.extractedValue}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Readability</dt>
            <dd className="mt-0.5 font-medium">{result.readability}</dd>
          </div>
        </dl>
        <div className="mt-4 flex items-center justify-between gap-3">
          <DemoBadge label="Simulated verification — demo mode" />
          <Button variant="ghost" size="sm" onClick={() => inputRef.current?.click()}>
            Replace
          </Button>
          <input
            ref={inputRef}
            type="file"
            className="sr-only"
            onChange={(e) => onFile(e.target.files?.[0]?.name ?? "replacement.jpg")}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="surface border-dashed p-6 text-center">
      <FileUp className="mx-auto size-6 text-muted-foreground" />
      <p className="mt-3 text-base font-medium">{DOCUMENT_LABELS[kind]}</p>
      <p className="mt-1 text-xs text-muted-foreground">
        Photo or PDF. A clear, flat photo works best.
      </p>
      <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-center">
        <Button className="h-11" onClick={() => inputRef.current?.click()}>
          Choose file
        </Button>
        <Button
          variant="outline"
          className="h-11"
          onClick={() => onFile(`${kind}-sample.jpg`)}
        >
          Use demo file
        </Button>
      </div>
      <input
        ref={inputRef}
        type="file"
        className="sr-only"
        onChange={(e) => onFile(e.target.files?.[0]?.name ?? `${kind}.jpg`)}
      />
    </div>
  );
}

function DocumentsStep() {
  const { documents, update } = useApplication();
  const navigate = useNavigate();
  const [busy, setBusy] = useState<DocumentKind | null>(null);

  const handle = async (kind: DocumentKind, fileName: string) => {
    setBusy(kind);
    const res = await documentService.verify(kind, fileName);
    update({ documents: [...documents.filter((d) => d.kind !== kind), res] });
    setBusy(null);
  };

  const required: DocumentKind[] = ["caste", "income", "id"];
  const done = required.every((k) => documents.some((d) => d.kind === k));

  return (
    <ApplyShell
      title="Let's check your documents."
      subtitle="Three documents are needed. We read them for name, category and income, and tell you plainly if anything is unclear."
    >
      <PrototypeNote>
        Simulated verification — demo mode. Files you choose are never read, uploaded or stored;
        the results below are fixed demo output. Sensitive figures are partially masked.
      </PrototypeNote>

      <div className="space-y-4">
        {KINDS.map((kind) => (
          <UploadZone
            key={kind}
            kind={kind}
            busy={busy === kind}
            result={documents.find((d) => d.kind === kind)}
            onFile={(name) => handle(kind, name)}
          />
        ))}
      </div>

      <Button
        size="lg"
        className="h-12 w-full text-base"
        disabled={!done}
        onClick={() => navigate({ to: "/apply/eligibility" })}
      >
        {done ? "Check my eligibility" : "Add the three required documents"}
        {done && <ArrowRight className="ml-1 size-4" />}
      </Button>
    </ApplyShell>
  );
}
