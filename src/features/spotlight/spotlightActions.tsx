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
  Shield01Icon,
  Book01Icon,
  LegalDocument01Icon,
  StarsIcon,
  ClipboardIcon,
} from "hugeicons-react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { logout } from "@/features/auth/actions/logout";
import { TransactionActionType } from "@/features/wallet/types/wallet";

type OpenActionDrawerFunc = (type: TransactionActionType) => void;

export const getSpotlightActions = (
  router: AppRouterInstance,
  openActionDrawer: OpenActionDrawerFunc,
  openWaiversDrawer: () => void,
  closeNav: () => void // Add closeNav parameter
): (SpotlightActionGroupData | SpotlightActionData)[] => [
  {
    group: "Navigation",
    actions: [
      {
        id: "dashboard",
        label: "Dashboard",
        description: "View your account summary and recent activity",
        keywords: ["home", "main", "overview", "activity", "feed"],
        onClick: () => {
          router.push("/dashboard");
          closeNav();
        },
        leftSection: <DashboardCircleIcon size={24} />,
      },
      {
        id: "contacts",
        label: "Contacts",
        description: "View and manage your contacts",
        keywords: ["people", "customers", "clients", "vendors", "username"],
        onClick: () => {
          window.dispatchEvent(new CustomEvent("open-contacts"));
          closeNav();
        },
        leftSection: <UserMultiple02Icon size={24} />,
      },
      {
        id: "waivers",
        label: "Lien waivers",
        description: "View, create, and manage your lien waivers",
        keywords: ["lien", "waiver", "document", "legal", "manage", "create"],
        onClick: () => {
          openWaiversDrawer();
          closeNav();
        },
        leftSection: <ClipboardIcon size={24} />,
      },
      {
        id: "banks",
        label: "Bank accounts",
        description: "Manage your connected bank accounts",
        keywords: ["payment methods", "financial", "link bank"],
        onClick: () => {
          window.dispatchEvent(new CustomEvent("open-banks"));
          closeNav();
        },
        leftSection: <BankIcon size={24} />,
      },
      {
        id: "notifications",
        label: "Notifications",
        description: "View your recent notifications",
        keywords: ["activity", "alerts", "inbox", "messages"],
        onClick: () => {
          window.dispatchEvent(new CustomEvent("open-notifications"));
          closeNav();
        },
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
        onClick: () => {
          openActionDrawer("deposit");
          closeNav();
        },
        leftSection: <PlusSignIcon size={24} />,
      },
      {
        id: "send",
        label: "Send",
        description: "Send a payment to a contact",
        keywords: ["send money", "pay", "payout"],
        onClick: () => {
          openActionDrawer("send");
          closeNav();
        },
        leftSection: <ArrowUp02Icon size={24} />,
      },
      {
        id: "request",
        label: "Request",
        description: "Request a payment from a contact",
        keywords: ["request money", "invoice", "bill"],
        onClick: () => {
          openActionDrawer("request");
          closeNav();
        },
        leftSection: <ArrowDown02Icon size={24} />,
      },
      {
        id: "transfer",
        label: "Transfer",
        description: "Transfer funds between your accounts",
        keywords: ["move money", "internal transfer"],
        onClick: () => {
          openActionDrawer("transfer");
          closeNav();
        },
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
        onClick: () => {
          window.dispatchEvent(
            new CustomEvent("open-settings", { detail: { tab: "account" } })
          );
          closeNav();
        },
        leftSection: <Settings01Icon size={24} />,
      },
      {
        id: "profile",
        label: "Profile",
        description: "Manage your personal information and avatar",
        keywords: [
          "user",
          "account",
          "avatar",
          "photo",
          "personal",
          "username",
        ],
        onClick: () => {
          window.dispatchEvent(
            new CustomEvent("open-settings", { detail: { tab: "account" } })
          );
          closeNav();
        },
        leftSection: <UserIcon size={24} />,
      },
      {
        id: "business",
        label: "Business",
        description: "Manage your business profile",
        keywords: ["company", "organization", "work"],
        onClick: () => {
          window.dispatchEvent(
            new CustomEvent("open-settings", { detail: { tab: "business" } })
          );
          closeNav();
        },
        leftSection: <OfficeIcon size={24} />,
      },
      {
        id: "billing",
        label: "Billing",
        description: "Review your monthly statements and transaction fees.",
        keywords: [
          "payment",
          "subscription",
          "credit card",
          "plans",
          "fees",
          "statements",
        ],
        onClick: () => {
          window.dispatchEvent(
            new CustomEvent("open-settings", { detail: { tab: "billing" } })
          );
          closeNav();
        },
        leftSection: <CreditCardIcon size={24} />,
      },
      {
        id: "notification-settings",
        label: "Notification preferences",
        description: "Manage your notification preferences",
        keywords: ["alerts", "emails", "messages"],
        onClick: () => {
          window.dispatchEvent(
            new CustomEvent("open-settings", {
              detail: { tab: "notifications" },
            })
          );
          closeNav();
        },
        leftSection: <Notification01Icon size={24} />,
      },
      {
        id: "appearance",
        label: "Appearance",
        description: "Change the app theme (light/dark mode)",
        keywords: ["theme", "dark mode", "light mode", "color"],
        onClick: () => {
          window.dispatchEvent(
            new CustomEvent("open-settings", { detail: { tab: "account" } })
          );
          closeNav();
        },
        leftSection: <Sun03Icon size={24} />,
      },
      {
        id: "reset-password",
        label: "Reset password",
        description: "Reset your account password",
        keywords: ["change password", "update password", "forgot password"],
        onClick: () => {
          router.push("/reset-password");
          closeNav();
        },
        leftSection: <Shield01Icon size={24} />,
      },
    ],
  },
  {
    group: "Resources",
    actions: [
      {
        id: "whats-new",
        label: "What’s new",
        description: "See the latest product updates and announcements",
        keywords: [
          "whats new",
          "changelog",
          "release notes",
          "updates",
          "new features",
          "product updates",
          "announcements",
        ],
        onClick: () => {
          window.dispatchEvent(new CustomEvent("open-whats-new"));
          closeNav();
        },
        leftSection: <StarsIcon size={24} />,
      },
      {
        id: "terms",
        label: "Terms & conditions",
        description: "View the terms and conditions",
        keywords: ["terms", "conditions", "legal", "tos"],
        onClick: () => {
          window.dispatchEvent(new CustomEvent("open-terms"));
          closeNav();
        },
        leftSection: <LegalDocument01Icon size={24} />,
      },
      {
        id: "privacy",
        label: "Privacy policy",
        description: "View the privacy policy",
        keywords: ["privacy", "policy", "legal"],
        onClick: () => {
          window.dispatchEvent(new CustomEvent("open-privacy"));
          closeNav();
        },
        leftSection: <Book01Icon size={24} />,
      },
      {
        id: "feedback",
        label: "Share feedback",
        description: "Let us know how we can improve",
        keywords: ["suggestions", "report bug", "help"],
        onClick: () => {
          window.dispatchEvent(new CustomEvent("open-feedback"));
          closeNav();
        },
        leftSection: <PencilEdit01Icon size={24} />,
      },
      {
        id: "support",
        label: "Support",
        description: "Get help and support",
        keywords: ["contact us", "customer service", "faq"],
        onClick: () => {
          console.log("Support action triggered");
          closeNav();
        },
        leftSection: <Message01Icon size={24} />,
      },
      {
        id: "logout",
        label: "Logout",
        description: "Sign out of your account",
        keywords: ["sign out", "exit", "quit"],
        onClick: () => {
          logout();
          closeNav();
        },
        leftSection: <Logout02Icon size={24} />,
      },
    ],
  },
];
