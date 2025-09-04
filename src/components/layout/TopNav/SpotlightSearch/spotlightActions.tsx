// src/components/layout/TopNav/SpotlightSearch/spotlightActions.tsx
import {
  SpotlightActionData,
  SpotlightActionGroupData,
} from "@mantine/spotlight";
import {
  UserMultiple02Icon,
  BankIcon,
  Message01Icon,
  Logout02Icon,
  DashboardCircleIcon,
  PlusSignIcon,
  ArrowUp02Icon,
  ArrowDown02Icon,
  ArrowLeftRightIcon,
  UserIcon,
  PencilEdit01Icon,
  Settings01Icon,
  Notification01Icon,
  CreditCardIcon,
  OfficeIcon,
  Sun03Icon,
  InboxIcon,
} from "hugeicons-react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { logout } from "@/features/auth/actions/logout";

export const getSpotlightActions = (
  router: AppRouterInstance
): (SpotlightActionGroupData | SpotlightActionData)[] => [
  {
    group: "Navigation",
    actions: [
      {
        id: "dashboard",
        label: "Dashboard",
        description: "View your account summary and recent activity",
        keywords: ["home", "main", "overview", "activity", "feed"],
        onClick: () => router.push("/dashboard"),
        leftSection: <DashboardCircleIcon size={24} />,
      },
      {
        id: "contacts",
        label: "Contacts",
        description: "View and manage your contacts",
        keywords: ["people", "customers", "clients", "vendors"],
        onClick: () => window.dispatchEvent(new CustomEvent("open-contacts")),
        leftSection: <UserMultiple02Icon size={24} />,
      },
      {
        id: "banks",
        label: "Bank Accounts",
        description: "Manage your connected bank accounts",
        keywords: ["payment methods", "financial", "link bank"],
        onClick: () => window.dispatchEvent(new CustomEvent("open-banks")),
        leftSection: <BankIcon size={24} />,
      },
      {
        id: "notifications",
        label: "Notifications",
        description: "View your recent notifications",
        keywords: ["activity", "alerts", "inbox", "messages"],
        onClick: () =>
          window.dispatchEvent(new CustomEvent("open-notifications")),
        leftSection: <InboxIcon size={24} />,
      },
    ],
  },
  {
    group: "Actions",
    actions: [
      {
        id: "deposit",
        label: "Deposit",
        description: "Add money to your Holler account",
        keywords: ["add funds", "load money", "transfer in"],
        onClick: () => window.dispatchEvent(new CustomEvent("open-deposit")),
        leftSection: <PlusSignIcon size={24} />,
      },
      {
        id: "send",
        label: "Send",
        description: "Send a payment to a contact",
        keywords: ["send money", "pay", "payout"],
        onClick: () => window.dispatchEvent(new CustomEvent("open-send")),
        leftSection: <ArrowUp02Icon size={24} />,
      },
      {
        id: "request",
        label: "Request",
        description: "Request a payment from a contact",
        keywords: ["request money", "invoice", "bill"],
        onClick: () => window.dispatchEvent(new CustomEvent("open-request")),
        leftSection: <ArrowDown02Icon size={24} />,
      },
      {
        id: "transfer",
        label: "Transfer",
        description: "Transfer funds between your accounts",
        keywords: ["move money", "internal transfer"],
        onClick: () => window.dispatchEvent(new CustomEvent("open-transfer")),
        leftSection: <ArrowLeftRightIcon size={24} />,
      },
    ],
  },
  {
    group: "Settings",
    actions: [
      {
        id: "settings",
        label: "Settings",
        description: "Open your account and app settings",
        keywords: ["preferences", "options", "configuration"],
        onClick: () =>
          window.dispatchEvent(
            new CustomEvent("open-settings", { detail: { tab: "account" } })
          ),
        leftSection: <Settings01Icon size={24} />,
      },
      {
        id: "profile",
        label: "Profile",
        description: "Manage your personal information and avatar",
        keywords: ["user", "account", "avatar", "photo", "personal"],
        onClick: () =>
          window.dispatchEvent(
            new CustomEvent("open-settings", { detail: { tab: "account" } })
          ),
        leftSection: <UserIcon size={24} />,
      },
      {
        id: "business",
        label: "Business",
        description: "Manage your business profile",
        keywords: ["company", "organization", "work"],
        onClick: () =>
          window.dispatchEvent(
            new CustomEvent("open-settings", { detail: { tab: "business" } })
          ),
        leftSection: <OfficeIcon size={24} />,
      },
      {
        id: "billing",
        label: "Billing",
        description: "Manage your billing and payment methods",
        keywords: ["payment", "subscription", "credit card", "plans"],
        onClick: () =>
          window.dispatchEvent(
            new CustomEvent("open-settings", { detail: { tab: "billing" } })
          ),
        leftSection: <CreditCardIcon size={24} />,
      },
      {
        id: "notification-settings",
        label: "Notification preferences",
        description: "Manage your notification preferences",
        keywords: ["alerts", "emails", "messages"],
        onClick: () =>
          window.dispatchEvent(
            new CustomEvent("open-settings", {
              detail: { tab: "notifications" },
            })
          ),
        leftSection: <Notification01Icon size={24} />,
      },
      {
        id: "appearance",
        label: "Appearance",
        description: "Change the app theme (light/dark mode)",
        keywords: ["theme", "dark mode", "light mode", "color"],
        onClick: () =>
          window.dispatchEvent(
            new CustomEvent("open-settings", { detail: { tab: "account" } })
          ),
        leftSection: <Sun03Icon size={24} />,
      },
      {
        id: "feedback",
        label: "Share Feedback",
        description: "Let us know how we can improve",
        keywords: ["suggestions", "report bug", "help"],
        onClick: () => window.dispatchEvent(new CustomEvent("open-feedback")),
        leftSection: <PencilEdit01Icon size={24} />,
      },
      {
        id: "support",
        label: "Support",
        description: "Get help and support",
        keywords: ["contact us", "customer service", "faq"],
        onClick: () => console.log("Support action triggered"),
        leftSection: <Message01Icon size={24} />,
      },
      {
        id: "logout",
        label: "Logout",
        description: "Sign out of your account",
        keywords: ["sign out", "exit", "quit"],
        onClick: logout,
        leftSection: <Logout02Icon size={24} />,
      },
    ],
  },
];
