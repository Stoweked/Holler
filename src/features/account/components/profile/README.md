# Connected profile components

ProfileCard uses `useProfileForm` and the preview's account/services contexts,
then supplies props to ProfileView or ProfileForm. The shared avatar
input lives at `src/features/settings/components/AvatarUpload.tsx`.

These editors are not part of the presentation-only handoff. The default preview
uses demo account data and cannot persist profile changes. See the
[account documentation](../../README.md) for the boundary.
