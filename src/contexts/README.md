# Preview application context

`AppModalsContext.tsx` supplies shared modal controls for the connected preview.
`HollerFeatureProviders` in `src/ui/HollerFeatureProviders.tsx` mounts
AppModalsProvider along with the feature contexts and Mantine ModalsProvider.
Account state lives in `src/features/account/contexts/ProfileContext.tsx`.

These application contexts are excluded from the React UI handoff. Exported
views use controlled props and callbacks for selection and open/close behavior;
the destination app owns application state. See the
[integration guide](../../docs/react-integration.md).
