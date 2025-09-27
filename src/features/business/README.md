# Business

This feature enables users to create and manage their business profiles. This is crucial for users who operate as a company, allowing them to tailor their public-facing information and settings.

### Key Components

- **`BusinessSettings.tsx`**: The main component for viewing and managing all business-related settings.
- **`BusinessProfileCard.tsx`**: A card that displays the business's profile information and provides an entry point for editing it.
- **`BusinessProfileForm.tsx`**: A form used to edit the details of the business profile.
- **`BusinessProfileView.tsx`**: A component for displaying the business profile in a read-only state.

### Hooks

- **`useBusinessProfile.ts`**: A hook for fetching and managing the business's profile data.
- **`useBusinessProfileForm.ts`**: A hook that handles the form state, validation, and submission logic for the business profile form.

### Actions

- **`check-business-username.ts`**: A Server Action to verify if a business username is available.

### How to Use

The business feature is integrated into the user's account settings. Users with a business account type can navigate to their settings to view and edit their business profile and related information.

### Related Features

- **Account**: This feature is closely tied to the user's main account, appearing as a section within the account settings.
- **Transactions**: When a business sends or receives money, its profile information is displayed in the transaction details.
