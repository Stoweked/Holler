// /src/features/transactions/components/TransactionDrawer.tsx

import { Drawer, Space, Transition } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Recipient } from "@/features/contacts/types/recipient";
import ConnectBankDrawer from "@/features/banks/components/ConnectBankDrawer";
import {
  useTransactionState,
  TransactionActionType,
} from "../../hooks/useTransactionState";
import { useTransactionConfirmation } from "../../hooks/useTransactionConfirmation";
import TransactionDrawerTitle from "./TransactionDrawerTitle";
import TransactionDrawerContent from "./TransactionDrawerContent";
import classes from "./Actions.module.css";

interface TransactionDrawerProps {
  opened: boolean;
  close: () => void;
  transactionType: TransactionActionType;
  initialContact?: Recipient | null;
}

export default function TransactionDrawer({
  opened,
  close,
  transactionType,
  initialContact = null,
}: TransactionDrawerProps) {
  const state = useTransactionState(
    opened,
    transactionType,
    close,
    initialContact
  );
  const { handleConfirm } = useTransactionConfirmation();
  const isSuccessStep = state.step === "success";
  const [
    openedConnectBankDrawer,
    { open: openConnectBankDrawer, close: closeConnectBankDrawer },
  ] = useDisclosure(false);

  const onConfirm = () => {
    handleConfirm({
      ...state,
      transactionType,
      handleClose: state.handleClose,
      setStep: state.setStep,
    });
  };

  return (
    <>
      <Drawer
        opened={opened}
        onClose={state.handleClose}
        title={
          !isSuccessStep && (
            <TransactionDrawerTitle
              step={state.step}
              transactionType={transactionType}
              initialContact={initialContact}
              handleBack={state.handleBack}
            />
          )
        }
        withCloseButton
        padding="md"
        size="md"
        classNames={{
          header: isSuccessStep ? classes.transparentHeader : undefined,
          content: isSuccessStep ? classes.successDrawer : undefined,
          close: isSuccessStep ? classes.successCloseButton : undefined,
        }}
      >
        <Transition
          mounted={opened}
          transition="fade"
          duration={400}
          timingFunction="ease"
        >
          {(styles) => (
            <div style={styles}>
              <TransactionDrawerContent
                state={state}
                onConfirm={onConfirm}
                onConnectNew={openConnectBankDrawer}
              />
            </div>
          )}
        </Transition>
        <Space h={100} />
      </Drawer>
      <ConnectBankDrawer
        opened={openedConnectBankDrawer}
        close={closeConnectBankDrawer}
      />
    </>
  );
}
