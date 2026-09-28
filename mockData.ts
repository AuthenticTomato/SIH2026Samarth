/**
 * Samarth — SIH 2026 prototype.
 * ALL data in this file is fictional demo data created for a hackathon
 * demonstration. It is not sourced from, endorsed by, or affiliated with any
 * government body or lending institution.
 */

export type SchemeId = "dccs" | "micro-enterprise" | "livelihood-plus" | "women-dairy";

export interface Scheme {
  id: SchemeId;
  name: string;
  tagline: string;
  description: string;
  minLoan: number;
  maxLoan: number;
  interestRate: string;
  moratorium: string;
  tenure: string;
  eligibility: string[];
  focus: string;
  source: string;
}

export const SOURCE_LABEL =
  "Demo data — based on general scheme structure, not an official listing";

export const schemes: Scheme[] = [
  {
    id: "dccs",
    name: "Demo Concessional Credit Scheme",
    tagline: "Concessional term credit for existing micro-enterprises",
    description:
      "A demonstration scheme structure offering concessional term credit to SC entrepreneurs running or expanding a small production or service enterprise. Includes a moratorium on principal repayment during the ramp-up period.",
    minLoan: 50000,
    maxLoan: 500000,
    interestRate: "6% – 8% p.a. (concessional)",
    moratorium: "6 months on principal",
    tenure: "Up to 60 months",
    eligibility: [
      "Applicant belongs to Scheduled Caste category",
      "Annual household income within the notified ceiling",
      "Existing or proposed micro-enterprise activity",
      "Loan requirement between ₹50,000 and ₹5,00,000",
      "Resident of the applying district",
    ],
    focus: "Micro-enterprise expansion",
    source: SOURCE_LABEL,
  },
  {
    id: "micro-enterprise",
    name: "Demo Micro-Enterprise Term Loan",
    tagline: "First-time entrepreneur working-capital support",
    description:
      "A demonstration structure for first-time entrepreneurs needing smaller ticket credit for equipment, raw material, or working capital, with lighter documentation expectations.",
    minLoan: 25000,
    maxLoan: 200000,
    interestRate: "8% – 10% p.a.",
    moratorium: "3 months on principal",
    tenure: "Up to 36 months",
    eligibility: [
      "Applicant belongs to a notified reserved category",
      "New or under-1-year-old enterprise",
      "Loan requirement up to ₹2,00,000",
      "Basic identity and income documentation",
    ],
    focus: "New enterprise formation",
    source: SOURCE_LABEL,
  },
  {
    id: "livelihood-plus",
    name: "Demo Livelihood Plus Credit Line",
    tagline: "Flexible seasonal credit for allied activities",
    description:
      "A demonstration revolving credit structure for allied livelihood activities such as dairy, poultry, and horticulture, where income arrives seasonally rather than monthly.",
    minLoan: 40000,
    maxLoan: 300000,
    interestRate: "7% – 9% p.a.",
    moratorium: "9 months on principal",
    tenure: "Up to 48 months",
    eligibility: [
      "Allied agriculture or livestock livelihood activity",
      "Annual household income within the notified ceiling",
      "Demonstrable existing activity for at least 6 months",
    ],
    focus: "Allied livelihood activity",
    source: SOURCE_LABEL,
  },
  {
    id: "women-dairy",
    name: "Demo Women Dairy Enterprise Support",
    tagline: "Herd expansion and cold-chain support for women-led dairy units",
    description:
      "A demonstration scheme structure for women-led dairy enterprises covering herd expansion, chilling equipment, and transport, with a longer moratorium reflecting the lactation cycle.",
    minLoan: 60000,
    maxLoan: 400000,
    interestRate: "6.5% – 8.5% p.a. (concessional)",
    moratorium: "12 months on principal",
    tenure: "Up to 60 months",
    eligibility: [
      "Women-led dairy or milk-processing enterprise",
      "Applicant belongs to a notified reserved category",
      "Existing herd or committed procurement arrangement",
    ],
    focus: "Women-led dairy",
    source: SOURCE_LABEL,
  },
];

export type PartnerType = "PSB" | "RRB" | "NBFC-MFI";

export interface LendingPartner {
  id: string;
  name: string;
  type: PartnerType;
  branch: string;
  distanceKm: number;
  fundingAvailability: "Active funding" | "Limited funding" | "Paused";
  npaBand: "Low" | "Moderate";
  avgTurnaround: string;
  schemesSupported: SchemeId[];
}

export const lendingPartners: LendingPartner[] = [
  {
    id: "lp-01",
    name: "Demo Public Sector Bank",
    type: "PSB",
    branch: "Lanka Branch, Varanasi",
    distanceKm: 2.4,
    fundingAvailability: "Active funding",
    npaBand: "Low",
    avgTurnaround: "12 working days",
    schemesSupported: ["dccs", "micro-enterprise", "women-dairy"],
  },
  {
    id: "lp-02",
    name: "Demo Gramin Bank",
    type: "RRB",
    branch: "Ramnagar Branch, Varanasi",
    distanceKm: 5.1,
    fundingAvailability: "Active funding",
    npaBand: "Moderate",
    avgTurnaround: "9 working days",
    schemesSupported: ["dccs", "livelihood-plus", "women-dairy"],
  },
  {
    id: "lp-03",
    name: "Demo Micro Finance Institution",
    type: "NBFC-MFI",
    branch: "Sigra Service Point, Varanasi",
    distanceKm: 3.8,
    fundingAvailability: "Limited funding",
    npaBand: "Low",
    avgTurnaround: "6 working days",
    schemesSupported: ["micro-enterprise", "livelihood-plus"],
  },
  {
    id: "lp-04",
    name: "Demo District Cooperative Bank",
    type: "PSB",
    branch: "Chandauli Road Branch",
    distanceKm: 11.6,
    fundingAvailability: "Active funding",
    npaBand: "Moderate",
    avgTurnaround: "15 working days",
    schemesSupported: ["dccs", "livelihood-plus"],
  },
  {
    id: "lp-05",
    name: "Demo Regional Rural Bank — North",
    type: "RRB",
    branch: "Sarnath Branch, Varanasi",
    distanceKm: 8.2,
    fundingAvailability: "Paused",
    npaBand: "Low",
    avgTurnaround: "—",
    schemesSupported: ["dccs"],
  },
];

/** Default demo beneficiary used by "Load Sample Beneficiary". */
export const sampleBeneficiary = {
  name: "Meera Devi",
  location: "Varanasi, Uttar Pradesh",
  district: "Varanasi",
  state: "Uttar Pradesh",
  business: "Dairy enterprise (existing, small scale)",
  businessStage: "Existing — small scale",
  loanRequirement: 250000,
  annualIncome: 280000,
  category: "Scheduled Caste",
  recommendedSchemeId: "dccs" as SchemeId,
  matchScore: 94,
};

export const sampleTranscript = {
  en: "My name is Meera Devi. I live in Varanasi, Uttar Pradesh. I keep four buffaloes and sell milk in my village. I want two lakh fifty thousand rupees to buy two more animals and a milk chilling can. My family earns about two lakh eighty thousand rupees in a year.",
  hi: "मेरा नाम मीरा देवी है। मैं वाराणसी, उत्तर प्रदेश में रहती हूँ। मेरे पास चार भैंसें हैं और मैं गाँव में दूध बेचती हूँ। मुझे दो और पशु और एक दूध ठंडा करने का कैन खरीदने के लिए दो लाख पचास हज़ार रुपये चाहिए। मेरे परिवार की साल की आमदनी लगभग दो लाख अस्सी हज़ार रुपये है।",
};

export interface BankApplication {
  id: string;
  applicant: string;
  location: string;
  schemeId: SchemeId;
  amount: number;
  submittedOn: string;
  status: "New" | "Under Review" | "Clarification Required" | "Approved" | "Rejected";
  slaDaysLeft: number;
  activity: string;
  income: number;
  partnerId: string;
}

export const bankApplications: BankApplication[] = [
  {
    id: "SMR-2026-000481",
    applicant: "Meera Devi",
    location: "Varanasi, UP",
    schemeId: "dccs",
    amount: 250000,
    submittedOn: "2026-09-08",
    status: "Under Review",
    slaDaysLeft: 4,
    activity: "Dairy enterprise",
    income: 280000,
    partnerId: "lp-01",
  },
  {
    id: "SMR-2026-000478",
    applicant: "Ramesh Paswan",
    location: "Chandauli, UP",
    schemeId: "micro-enterprise",
    amount: 120000,
    submittedOn: "2026-09-07",
    status: "New",
    slaDaysLeft: 9,
    activity: "Cycle repair workshop",
    income: 190000,
    partnerId: "lp-02",
  },
  {
    id: "SMR-2026-000472",
    applicant: "Sunita Kumari",
    location: "Jaunpur, UP",
    schemeId: "livelihood-plus",
    amount: 180000,
    submittedOn: "2026-09-03",
    status: "Clarification Required",
    slaDaysLeft: 1,
    activity: "Poultry unit",
    income: 220000,
    partnerId: "lp-03",
  },
  {
    id: "SMR-2026-000465",
    applicant: "Anil Gautam",
    location: "Varanasi, UP",
    schemeId: "dccs",
    amount: 300000,
    submittedOn: "2026-08-29",
    status: "Approved",
    slaDaysLeft: 0,
    activity: "Leather goods unit",
    income: 340000,
    partnerId: "lp-01",
  },
  {
    id: "SMR-2026-000459",
    applicant: "Kavita Ram",
    location: "Ghazipur, UP",
    schemeId: "women-dairy",
    amount: 210000,
    submittedOn: "2026-08-26",
    status: "Under Review",
    slaDaysLeft: -2,
    activity: "Dairy and milk transport",
    income: 260000,
    partnerId: "lp-04",
  },
  {
    id: "SMR-2026-000451",
    applicant: "Dinesh Bharti",
    location: "Mirzapur, UP",
    schemeId: "micro-enterprise",
    amount: 90000,
    submittedOn: "2026-08-21",
    status: "Rejected",
    slaDaysLeft: 0,
    activity: "Tailoring unit",
    income: 150000,
    partnerId: "lp-03",
  },
];

export const districtDistribution = [
  { district: "Varanasi", applications: 412, approved: 268 },
  { district: "Chandauli", applications: 236, approved: 141 },
  { district: "Jaunpur", applications: 198, approved: 122 },
  { district: "Ghazipur", applications: 164, approved: 96 },
  { district: "Mirzapur", applications: 121, approved: 70 },
];

export const schemeDistribution = [
  { name: "Concessional Credit", value: 468 },
  { name: "Micro-Enterprise", value: 291 },
  { name: "Livelihood Plus", value: 214 },
  { name: "Women Dairy", value: 158 },
];

export const monthlyThroughput = [
  { month: "Apr", received: 142, processed: 118 },
  { month: "May", received: 168, processed: 139 },
  { month: "Jun", received: 191, processed: 166 },
  { month: "Jul", received: 208, processed: 181 },
  { month: "Aug", received: 234, processed: 205 },
  { month: "Sep", received: 188, processed: 149 },
];

export const impactMetrics = [
  { label: "Demo applications simulated", value: "1,131" },
  { label: "Average journey time in demo", value: "14 min" },
  { label: "Schemes modelled", value: "4" },
  { label: "Lending partners modelled", value: "5" },
];

export const faqs = [
  {
    q: "Is Samarth an official government portal?",
    a: "No. Samarth is a student-built prototype created for Smart India Hackathon 2026. It is not an official government portal and carries no government endorsement. Every number, verification and status shown here is simulated demo data.",
  },
  {
    q: "Does an eligibility result here mean my loan is approved?",
    a: "No. Eligibility screens and AI match scores are prototype estimates. Only a lending institution can verify eligibility and sanction credit.",
  },
  {
    q: "Do I need to type a lot to use it?",
    a: "The journey is designed voice-first with minimal typing. In this prototype the voice recognition is simulated, so a sample transcript is played back for you.",
  },
  {
    q: "What happens to documents I upload?",
    a: "Nothing leaves your browser. This prototype has no backend and no storage — uploads are read only to display a simulated verification result.",
  },
  {
    q: "Which languages are supported?",
    a: "The prototype demonstrates English and Hindi. A production build would extend to additional regional languages.",
  },
  {
    q: "Can a bank actually receive my application?",
    a: "Not in this prototype. The QR dossier and WhatsApp share are simulated integration points that show where real connections would be made.",
  },
];

export const AI_DISCLAIMER =
  "AI-generated recommendations and document insights are provided to assist users. They are not a substitute for official eligibility verification, professional financial advice, or a lending institution's final decision.";

export const formatINR = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Math.round(value));

export const getScheme = (id: SchemeId): Scheme => schemes.find((s) => s.id === id) ?? (schemes[0] as Scheme);
