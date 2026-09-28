import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { SitePage } from "@/components/samarth/SiteChrome";
import { DemoBadge, PrototypeNote } from "@/components/samarth/DemoBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact and grievances — Samarth prototype" },
      {
        name: "description",
        content:
          "Raise a support question, technical issue, accessibility barrier, data concern or grievance about the Samarth hackathon prototype.",
      },
      { property: "og:title", content: "Contact and grievances — Samarth prototype" },
      {
        property: "og:description",
        content: "Support, accessibility, data and grievance channels for the Samarth prototype.",
      },
    ],
  }),
  component: Contact,
});

const CATEGORIES = [
  { value: "general", label: "General support" },
  { value: "technical", label: "Technical issue" },
  { value: "accessibility", label: "Accessibility barrier" },
  { value: "privacy", label: "Data or privacy concern" },
  { value: "grievance", label: "Grievance" },
];

function Contact() {
  const [category, setCategory] = useState("general");

  return (
    <SitePage>
      <section className="border-b border-border">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
          <DemoBadge label="Simulated form" />
          <h1 className="mt-5 font-display text-5xl sm:text-6xl">Contact</h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
            Tell us what went wrong, what was unclear, or what blocked you. In this prototype the
            form does not send anything — it demonstrates where a grievance channel would sit.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-4xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_1fr]">
        <form
          className="surface space-y-5 p-6"
          onSubmit={(e) => {
            e.preventDefault();
            toast.success("Simulated — no message was sent", {
              description: "A production build would route this to the grievance queue.",
            });
          }}
        >
          <div className="grid gap-2">
            <Label htmlFor="name">Your name</Label>
            <Input id="name" placeholder="Meera Devi" className="h-11" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email or phone</Label>
            <Input id="email" placeholder="you@example.com" className="h-11" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="category">Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger id="category" className="h-11">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((c) => (
                  <SelectItem key={c.value} value={c.value}>
                    {c.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="message">Message</Label>
            <Textarea id="message" rows={6} placeholder="Describe what happened." />
          </div>
          <Button type="submit" size="lg" className="h-12 w-full text-base">
            Send message
          </Button>
          <PrototypeNote>
            Simulated — this prototype has no backend, so nothing is transmitted or stored.
          </PrototypeNote>
        </form>

        <aside className="space-y-6 text-sm text-muted-foreground">
          <div>
            <h2 className="text-base font-semibold text-foreground">Response commitment</h2>
            <p className="mt-2">
              A production deployment would acknowledge every grievance within [placeholder
              response time] and close it within [placeholder resolution time].
            </p>
          </div>
          <div>
            <h2 className="text-base font-semibold text-foreground">Grievance officer</h2>
            <p className="mt-2">
              [placeholder grievance officer name]
              <br />
              [placeholder office address]
              <br />
              [placeholder contact email]
            </p>
          </div>
          <div>
            <h2 className="text-base font-semibold text-foreground">Escalation</h2>
            <p className="mt-2">
              Unresolved concerns about a real lending decision belong with the lending institution
              and, beyond that, the relevant banking ombudsman [external resource].
            </p>
          </div>
        </aside>
      </section>
    </SitePage>
  );
}
