import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Loader2, Pencil, Printer, RefreshCw, Send } from "lucide-react";
import { ApplyShell } from "@/components/samarth/ApplyShell";
import { DemoBadge, PrototypeNote } from "@/components/samarth/DemoBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useApplication } from "@/context/ApplicationContext";
import { DPR_QUESTIONS, dprService, type DprAnswers, type DprSection } from "@/services";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/apply/dpr")({
  head: () => ({
    meta: [
      { title: "Project report builder — Samarth" },
      {
        name: "description",
        content:
          "Answer five questions in a chat and get a structured detailed project report: summary, market, cost, funding, revenue and repayment. AI-generated draft.",
      },
      { property: "og:title", content: "Project report builder — Samarth" },
      { property: "og:description", content: "Five questions become a structured project report." },
    ],
  }),
  component: DprStep,
});

function DprStep() {
  const { profile, dpr, dprAnswers, loan, update } = useApplication();
  const navigate = useNavigate();
  const [index, setIndex] = useState(Object.keys(dprAnswers).length);
  const [input, setInput] = useState("");
  const [generating, setGenerating] = useState(false);
  const [editing, setEditing] = useState(false);

  const answers = dprAnswers as Partial<DprAnswers>;
  const question = DPR_QUESTIONS[index];

  const generate = async (final: Partial<DprAnswers>) => {
    setGenerating(true);
    const sections = await dprService.generate(final as DprAnswers, {
      name: profile.name || "Meera Devi",
      location: profile.location || "Varanasi, Uttar Pradesh",
      amount: loan.amount || 250000,
    });
    update({ dpr: sections });
    setGenerating(false);
  };

  const send = async () => {
    if (!question) return;
    const value = input.trim() || question.placeholder;
    const next = { ...answers, [question.key]: value };
    update({ dprAnswers: next });
    setInput("");
    if (index + 1 >= DPR_QUESTIONS.length) {
      setIndex(index + 1);
      await generate(next);
    } else {
      setIndex(index + 1);
    }
  };

  const updateSection = (i: number, body: string) => {
    if (!dpr) return;
    const copy = [...dpr];
    const sec = copy[i];
    if (!sec) return;
    copy[i] = { ...sec, body } as DprSection;
    update({ dpr: copy });
  };

  return (
    <ApplyShell
      title="Let's write your project report."
      subtitle="Five questions, answered however you like. We turn them into the structured report a lender expects to see."
    >
      {!dpr && (
        <div className="surface flex flex-col p-5">
          <div className="space-y-4">
            {DPR_QUESTIONS.slice(0, index + 1).map((q, i) => {
              const answer = answers[q.key];
              return (
                <div key={q.key} className="space-y-3">
                  <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-muted px-4 py-3 text-sm leading-relaxed">
                    {q.prompt}
                  </div>
                  {answer && (
                    <div className="ml-auto max-w-[85%] rounded-2xl rounded-tr-sm bg-foreground px-4 py-3 text-sm leading-relaxed text-background">
                      {answer}
                    </div>
                  )}
                </div>
              );
            })}
            {generating && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="size-4 animate-spin text-olive" />
                Drafting your project report…
              </div>
            )}
          </div>

          {question && !generating && (
            <div className="mt-6 flex flex-col gap-2 border-t border-border pt-4 sm:flex-row">
              <Input
                className="h-12"
                placeholder={question.placeholder}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") void send();
                }}
              />
              <Button className="h-12" onClick={() => void send()}>
                <Send className="mr-1 size-4" /> Send
              </Button>
            </div>
          )}
          <p className="mt-3 text-xs text-muted-foreground">
            Leave the box empty and press Send to use the demo answer shown as a hint.
          </p>
        </div>
      )}

      {dpr && (
        <>
          <div className="no-print flex flex-wrap gap-2">
            <Button variant="outline" size="sm" onClick={() => setEditing((v) => !v)}>
              <Pencil className="mr-1 size-3.5" /> {editing ? "Done" : "Edit"}
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={generating}
              onClick={() => void generate(answers)}
            >
              <RefreshCw className={cn("mr-1 size-3.5", generating && "animate-spin")} /> Regenerate
            </Button>
            <Button variant="outline" size="sm" onClick={() => window.print()}>
              <Printer className="mr-1 size-3.5" /> Generate PDF
            </Button>
          </div>

          <article className="surface p-6 sm:p-8">
            <header className="border-b border-border pb-5">
              <p className="text-xs tracking-widest text-muted-foreground uppercase">
                Detailed Project Report — Prototype draft
              </p>
              <h2 className="mt-2 font-display text-3xl">{profile.name || "Meera Devi"}</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {profile.business || "Dairy enterprise"} · {profile.location || "Varanasi, Uttar Pradesh"}
              </p>
              <DemoBadge label="AI-generated draft" className="mt-4" />
            </header>

            <div className="mt-6 space-y-7">
              {dpr.map((section, i) => (
                <section key={section.title}>
                  <h3 className="text-base font-semibold">{section.title}</h3>
                  {editing ? (
                    <Textarea
                      className="mt-2"
                      rows={5}
                      value={section.body}
                      onChange={(e) => updateSection(i, e.target.value)}
                    />
                  ) : (
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {section.body}
                    </p>
                  )}
                </section>
              ))}
            </div>

            <footer className="mt-8 border-t border-border pt-5 text-xs text-muted-foreground">
              Prototype simulation. This report is an AI-assisted draft generated for demonstration
              and has not been appraised, verified or endorsed by any institution.
            </footer>
          </article>

          <PrototypeNote>
            AI-generated draft — review every figure before it is shown to a lender. Projections
            here are illustrative, not audited.
          </PrototypeNote>

          <Button
            size="lg"
            className="no-print h-12 w-full text-base"
            onClick={() => navigate({ to: "/apply/loan" })}
          >
            Plan the loan <ArrowRight className="ml-1 size-4" />
          </Button>
        </>
      )}
    </ApplyShell>
  );
}
