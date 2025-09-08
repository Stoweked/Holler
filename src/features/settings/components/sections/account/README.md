# Account & Settings Feature

This directory contains all components, hooks, and types related to user account management and application settings. The primary entry point is the `SettingsDrawer`, which serves as a comprehensive settings panel for the user.

### Key Directories & Components

- **/components**: Contains all UI components for this feature.

  - `SettingsDrawer.tsx`: The main drawer component that houses all user settings, organized into navigable tabs like "Account," "Business," and "Billing."
  - **/tabs**: Holds the components for each main section within the `SettingsDrawer`.
    - **/profile**: Contains the refactored components for managing the user's profile.
      - `Account.tsx`: A wrapper component that aggregates the various cards related to the user's account, such as the profile, color mode, and security settings.
      - `ProfileCard.tsx`: The container component responsible for managing the view/edit state of the user's profile information.
      - `ProfileForm.tsx`: The form used for editing profile details, including avatar uploads and personal information.
      - `ProfileView.tsx`: A display-only component for showing the current profile data.
      - `AvatarUpload.tsx`: A dedicated component for handling the selection, preview, and upload of a user's avatar.
      - `ColorModeCard.tsx`, `ResetPasswordCard.tsx`, `DeleteAccountCard.tsx`: Individual components for managing appearance and security settings.
    - `BillingSettings.tsx`, `NotificationsSettings.tsx`, `AchievementsSettings.tsx`: Placeholder components for future settings tabs.

- **/hooks**:

  - `useProfileForm.ts`: A custom React hook that encapsulates all logic for the profile form. It manages form state, validation, avatar upload handling, and the API submission process for updating a user's profile.

- **/types**:
  - `account.ts`: Defines the core `Profile` TypeScript interface used throughout the application.
