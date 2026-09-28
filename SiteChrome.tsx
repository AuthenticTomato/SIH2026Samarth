import { Link } from "@tanstack/react-router";
import { Menu, ShieldAlert } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AI_DISCLAIMER } from "@/data/mockData";

const NAV = [
  { to: "/how-it-works", label: "How it works" },
  { to: "/schemes", label: "Schemes" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function PrototypeBanner() {
  return (
    <div className="bg-foreground px-4 py-2 text-center text-[13px] leading-snug text-background">
      <span className="inline-flex items-center gap-2">
        <ShieldAlert className="size-3.5 shrink-0" aria-hidden />
        Prototype for Smart India Hackathon 2026. Not an official government portal. All data
        shown is simulated.
      </span>
    </div>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="grid size-9 place-items-center rounded-lg bg-foreground text-background">
            <span className="font-display text-lg leading-none">S</span>
          </span>
          <span className="flex flex-col leading-none">
            <span className="text-base font-semibold tracking-tight">Samarth</span>
            <span className="text-[11px] text-muted-foreground">Credit access prototype</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              activeProps={{ className: "text-foreground bg-muted" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
            <Link to="/dashboard">Track</Link>
          </Button>
          <Button asChild size="sm">
            <Link to="/apply/voice">Start</Link>
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="md:hidden"
            aria-label="Open menu"
            onClick={() => setOpen((v) => !v)}
          >
            <Menu className="size-4" />
          </Button>
        </div>
      </div>
      {open && (
        <nav className="border-t border-border bg-background px-4 py-2 md:hidden">
          {[...NAV, { to: "/dashboard", label: "Track application" } as const].map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className="block rounded-md px-3 py-3 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}

const FOOTER_GROUPS: { title: string; links: { label: string; to?: string; external?: boolean }[] }[] = [
  {
    title: "Platform",
    links: [
      { label: "How it works", to: "/how-it-works" },
      { label: "Schemes", to: "/schemes" },
      { label: "About", to: "/about" },
      { label: "Contact", to: "/contact" },
    ],
  },
  {
    title: "Beneficiaries",
    links: [
      { label: "Start an application", to: "/apply/voice" },
      { label: "Track application", to: "/dashboard" },
      { label: "Loan calculator", to: "/apply/loan" },
      { label: "Accessibility", to: "/accessibility" },
    ],
  },
  {
    title: "Partners",
    links: [
      { label: "View as Bank Officer", to: "/bank" },
      { label: "View as Admin (District)", to: "/admin" },
      { label: "Lending partner routing", to: "/apply/lending-partner" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", to: "/privacy" },
      { label: "Terms", to: "/terms" },
      { label: "AI disclaimer", to: "/disclaimer" },
      { label: "Consent", to: "/consent" },
    ],
  },
  {
    title: "Official resources",
    links: [
      { label: "National scheme directory [external resource]", external: true },
      { label: "State welfare department [external resource]", external: true },
      { label: "Banking ombudsman [external resource]", external: true },
      { label: "District grievance cell [external resource]", external: true },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[1.3fr_repeat(3,1fr)] lg:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="grid size-9 place-items-center rounded-lg bg-foreground text-background">
                <span className="font-display text-lg leading-none">S</span>
              </span>
              <span className="text-base font-semibold">Samarth</span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              A student-built prototype exploring how voice, document AI and scheme matching
              could make concessional credit reachable. Built for Smart India Hackathon 2026.
            </p>
          </div>
          {FOOTER_GROUPS.map((group) => (
            <div key={group.title}>
              <h3 className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
                {group.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.label}>
                    {link.external ? (
                      <span
                        title="Placeholder link — this prototype does not link to real institutional sites."
                        className="cursor-default text-sm text-muted-foreground"
                      >
                        {link.label}
                      </span>
                    ) : (
                      <Link
                        to={link.to!}
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-border pt-6">
          <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
            <span className="font-medium text-foreground">AI disclaimer: </span>
            {AI_DISCLAIMER}
          </p>
          <p className="mt-4 text-xs text-muted-foreground">
            © 2026 [placeholder legal entity name]. Samarth is a hackathon prototype. It is not an
            official government portal, is not endorsed by any government body or lending
            institution, and every figure, verification and status displayed is simulated demo
            data.
          </p>
        </div>
      </div>
    </footer>
  );
}

export function SitePage({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <PrototypeBanner />
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}

export function LegalPage({
  title,
  intro,
  children,
}: {
  title: string;
  intro: string;
  children: React.ReactNode;
}) {
  return (
    <SitePage>
      <article className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
        <h1 className="font-display text-4xl sm:text-5xl">{title}</h1>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">{intro}</p>
        <div className="mt-10 space-y-8 text-sm leading-relaxed text-foreground [&_h2]:text-lg [&_h2]:font-semibold [&_li]:text-muted-foreground [&_p]:text-muted-foreground [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5">
          {children}
        </div>
        <p className="mt-12 text-xs text-muted-foreground">
          Last reviewed: [placeholder date]. Questions: [placeholder contact email].
        </p>
      </article>
    </SitePage>
  );
}
