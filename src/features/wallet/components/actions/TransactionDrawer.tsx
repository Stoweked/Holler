import { Drawer, Space } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import ConnectBankDrawer from "@/features/banks/components/ConnectBankDrawer";
import { useTransactionState } from "../../hooks/useTransactionState";
import { useTransactionConfirmation } from "../../hooks/useTransactionConfirmation";
import TransactionDrawerTitle from "./TransactionDrawerTitle";
import TransactionDrawerContent from "./TransactionDrawerContent";
import classes from "./Actions.module.css";
import { TransactionActionType } from "../../types/wallet";
import { TransactionParty } from "@/features/transactions/types/transactionParty";

interface TransactionDrawerProps {
  opened: boolean;
  close: () => void;
  actionType: TransactionActionType | null;
  preselectedParty?: TransactionParty | null;
}

interface TransactionDrawerInnerProps {
  opened: boolean;
  close: () => void;
  actionType: TransactionActionType; // Guaranteed to be non-null
  preselectedParty: TransactionParty | null;
}

// All hooks and logic are moved into this inner component
function TransactionDrawerInner({
  opened,
  close,
  actionType,
  preselectedParty,
}: TransactionDrawerInnerProps) {
  const state = useTransactionState(
    opened,
    actionType,
    close,
    preselectedParty
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
      transactionType: actionType,
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
              transactionType={actionType}
              preselectedParty={preselectedParty}
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

// The main export is now a lightweight wrapper
export default function TransactionDrawer({
  opened,
  close,
  actionType,
  preselectedParty = null,
}: TransactionDrawerProps) {
  // Conditionally render the inner component *after* the check.
  // This ensures hooks are not called conditionally.
  if (!actionType) {
    return null;
  }

  return (
    <TransactionDrawerInner
      opened={opened}
      close={close}
      actionType={actionType}
      preselectedParty={preselectedParty}
    />
  );
}
