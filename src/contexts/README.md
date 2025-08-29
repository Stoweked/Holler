# Contexts

This directory contains React context providers for global state management.

### **Files**

- **`ProfileContext.tsx`**: Provides user profile data to the application. It fetches the authenticated user's profile from Supabase and makes it available to all components wrapped within the ProfileProvider. Additionally, it includes a real-time authentication state listener. If the user's session expires or they sign out, this listener detects the SIGNED_OUT event and automatically redirects them to the landing page to ensure the UI stays in sync with their authentication status.
