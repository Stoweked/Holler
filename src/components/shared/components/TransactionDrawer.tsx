// /src/features/transactions/components/TransactionDrawer.tsx

import { Drawer, Space } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Recipient } from "@/features/contacts/types/recipient";
import ConnectBankDrawer from "@/features/banks/components/ConnectBankDrawer";
import {
  useTransactionState,
  TransactionActionType,
} from "../hooks/useTransactionState";
import { useTransactionConfirmation } from "../hooks/useTransactionConfirmation";
import TransactionDrawerTitle from "./TransactionDrawerTitle";
import TransactionDrawerContent from "./TransactionDrawerContent";

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
  const [
    openedConnectBankDrawer,
    { open: openConnectBankDrawer, close: closeConnectBankDrawer },
  ] = useDisclosure(false);

  const onConfirm = () => {
    handleConfirm({
      ...state,
      transactionType,
      handleClose: state.handleClose,
    });
  };

  return (
    <>
      <Drawer
        opened={opened}
        onClose={state.handleClose}
        title={
          <TransactionDrawerTitle
            step={state.step}
            transactionType={transactionType}
            initialContact={initialContact}
            handleBack={state.handleBack}
          />
        }
        padding="md"
        size="md"
      >
        <TransactionDrawerContent
          state={state}
          onConfirm={onConfirm}
          onConnectNew={openConnectBankDrawer}
        />
        <Space h={100} />
      </Drawer>
      <ConnectBankDrawer
        opened={openedConnectBankDrawer}
        close={closeConnectBankDrawer}
      />
    </>
  );
}
