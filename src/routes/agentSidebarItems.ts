import type { ISidebarItem } from "@/types";
import { lazy } from "react";

const AgentOverview = lazy(() => import("@/pages/Agent/AgentOverview"));
const AddMoney = lazy(() => import("@/pages/Agent/AddMoney"));
const AgentTransaction = lazy(() => import("@/pages/Agent/AgentTransaction"));
const Profile = lazy(() => import("@/pages/Profile"));

export const agentSidebarItems: ISidebarItem[] = [
  {
    title: "Agent Dashboard",
    items: [
      {
        title: "Overview",
        url: "/agent/overview",
        component: AgentOverview,
      },
      {
        title: "Add Money",
        url: "/agent/add-money",
        component: AddMoney,
      },
      {
        title: "My Transactions",
        url: "/agent/my-transactions",
        component: AgentTransaction,
      },
      {
        title: "Profile",
        url: "/agent/profile",
        component: Profile,
      },
    ],
  },
];
