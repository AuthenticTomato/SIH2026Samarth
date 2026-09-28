import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Check, Mic, Pencil, Square } from "lucide-react";
import { ApplyShell } from "@/components/samarth/ApplyShell";
import { DemoBadge, PrototypeNote } from "@/components/samarth/DemoBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useApplication } from "@/context/ApplicationContext";
import { voiceService, type VoiceResult } from "@/services";
import { formatINR } from "@/data/mockData";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/apply/voice")({
  head: () => ({
    meta: [
      { title: "Speak your application — Samarth" },
      {
        name: "description",
        content:
          "Start a credit application by describing your livelihood out loud in English or Hindi. Simulated voice recognition, demo mode.",
      },
      { property: "og:title", content: "Speak your application — Samarth" },
      {
        property: "og:description",
        content: "Describe your livelihood out loud instead of filling a form.",
      },
    ],
  }),
  component: VoiceStep,
});

function VoiceStep() {
  const { profile, update, loadSample } = useApplication();
  const navigate = useNavigate();
  const [state, setState] = useState<"idle" | "listening" | "done">("idle");
  const [result, setResult] = useState<VoiceResult | null>(null);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState({
    name: "",
    location: "",
    business: "",
    loanRequirement: 0,
    annualIncome: 0,
  });

  const language = profile.language;

  const start = async () => {
    setState("listening");
    const res = await voiceService.listen(language);
    setResult(res);
    setDraft(res.extracted);
    setState("done");
  };

  const confirm = () => {
    update({
      profile: { ...draft, language },
      transcript: result?.transcript ?? "",
      loan: { amount: draft.loanRequirement, rate: 7, tenureMonths: 60, moratoriumMonths: 6 },
    });
    navigate({ to: "/apply/documents" });
  };

  return (
    <ApplyShell
      title="Tell us about your work."
      subtitle="Press the microphone and speak naturally — your name, where you live, what you do, and how much you need. No forms yet."
    >
      <PrototypeNote>
        Simulated voice recognition — demo mode. No microphone is accessed and no audio is
        recorded. A fixed sample transcript is played back to demonstrate the flow.
      </PrototypeNote>

      <div className="surface p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Label className="text-sm">Language</Label>
          <div className="flex gap-2">
            {(["en", "hi"] as const).map((lang) => (
              <Button
                key={lang}
                type="button"
                variant={language === lang ? "default" : "outline"}
                size="sm"
                onClick={() => update({ profile: { ...profile, language: lang } })}
              >
                {lang === "en" ? "English" : "हिन्दी"}
              </Button>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center">
          <button
            type="button"
            onClick={start}
            disabled={state === "listening"}
            aria-label={state === "listening" ? "Listening" : "Start speaking"}
            className={cn(
              "relative grid size-32 place-items-center rounded-full border-2 transition-all",
              state === "listening"
                ? "border-olive bg-olive text-olive-foreground"
                : "border-foreground bg-foreground text-background hover:scale-[1.03]",
            )}
          >
            {state === "listening" && (
              <>
                <span className="absolute inset-0 animate-ping rounded-full bg-olive/30" />
                <span className="absolute -inset-4 animate-pulse rounded-full border border-olive/40" />
              </>
            )}
            {state === "listening" ? <Square className="size-9" /> : <Mic className="size-10" />}
          </button>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            {state === "idle" && "Tap to start. Speak for about thirty seconds."}
            {state === "listening" && (
              <span className="inline-flex items-center gap-2">
                Listening
                <span className="flex gap-1">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <span
                      key={i}
                      className="w-1 animate-pulse rounded-full bg-olive"
                      style={{ height: 8 + ((i * 7) % 18), animationDelay: `${i * 120}ms` }}
                    />
                  ))}
                </span>
              </span>
            )}
            {state === "done" && "Transcript captured. Check what we understood below."}
          </p>

          {state === "idle" && (
            <Button
              variant="ghost"
              size="sm"
              className="mt-4"
              onClick={() => {
                loadSample();
                start();
              }}
            >
              Load Sample Beneficiary
            </Button>
          )}
        </div>
      </div>

      {result && (
        <>
          <div className="surface p-6">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-sm font-semibold tracking-widest text-muted-foreground uppercase">
                Transcript
              </h2>
              <DemoBadge label="Simulated" />
            </div>
            <p className="mt-3 text-base leading-relaxed">{result.transcript}</p>
          </div>

          <div className="surface p-6">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-lg font-semibold">What we understood</h2>
              <Button variant="outline" size="sm" onClick={() => setEditing((v) => !v)}>
                <Pencil className="mr-1 size-3.5" />
                {editing ? "Done editing" : "Edit"}
              </Button>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Correct anything that is wrong. Nothing moves forward until you confirm.
            </p>

            <dl className="mt-6 space-y-4">
              {(
                [
                  ["Name", "name", "text"],
                  ["Location", "location", "text"],
                  ["Business or activity", "business", "text"],
                  ["Loan requirement", "loanRequirement", "number"],
                  ["Approximate annual income", "annualIncome", "number"],
                ] as const
              ).map(([label, key, type]) => (
                <div key={key} className="grid gap-1.5">
                  <dt className="text-xs tracking-wide text-muted-foreground uppercase">{label}</dt>
                  <dd>
                    {editing ? (
                      <Input
                        className="h-11"
                        type={type}
                        value={draft[key]}
                        onChange={(e) =>
                          setDraft((d) => ({
                            ...d,
                            [key]: type === "number" ? Number(e.target.value) : e.target.value,
                          }))
                        }
                      />
                    ) : (
                      <span className="text-base font-medium">
                        {type === "number"
                          ? formatINR(Number(draft[key]))
                          : String(draft[key] || "—")}
                      </span>
                    )}
                  </dd>
                </div>
              ))}
            </dl>

            <Button size="lg" className="mt-8 h-12 w-full text-base" onClick={confirm}>
              <Check className="mr-1 size-4" /> Confirm and continue
            </Button>
          </div>
        </>
      )}
    </ApplyShell>
  );
}
