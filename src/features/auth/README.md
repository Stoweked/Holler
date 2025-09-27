# Authentication

This feature handles all aspects of user authentication, including signing up, logging in, and managing user sessions. It provides the UI and server-side logic required to secure the application.

### Key Components

- **`LoginForm.tsx`**: A form for existing users to sign in.
- **`SignupForm.tsx`**: The initial form for new users to create an account.
- **`MultiStepSignupForm.tsx`**: A component that guides new users through a comprehensive sign-up process, including profile information and password creation.
- **`OAuthButtons.tsx`**: Provides options for users to sign in or sign up using third-party providers like Google or GitHub.

### Hooks

- **`useMultiStepSignupForm.ts`**: Manages the state, validation, and step transitions for the multi-step sign-up flow.

### Actions

- **`login.ts`**: A Server Action to handle user login.
- **`signup.ts`**: A Server Action to handle new user registration.
- **`logout.ts`**: A Server Action to terminate the user's session.
- **`forgot-password.ts`**: A Server Action to initiate the password reset process.
- **`reset-password.ts`**: A Server Action to finalize the password reset.

### How to Use

The authentication components are used on the application's public routes (e.g., `/login`, `/signup`). They use Server Actions to communicate with the authentication provider (Supabase) to create and manage user sessions. The application's middleware relies on this feature to protect routes and redirect unauthenticated users.

### Related Features

- **Account**: Once a user is authenticated, their profile and account settings are managed by the `account` feature.
- **Middleware**: The application's `middleware.ts` uses the authentication state to control access to protected dashboard pages.
