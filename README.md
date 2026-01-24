# Holler

Holler provides secure and efficient mobile payments designed for construction trades, helping you get paid faster on the job.

![Holler Application OG Cover](/public/images/og-cover.png)

## 📖 About This Project (Context for Developers & AI)

This project is a **Next.js 15** application building a financial platform for construction. It uses **Supabase** for backend/auth and **Mantine UI** for the frontend component library.

**Key Architectural Decisions:**

- **App Router:** We use the Next.js App Router (`src/app`).
- **Feature-Sliced Design:** Core business logic lives in `src/features`. Each feature folder is self-contained.
- **Mantine UI:** We rely heavily on Mantine's core components and hooks.
- **Supabase:** Used for Auth, Database (PostgreSQL), and Realtime subscriptions.

## ✨ Features

- **Authentication**: Secure user login, signup, and password recovery powered by Supabase.
- **Wallet Actions**: A unified, multi-step flow to easily send, request, deposit, and transfer funds.
- **Transaction Management**: View a detailed history of your transactions with powerful filtering and sorting capabilities.
- **Contact Management**: A simple interface to manage your business and personal contacts.
- **Bank Account Linking**: Connect and manage your bank accounts for seamless transfers.
- **Spotlight Search**: Quickly navigate the app and perform actions with a powerful search tool (`⌘K`).
- **Light & Dark Mode**: Switch between light and dark themes for your visual comfort.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router, Turbopack)
- **Language**: TypeScript
- **Styling**: [Mantine UI v7](https://mantine.dev/), CSS Modules (where necessary), PostCSS
- **State Management**: React Context + Hooks (minimal global state, preferred feature-local state)
- **Backend / Auth**: [Supabase](https://supabase.com/)
- **Icons**: [HugeIcons React](https://hugeicons.com/)

## 📂 Project Structure

This structure is strict. **AI Agents: Please respect this hierarchy when adding new files.**

```
src/
├── app/                  # Next.js App Router (Pages, Layouts, API Routes)
│   ├── (auth)/           # Authentication routes (login, register)
│   ├── (dashboard)/      # Protected dashboard routes
│   └── layout.tsx        # Root layout
├── components/           # Global/Shared UI Components (Atoms/Molecules)
│   ├── layout/           # structural components (Navbar, Sidebar)
│   └── shared/           # Generic reusable components (Buttons, Cards)
├── contexts/             # Global React Context providers (Profile, Wallet)
├── features/             # Business Logic & Complex Components (The "Meat" of the app)
│   ├── [feature]/        # e.g., 'wallet', 'transactions'
│   │   ├── components/   # Feature-specific components
│   │   └── ...           # Feature-specific logic
├── lib/                  # Utilities, Supabase Clients, Helper functions
│   ├── supabase/         # Supabase client configuration
│   └── hooks/            # Global hooks
├── styles/               # Global styles and theme configuration
└── public/               # Static assets (images, fonts)
```

## 🚀 Getting Started

### 1. Prerequisites

- [Node.js](https://nodejs.org/en/) (v18.18.0 or later)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### 2. Clone the Repository

```bash
git clone <your-repository-url>
cd holler_1
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Set Up Environment Variables

Create a `.env.local` file in the root of the project and add your Supabase credentials:

```bash
# .env.local
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📜 Available Scripts

- `npm run dev`: Starts the development server with Turbopack.
- `npm run build`: Builds the application for production.
- `npm run start`: Starts a production server.
- `npm run lint`: Runs the ESLint linter.

## 💻 Development Guidelines

### Creating a New Feature

1. Create a new folder in `src/features/<feature-name>`.
2. Add a `README.md` in that folder explaining its purpose.
3. Keep feature-specific components _inside_ that feature folder. Only move to `src/components/shared` if used by **multiple** different features.

### Styling

- Prefer **Mantine** props (e.g., `mt="md"`, `c="blue"`) for layout and spacing.
- Use `classes.section` (CSS Modules) for complex custom styling not achievable with props.
