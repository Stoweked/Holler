# Profile Components

This directory contains the refactored components for displaying and editing a user's profile information.

### Components

- **`ProfileCard.tsx`**: The main container component that manages the view and edit states, rendering either `ProfileView` or `ProfileForm`.
- **`ProfileView.tsx`**: A display-only component that shows the user's current profile information.
- **`ProfileForm.tsx`**: The form component used for editing profile details. It utilizes the `useProfileForm` hook to manage its state and submission logic.
- **`AvatarUpload.tsx`**: A component that handles the selection and preview of a new avatar image.
