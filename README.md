# Holler

Holler provides secure and efficient mobile payments designed for construction trades, helping you get paid faster on the job.

![Holler Application OG Cover](/public/images/og-cover.png)

## ✨ Features

- **Authentication**: Secure user login, signup, and password recovery powered by Supabase.
- **Wallet Actions**: A unified, multi-step flow to easily send, request, deposit, and transfer funds.
- **Transaction Management**: View a detailed history of your transactions with powerful filtering and sorting capabilities.
- **Contact Management**: A simple interface to manage your business and personal contacts.
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
├── src/
│ ├── app/ # Next.js App Router: routing, pages, and API endpoints
│ ├── components/ # Reusable UI components (Layout, Navigation)
│ ├── contexts/ # Global React context providers (Profile, Wallet)
│ ├── features/ # Feature-based modules containing UI, logic, and types
│ │ ├── auth/ # Authentication actions and types
│ │ ├── banks/ # Components for managing bank accounts
│ │ ├── contacts/ # Components for contact management
│ │ ├── transactions/ # Components for displaying transaction history
│ │ └── wallet/ # Components and hooks for wallet actions (send, request, etc.)
│ ├── lib/ # Utility functions and libraries (Supabase helpers)
│ ├── mockData/ # Mock data for development
│ └── styles/ # Global styles and theme configuration
├── public/ # Static assets (images, fonts)
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
