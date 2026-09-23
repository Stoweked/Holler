# Preview feedback form

`components/FeedbackModal.tsx` is opened from the preview account dropdown. It
submits through `useServices().submitFeedback`; the default read-only adapter
reports that submission is unavailable.

The legacy server action is retained at
`src/lib/adapters/supabase/actions/feedback/submit-feedback.ts`. Neither that action
nor this connected form is part of the presentation-only React handoff. A future
exported form should receive an explicit submission callback and request state.
