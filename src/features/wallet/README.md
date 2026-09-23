# Wallet prototype

The wallet is a design preview of deposit, transfer, send, and request flows.
It is not an implemented payment backend and is excluded from the presentation-only
React handoff. A success screen in this prototype is not confirmation of a transfer.

- `components/PrimaryActionsCard.tsx`: balance and action controls.
- `components/steps/TransactionDrawer.tsx`: multi-step drawer composition.
- `components/steps/PaymentAmountStep.tsx` and `ConfirmationStep.tsx`: amount and
  confirmation designs.
- `contexts/WalletContext.tsx`: fixed sample balance, drawer state, and selection
  from mock transactions.
- `hooks/useTransactionState.ts`: local step/party/bank/amount/note/waiver state;
  starts with a sample bank and supports temporary contact selection.
- [types/wallet.ts](types/wallet.ts): action and step types.

These flows depend on connected contact, bank, project, and waiver UI. Before
exporting them, extract controlled views and move submission into host callbacks.
The destination app must confirm real operation outcomes before showing success.
See [React integration](../../../docs/react-integration.md).
