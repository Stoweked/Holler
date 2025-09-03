# Authentication Feature

This directory contains all the logic, components, and types related to user authentication.

### Subdirectories

- **`/actions`**: Contains server-side actions for handling authentication, such as logging in, signing up, and resetting passwords.
- **`/components`**: Includes all UI components related to authentication, including the login form, sign-up form, and multi-step sign-up flow.
- **`/hooks`**: Houses custom React hooks for managing the state and logic of authentication forms, such as the multi-step sign-up process.
- **`/types`**: Defines TypeScript types and interfaces for authentication-related data structures, ensuring type safety across the feature.

### Key Components and Logic

- **`LoginForm.tsx`**: The main component for the user login form, handling user input and form submission.
- **`MultiStepSignupForm.tsx`**: A component that orchestrates the multi-step sign-up process, guiding users through profile information and password creation.
- **`useMultiStepSignupForm.ts`**: A custom hook that manages the state and logic for the multi-step sign-up form, including step transitions and form validation.
- **Server Actions**: The `actions` directory contains various server-side functions that interact with Supabase for user authentication, such as `login.ts`, `signup.ts`, and `logout.ts`.
