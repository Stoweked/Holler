"use client";

import { createContext, useContext, ReactNode } from "react";
import { useDisclosure } from "@mantine/hooks";
import FeedbackModal from "@/components/modals/feedback/components/FeedbackModal";
import TermsConditionsModal from "@/components/modals/TermsConditionsModal";
import PrivacyPolicyModal from "@/components/modals/PrivacyPolicyModal";
import WhatsNewModal from "@/components/modals/WhatsNewModal";

interface ModalContextType {
  openFeedbackModal: () => void;
  openTermsModal: () => void;
  openPrivacyModal: () => void;
  openWhatsNewModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [
    feedbackModalOpened,
    { open: openFeedbackModal, close: closeFeedbackModal },
  ] = useDisclosure(false);

  const [termsModalOpened, { open: openTermsModal, close: closeTermsModal }] =
    useDisclosure(false);

  const [
    privacyModalOpened,
    { open: openPrivacyModal, close: closePrivacyModal },
  ] = useDisclosure(false);

  const [
    whatsNewModalOpened,
    { open: openWhatsNewModal, close: closeWhatsNewModal },
  ] = useDisclosure(false);

  return (
    <ModalContext.Provider
      value={{
        openFeedbackModal,
        openTermsModal,
        openPrivacyModal,
        openWhatsNewModal,
      }}
    >
      {children}
      <FeedbackModal opened={feedbackModalOpened} close={closeFeedbackModal} />
      <TermsConditionsModal opened={termsModalOpened} close={closeTermsModal} />
      <PrivacyPolicyModal
        opened={privacyModalOpened}
        close={closePrivacyModal}
      />
      <WhatsNewModal opened={whatsNewModalOpened} close={closeWhatsNewModal} />
    </ModalContext.Provider>
  );
}

export function useModals() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModals must be used within a ModalProvider");
  }
  return context;
}
