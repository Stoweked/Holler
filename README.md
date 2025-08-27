# Holler

Holler provides secure and efficient mobile payments designed for construction trades, helping you get paid faster on the job.

![Holler Application OG Cover](stoweked/holler/Holler-main/public/images/og-cover.png)

## ✨ Features

- **Authentication**: Secure user login, signup, and password recovery powered by Supabase.
- **Payments**: Easily send and request payments from contacts.
- **Deposits**: Add money to your Holler account from a connected bank.
- **Transaction Management**: View a detailed history of your transactions with filtering and sorting capabilities.
- **Contact Management**: A simple interface to manage your contacts.
- **Bank Account Linking**: Connect and manage your bank accounts for seamless transfers.
- **Spotlight Search**: Quickly navigate the app and perform actions with a powerful search tool (`⌘K`).
- **Light & Dark Mode**: Switch between light and dark themes for your visual comfort.

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **Styling**: [Mantine UI](https://mantine.dev/)
- **Authentication**: [Supabase](https://supabase.io/)
- **Deployment**: [Vercel](https://vercel.com/)

## 📂 Project Structure

The project is organized with a focus on feature-based modules.

```
/
├── src/
│   ├── app/                # Next.js App Router: routing, pages, and API endpoints
│   │   ├── (app)/          # Authenticated application routes
│   │   ├── (auth)/         # Authentication routes (login, signup)
│   │   ├── (landing)/      # Public-facing landing page
│   │   └── api/            # API routes for server-side functionality
│   ├── components/         # Reusable UI components (Layout, Navigation)
│   ├── contexts/           # Global React context providers (e.g., ProfileContext)
│   ├── features/           # Feature-based modules containing UI, logic, and types
│   │   ├── auth/           # Authentication actions and types
│   │   ├── banks/          # Components for managing bank accounts
│   │   ├── contacts/       # Components for contact management
│   │   ├── deposit/        # Components for the deposit flow
│   │   ├── profile/        # User profile components
│   │   ├── send-request/   # Components for sending and requesting payments
│   │   ├── transactions/   # Components for displaying transactions
│   │   └── ...and more
│   ├── lib/                # Utility functions and libraries
│   │   └── supabase/       # Supabase client and server helpers
│   ├── mockData/           # Mock data for development (contacts, banks, transactions)
│   ├── styles/             # Global styles and theme configuration
│   └── types/              # TypeScript type definitions
├── public/                 # Static assets (images, fonts)
└── ...config files
```

## 🚀 Getting Started

To get started with the development environment, follow these steps:

### **1. Prerequisites**

- [Node.js](https://nodejs.org/en/) (v18.18.0 or later)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### **2. Clone the Repository**

```bash
git clone <your-repository-url>
cd holler-main
```

### **3. Install Dependencies**

```bash
npm install
```

### **4. Set Up Environment Variables**

Create a `.env.local` file in the root of the project and add your Supabase credentials. You can get these from your Supabase project settings.

```
# .env.local

NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### **5. Run the Development Server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## 📜 Available Scripts

- `npm run dev`: Starts the development server with Turbopack.
- `npm run build`: Builds the application for production.
- `npm run start`: Starts a production server.
- `npm run lint`: Runs the ESLint linter.
