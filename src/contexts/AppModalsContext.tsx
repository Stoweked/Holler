"use client";

import { createContext, useContext, ReactNode } from "react";
import { useDisclosure } from "@mantine/hooks";
import WhatsNewModal from "@/components/modals/WhatsNewModal";
import TermsConditionsModal from "@/components/modals/TermsConditionsModal";
import PrivacyPolicyModal from "@/components/modals/PrivacyPolicyModal";
import FeedbackModal from "@/components/modals/feedback/components/FeedbackModal";

interface AppModalsContextType {
  openWhatsNew: () => void;
  openTerms: () => void;
  openPrivacy: () => void;
  openFeedback: () => void;
}

const AppModalsContext = createContext<AppModalsContextType | undefined>(
  undefined
);

export function AppModalsProvider({ children }: { children: ReactNode }) {
  const [whatsNewOpened, { open: openWhatsNew, close: closeWhatsNew }] =
    useDisclosure(false);
  const [termsOpened, { open: openTerms, close: closeTerms }] =
    useDisclosure(false);
  const [privacyOpened, { open: openPrivacy, close: closePrivacy }] =
    useDisclosure(false);
  const [feedbackOpened, { open: openFeedback, close: closeFeedback }] =
    useDisclosure(false);

  const value = {
    openWhatsNew,
    openTerms,
    openPrivacy,
    openFeedback,
  };

  return (
    <AppModalsContext.Provider value={value}>
      {children}
      <WhatsNewModal opened={whatsNewOpened} close={closeWhatsNew} />
      <TermsConditionsModal opened={termsOpened} close={closeTerms} />
      <PrivacyPolicyModal opened={privacyOpened} close={closePrivacy} />
      <FeedbackModal opened={feedbackOpened} close={closeFeedback} />
    </AppModalsContext.Provider>
  );
}

export function useAppModals() {
  const context = useContext(AppModalsContext);
  if (context === undefined) {
    throw new Error("useAppModals must be used within an AppModalsProvider");
  }
  return context;
}
