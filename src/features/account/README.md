# Account

This feature provides users with the tools to manage their personal profile and application settings. It serves as the central hub for user-specific configurations.

### Key Components

- **`Account.tsx`**: The main page component that assembles all the different account and profile settings sections.
- **`AccountDropdown.tsx`**: A dropdown menu located in the top navigation bar, providing quick links to the user's account page and the logout action.
- **`profile/ProfileCard.tsx`**: A component that displays the user's profile information and provides an entry point to edit it.
- **`profile/ProfileForm.tsx`**: The form used to update a user's personal information, such as name and username.
- **`profile/ProfileView.tsx`**: Displays the user's profile information in a read-only state.
- **`ColorModeCard.tsx`**: A settings card that allows the user to toggle between light and dark themes.
- **`ResetPasswordCard.tsx`**: Provides a secure way for users to change their password.
- **`DeleteAccountCard.tsx`**: A component that allows a user to permanently delete their account.

### Hooks

- **`useProfileForm.tsx`**: Manages the state, validation, and submission logic for the user's profile form.

### Actions

- **`update-profile.ts`**: A Server Action for updating the user's profile information in the database.
- **`upload-avatar.ts`**: A Server Action for handling the upload and updating of a user's profile picture.

### How to Use

The account feature is accessed via the `AccountDropdown` in the main application header or by navigating directly to the `/account` route. It provides the interface for all user-specific settings.

### Related Features

- **Authentication**: This feature manages the profile data for the currently authenticated user.
- **Business**: For users with a business account, the business profile settings are linked from and displayed within the main account page.
- **Billing**: The user's billing information and history are presented as a section within the account settings.
