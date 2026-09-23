# Bank designs

`BankItem`, `BankDetailsCard`, and `BankProfileModal` are exported through
`src/ui/index.ts` along with the [Bank display type](types/bank.ts). They receive
bank data and interaction props. BankProfileModal requires an explicit
`onDisconnect` callback to enable disconnection and accepts `disconnecting` state.
The host performs and confirms the operation.

BankList, ConnectedBanksDrawer, SelectBankStep, and ConnectBankDrawer remain
prototype composition. ConnectBankDrawer has form fields and a button but no
bank-linking implementation. Preview bank selection uses local sample data;
these screens do not connect real accounts or move funds.

See [React integration](../../../docs/react-integration.md) for the supported
handoff. The destination app will supply banking data and operations separately.
