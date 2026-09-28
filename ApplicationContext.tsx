import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { sampleBeneficiary, type SchemeId } from "@/data/mockData";
import type { DocumentResult, DprAnswers, DprSection, EligibilityResult, LoanInputs } from "@/services";

export interface Profile {
  name: string;
  location: string;
  business: string;
  loanRequirement: number;
  annualIncome: number;
  language: "en" | "hi";
}

const emptyProfile: Profile = {
  name: "",
  location: "",
  business: "",
  loanRequirement: 0,
  annualIncome: 0,
  language: "en",
};

export type StageKey =
  | "started"
  | "documents"
  | "scheme"
  | "dpr"
  | "submitted"
  | "review"
  | "decision"
  | "disbursement";

export interface ApplicationState {
  profile: Profile;
  transcript: string;
  documents: DocumentResult[];
  eligibility: EligibilityResult | null;
  selectedSchemeId: SchemeId | null;
  matchScore: number | null;
  dprAnswers: Partial<DprAnswers>;
  dpr: DprSection[] | null;
  loan: LoanInputs;
  partnerId: string | null;
  reference: string | null;
  submittedAt: string | null;
}

interface Ctx extends ApplicationState {
  update: (patch: Partial<ApplicationState>) => void;
  loadSample: () => void;
  reset: () => void;
  completed: Record<string, boolean>;
}

const initialState: ApplicationState = {
  profile: emptyProfile,
  transcript: "",
  documents: [],
  eligibility: null,
  selectedSchemeId: null,
  matchScore: null,
  dprAnswers: {},
  dpr: null,
  loan: { amount: 250000, rate: 7, tenureMonths: 60, moratoriumMonths: 6 },
  partnerId: null,
  reference: null,
  submittedAt: null,
};

const ApplicationContext = createContext<Ctx | null>(null);

export function ApplicationProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ApplicationState>(initialState);

  const value = useMemo<Ctx>(() => {
    const update = (patch: Partial<ApplicationState>) =>
      setState((prev) => ({ ...prev, ...patch }));

    return {
      ...state,
      update,
      reset: () => setState(initialState),
      loadSample: () =>
        setState((prev) => ({
          ...prev,
          profile: {
            name: sampleBeneficiary.name,
            location: sampleBeneficiary.location,
            business: sampleBeneficiary.business,
            loanRequirement: sampleBeneficiary.loanRequirement,
            annualIncome: sampleBeneficiary.annualIncome,
            language: prev.profile.language,
          },
          loan: { ...prev.loan, amount: sampleBeneficiary.loanRequirement },
        })),
      completed: {
        voice: Boolean(state.profile.name),
        documents: state.documents.length > 0,
        eligibility: Boolean(state.eligibility),
        schemes: Boolean(state.selectedSchemeId),
        dpr: Boolean(state.dpr),
        loan: true,
        "lending-partner": Boolean(state.partnerId),
        dossier: Boolean(state.reference),
      },
    };
  }, [state]);

  return <ApplicationContext.Provider value={value}>{children}</ApplicationContext.Provider>;
}

export function useApplication() {
  const ctx = useContext(ApplicationContext);
  if (!ctx) throw new Error("useApplication must be used inside ApplicationProvider");
  return ctx;
}
