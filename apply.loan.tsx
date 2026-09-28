import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ApplyShell } from "@/components/samarth/ApplyShell";
import { DemoBadge, PrototypeNote } from "@/components/samarth/DemoBadge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useApplication } from "@/context/ApplicationContext";
import { financeService } from "@/services";
import { formatINR } from "@/data/mockData";

export const Route = createFileRoute("/apply/loan")({
  head: () => ({
    meta: [
      { title: "Loan and moratorium calculator — Samarth" },
      {
        name: "description",
        content:
          "Adjust loan amount, interest rate, tenure and moratorium to see indicative instalments, total interest and a repayment timeline. Estimate only.",
      },
      { property: "og:title", content: "Loan and moratorium calculator — Samarth" },
      { property: "og:description", content: "Indicative instalments, interest and repayment timeline." },
    ],
  }),
  component: LoanStep,
});

function LoanStep() {
  const { loan, update } = useApplication();
  const navigate = useNavigate();
  const result = financeService.calculate(loan);

  const set = (patch: Partial<typeof loan>) => update({ loan: { ...loan, ...patch } });

  const controls = [
    {
      label: "Loan amount",
      value: formatINR(loan.amount),
      slider: { min: 25000, max: 500000, step: 5000, val: loan.amount },
      onChange: (v: number) => set({ amount: v }),
    },
    {
      label: "Interest rate",
      value: `${loan.rate.toFixed(1)}% p.a.`,
      slider: { min: 4, max: 16, step: 0.5, val: loan.rate },
      onChange: (v: number) => set({ rate: v }),
    },
    {
      label: "Tenure",
      value: `${loan.tenureMonths} months`,
      slider: { min: 12, max: 84, step: 6, val: loan.tenureMonths },
      onChange: (v: number) => set({ tenureMonths: v }),
    },
    {
      label: "Moratorium",
      value: `${loan.moratoriumMonths} months`,
      slider: { min: 0, max: 18, step: 1, val: loan.moratoriumMonths },
      onChange: (v: number) => set({ moratoriumMonths: v }),
    },
  ];

  return (
    <ApplyShell
      title="What repayment would look like."
      subtitle="Move the sliders to see how the instalment changes. A moratorium delays principal repayment while interest accrues."
    >
      <div className="surface space-y-7 p-6">
        {controls.map((c) => (
          <div key={c.label}>
            <div className="flex items-baseline justify-between gap-3">
              <Label className="text-sm">{c.label}</Label>
              <span className="text-base font-semibold">{c.value}</span>
            </div>
            <Slider
              className="mt-4"
              min={c.slider.min}
              max={c.slider.max}
              step={c.slider.step}
              value={[c.slider.val]}
              onValueChange={([v]) => c.onChange(v ?? c.slider.min)}
            />
          </div>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { l: "Monthly instalment", v: formatINR(result.emi), s: `after ${loan.moratoriumMonths} months` },
          { l: "Total interest", v: formatINR(result.totalInterest), s: "over full tenure" },
          { l: "Total repayment", v: formatINR(result.totalRepayment), s: "principal + interest" },
        ].map((k) => (
          <div key={k.l} className="surface p-5">
            <p className="text-xs tracking-wide text-muted-foreground uppercase">{k.l}</p>
            <p className="mt-2 font-display text-3xl">{k.v}</p>
            <p className="mt-1 text-xs text-muted-foreground">{k.s}</p>
          </div>
        ))}
      </div>

      <div className="surface p-6">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-base font-semibold">Repayment timeline</h2>
          <DemoBadge label="Estimate" />
        </div>
        <div className="mt-5 h-56 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={result.schedule} margin={{ left: -18, right: 8, top: 8 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                className="text-xs"
                tick={{ fontSize: 11 }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 11 }}
                tickFormatter={(v: number) => `${Math.round(v / 1000)}k`}
              />
              <Tooltip
                formatter={(v: number) => formatINR(v)}
                labelFormatter={(l) => `Month ${l}`}
                contentStyle={{ borderRadius: 12, fontSize: 12 }}
              />
              <Area
                type="monotone"
                dataKey="balance"
                name="Outstanding"
                stroke="var(--color-olive)"
                fill="var(--color-olive)"
                fillOpacity={0.15}
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="paid"
                name="Repaid"
                stroke="var(--color-foreground)"
                fill="var(--color-foreground)"
                fillOpacity={0.06}
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <p className="mt-4 text-sm text-muted-foreground">
          During the moratorium no instalment is paid, but {formatINR(result.moratoriumInterest)} of
          interest accrues and is added to the balance, making{" "}
          {formatINR(result.principalAtRepaymentStart)} the amount repaid over the remaining months.
        </p>
      </div>

      <PrototypeNote>
        Estimate only — not a bank sanction or quotation. Actual instalments depend on the lender's
        rate, fees, insurance and repayment method.
      </PrototypeNote>

      <Button
        size="lg"
        className="h-12 w-full text-base"
        onClick={() => navigate({ to: "/apply/lending-partner" })}
      >
        Choose a lending partner <ArrowRight className="ml-1 size-4" />
      </Button>
    </ApplyShell>
  );
}
