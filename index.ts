/**
 * Mock service layer.
 *
 * Every function here returns simulated demo data after a fake delay. The UI
 * only ever talks to these functions, so a later build can swap each one for a
 * real integration (speech-to-text, OCR/KYC, scheme registry, LLM DPR
 * generation, branch routing API, WhatsApp Cloud API) without touching pages.
 */
import {
  formatINR,
  getScheme,
  lendingPartners,
  sampleBeneficiary,
  sampleTranscript,
  schemes,
  type LendingPartner,
  type Scheme,
  type SchemeId,
} from "@/data/mockData";

const delay = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

/* ------------------------------------------------------------------ voice */

export interface VoiceResult {
  transcript: string;
  extracted: {
    name: string;
    location: string;
    business: string;
    loanRequirement: number;
    annualIncome: number;
  };
}

export const voiceService = {
  /** Simulated STT + entity extraction. Replace with a real STT provider. */
  async listen(language: "en" | "hi"): Promise<VoiceResult> {
    await delay(2600);
    return {
      transcript: sampleTranscript[language],
      extracted: {
        name: sampleBeneficiary.name,
        location: sampleBeneficiary.location,
        business: sampleBeneficiary.business,
        loanRequirement: sampleBeneficiary.loanRequirement,
        annualIncome: sampleBeneficiary.annualIncome,
      },
    };
  },
};

/* -------------------------------------------------------------- documents */

export type DocumentKind = "caste" | "income" | "id" | "business";

export interface DocumentResult {
  kind: DocumentKind;
  label: string;
  fileName: string;
  detectedType: string;
  extractedName: string;
  extractedValue: string;
  readability: "High" | "Medium";
  status: "Verified" | "Needs Review";
  note: string;
}

export const DOCUMENT_LABELS: Record<DocumentKind, string> = {
  caste: "Caste Certificate",
  income: "Income Certificate",
  id: "Identity Proof",
  business: "Business Document (optional)",
};

/** Partially masks a sensitive figure, e.g. 280000 -> "₹2,8*,***". */
export const maskAmount = (value: number) => {
  const formatted = formatINR(value).replace("₹", "");
  const keep = Math.ceil(formatted.length * 0.35);
  return (
    "₹" +
    formatted
      .split("")
      .map((ch, i) => (i < keep || ch === "," ? ch : "*"))
      .join("")
  );
};

export const documentService = {
  /** Simulated OCR + verification. Replace with a real document AI service. */
  async verify(kind: DocumentKind, fileName: string): Promise<DocumentResult> {
    await delay(1900);
    const base = {
      kind,
      label: DOCUMENT_LABELS[kind],
      fileName,
      extractedName: sampleBeneficiary.name,
      readability: "High" as const,
      note: "Simulated verification — demo mode",
    };
    switch (kind) {
      case "caste":
        return {
          ...base,
          detectedType: "Caste Certificate (state issued)",
          extractedValue: "Category: SC · Cert. no. UP****2196",
          status: "Verified",
        };
      case "income":
        return {
          ...base,
          detectedType: "Income Certificate",
          extractedValue: `Annual income: ${maskAmount(sampleBeneficiary.annualIncome)}`,
          status: "Verified",
        };
      case "id":
        return {
          ...base,
          detectedType: "Government photo ID",
          extractedValue: "ID no. XXXX XXXX 4417",
          status: "Verified",
        };
      default:
        return {
          ...base,
          detectedType: "Dairy procurement receipt",
          extractedValue: "Monthly milk sales: ₹1*,***",
          readability: "Medium",
          status: "Needs Review",
        };
    }
  },
};

/* ----------------------------------------------------------- eligibility */

export interface EligibilityCheck {
  label: string;
  passed: boolean;
  detail: string;
}

export interface EligibilityResult {
  verdict: "Eligible" | "Needs Clarification" | "Not Currently Eligible";
  checks: EligibilityCheck[];
}

export const eligibilityService = {
  async evaluate(input: {
    annualIncome: number;
    loanRequirement: number;
    business: string;
    location: string;
  }): Promise<EligibilityResult> {
    await delay(1200);
    const checks: EligibilityCheck[] = [
      {
        label: "Category",
        passed: true,
        detail: "Scheduled Caste category recognised from the submitted certificate.",
      },
      {
        label: "Income",
        passed: input.annualIncome <= 300000,
        detail: `Declared annual income ${formatINR(input.annualIncome)} sits within the modelled ceiling of ₹3,00,000.`,
      },
      {
        label: "Business compatibility",
        passed: Boolean(input.business),
        detail: `${input.business || "Your activity"} is an allied livelihood activity covered by the modelled schemes.`,
      },
      {
        label: "Loan amount compatibility",
        passed: input.loanRequirement >= 50000 && input.loanRequirement <= 500000,
        detail: `${formatINR(input.loanRequirement)} falls inside the ₹50,000 – ₹5,00,000 modelled range.`,
      },
      {
        label: "Location",
        passed: Boolean(input.location),
        detail: `${input.location || "Your district"} has active demo lending partners nearby.`,
      },
    ];
    const failures = checks.filter((c) => !c.passed).length;
    return {
      verdict:
        failures === 0 ? "Eligible" : failures === 1 ? "Needs Clarification" : "Not Currently Eligible",
      checks,
    };
  },
};

/* --------------------------------------------------------------- schemes */

export interface SchemeMatch {
  scheme: Scheme;
  score: number;
  reasons: string[];
  rationale: string;
}

export const schemeService = {
  list(): Scheme[] {
    return schemes;
  },
  async match(input: { annualIncome: number; loanRequirement: number }): Promise<{
    recommended: SchemeMatch;
    alternatives: SchemeMatch[];
  }> {
    await delay(1400);
    const reasonsFor = (id: SchemeId): string[] => {
      const s = getScheme(id);
      return [
        `Income of ${formatINR(input.annualIncome)} fits the modelled eligibility ceiling`,
        `Dairy activity matches the scheme focus: ${s.focus}`,
        `Requested ${formatINR(input.loanRequirement)} sits inside ${formatINR(s.minLoan)} – ${formatINR(s.maxLoan)}`,
        `Moratorium of ${s.moratorium} suits a slow-ramp livelihood`,
      ];
    };
    return {
      recommended: {
        scheme: getScheme("dccs"),
        score: 94,
        reasons: reasonsFor("dccs"),
        rationale:
          "The match score is a weighted prototype heuristic combining category fit (30%), income band (25%), activity alignment (25%), loan-size fit (15%) and district partner availability (5%). It is computed on demo data and is not an official eligibility determination.",
      },
      alternatives: [
        {
          scheme: getScheme("women-dairy"),
          score: 88,
          reasons: reasonsFor("women-dairy"),
          rationale: "Strong activity fit; longer moratorium but a lower ceiling.",
        },
        {
          scheme: getScheme("livelihood-plus"),
          score: 76,
          reasons: reasonsFor("livelihood-plus"),
          rationale: "Seasonal credit line; suits variable milk income but shorter tenure.",
        },
        {
          scheme: getScheme("micro-enterprise"),
          score: 61,
          reasons: reasonsFor("micro-enterprise"),
          rationale: "Designed for new enterprises; the requested amount exceeds its ceiling.",
        },
      ],
    };
  },
};

/* ------------------------------------------------------------------- DPR */

export interface DprAnswers {
  activity: string;
  purchase: string;
  customers: string;
  expectedIncome: string;
  funding: string;
}

export interface DprSection {
  title: string;
  body: string;
}

export const DPR_QUESTIONS: { key: keyof DprAnswers; prompt: string; placeholder: string }[] = [
  {
    key: "activity",
    prompt: "Tell me about your business or activity. What do you do today?",
    placeholder: "I run a small dairy with four buffaloes and sell milk in my village.",
  },
  {
    key: "purchase",
    prompt: "What will you buy or build with this loan?",
    placeholder: "Two more buffaloes, a milk chilling can and a shed extension.",
  },
  {
    key: "customers",
    prompt: "Who are your customers, and how do they buy from you?",
    placeholder: "Village households and a nearby milk collection centre.",
  },
  {
    key: "expectedIncome",
    prompt: "How much do you expect to earn each month after this investment?",
    placeholder: "About ₹34,000 a month.",
  },
  {
    key: "funding",
    prompt: "How much funding do you need in total?",
    placeholder: "₹2,50,000.",
  },
];

export const dprService = {
  /** Simulated LLM generation. Replace with a real model call. */
  async generate(answers: DprAnswers, ctx: { name: string; location: string; amount: number }) {
    await delay(2200);
    const monthly = answers.expectedIncome || "₹34,000";
    return [
      {
        title: "Executive Summary",
        body: `${ctx.name}, based in ${ctx.location}, operates an established small-scale dairy enterprise and seeks ${formatINR(ctx.amount)} in concessional term credit to expand herd capacity and add basic cold-chain equipment. The proposal builds on an existing customer base and a proven daily sales routine, targeting a step change in monthly revenue to approximately ${monthly} within two quarters of disbursement.`,
      },
      {
        title: "Business Description",
        body: `${answers.activity || "The applicant runs a small dairy enterprise with four buffaloes, selling fresh milk daily within the village."} Operations are family-run with no hired labour at present. Existing infrastructure includes a covered shed, fodder storage and manual milking, all of which the proposed investment will extend rather than replace.`,
      },
      {
        title: "Market Overview",
        body: `${answers.customers || "Customers are village households and a nearby milk collection centre."} Demand for fresh milk in the service area is steady year-round with a seasonal uplift during festival months. Local competition is fragmented and largely unorganised, and the nearby collection centre currently absorbs surplus volumes at a published procurement rate, limiting the risk of unsold stock.`,
      },
      {
        title: "Project Cost",
        body: `${answers.purchase || "Two additional milch animals, a milk chilling can and a shed extension."} Indicative allocation: livestock ${formatINR(ctx.amount * 0.6)}, equipment and cold storage ${formatINR(ctx.amount * 0.2)}, shed and civil work ${formatINR(ctx.amount * 0.12)}, working capital and insurance ${formatINR(ctx.amount * 0.08)}.`,
      },
      {
        title: "Funding Requirement",
        body: `Total project cost is estimated at ${formatINR(ctx.amount * 1.1)}. The applicant proposes a promoter contribution of ${formatINR(ctx.amount * 0.1)} (10%) from existing savings and seeks ${formatINR(ctx.amount)} as concessional term credit under the matched scheme.`,
      },
      {
        title: "Revenue Projection",
        body: `Post-investment monthly revenue is projected at ${monthly}, against operating costs of roughly 45% (fodder, veterinary care, transport). This gives an indicative monthly surplus sufficient to service the proposed instalment with headroom. Year 2 and Year 3 assume a conservative 8% annual growth with no additional capital outlay.`,
      },
      {
        title: "Repayment Plan",
        body: `A moratorium on principal during the initial ramp-up allows the herd to reach full lactation before instalments begin. Thereafter equal monthly instalments are proposed over the remaining tenure, funded entirely from enterprise surplus. Seasonal dips are absorbed by a retained buffer of one month's instalment.`,
      },
    ] satisfies DprSection[];
  },
};

/* --------------------------------------------------------------- finance */

export interface LoanInputs {
  amount: number;
  rate: number;
  tenureMonths: number;
  moratoriumMonths: number;
}

export interface LoanResult {
  emi: number;
  totalInterest: number;
  totalRepayment: number;
  moratoriumInterest: number;
  principalAtRepaymentStart: number;
  schedule: { month: number; balance: number; paid: number }[];
}

export const financeService = {
  /** Simple interest-accrual-during-moratorium EMI model. Estimate only. */
  calculate({ amount, rate, tenureMonths, moratoriumMonths }: LoanInputs): LoanResult {
    const r = rate / 12 / 100;
    const moratoriumInterest = amount * r * moratoriumMonths;
    const principal = amount + moratoriumInterest;
    const n = Math.max(1, tenureMonths - moratoriumMonths);
    const emi = r === 0 ? principal / n : (principal * r * (1 + r) ** n) / ((1 + r) ** n - 1);
    const totalRepayment = emi * n;
    const schedule: { month: number; balance: number; paid: number }[] = [];
    let balance = principal;
    let paid = 0;
    for (let m = 1; m <= tenureMonths; m++) {
      if (m > moratoriumMonths) {
        const interest = balance * r;
        balance = Math.max(0, balance - (emi - interest));
        paid += emi;
      }
      if (m % Math.max(1, Math.round(tenureMonths / 12)) === 0 || m === tenureMonths) {
        schedule.push({ month: m, balance: Math.round(balance), paid: Math.round(paid) });
      }
    }
    return {
      emi,
      totalInterest: totalRepayment - amount,
      totalRepayment,
      moratoriumInterest,
      principalAtRepaymentStart: principal,
      schedule,
    };
  },
};

/* --------------------------------------------------------------- routing */

export type PartnerFilter = "nearest" | "active" | "psb" | "rrb" | "lownpa";

export const routingService = {
  list(): LendingPartner[] {
    return lendingPartners;
  },
  filter(filter: PartnerFilter): LendingPartner[] {
    const all = [...lendingPartners];
    switch (filter) {
      case "nearest":
        return all.sort((a, b) => a.distanceKm - b.distanceKm);
      case "active":
        return all.filter((p) => p.fundingAvailability === "Active funding");
      case "psb":
        return all.filter((p) => p.type === "PSB");
      case "rrb":
        return all.filter((p) => p.type === "RRB");
      case "lownpa":
        return all.filter((p) => p.npaBand === "Low");
      default:
        return all;
    }
  },
};

/* --------------------------------------------------------------- dossier */

export const dossierService = {
  createReference(name: string) {
    const seed = Math.abs(
      [...`${name}${Date.now()}`].reduce((acc, ch) => (acc * 31 + ch.charCodeAt(0)) | 0, 7),
    );
    return `SMR-2026-${String(seed % 1000000).padStart(6, "0")}`;
  },
  payload(reference: string, name: string, amount: number) {
    // Fake reference payload — a real build would encode a signed short URL.
    return `SAMARTH-DEMO|ref=${reference}|name=${name}|amount=${amount}|note=prototype-simulation`;
  },
  async share(): Promise<string> {
    await delay(900);
    return "Simulated — WhatsApp Cloud API integration point";
  },
};
