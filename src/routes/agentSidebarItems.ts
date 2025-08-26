import type { ISidebarItem } from "@/types";
import { lazy } from "react";

const AgentTransactionOverview = lazy(
  () => import("@/pages/Agent/AgentTransactionOverview")
);
const AddMoney = lazy(() => import("@/pages/Agent/AddMoney"));
const AgentTransaction = lazy(() => import("@/pages/Agent/AgentTransaction"));

export const agentSidebarItems: ISidebarItem[] = [
  {
    title: "Agent Dashboard",
    items: [
      {
        title: "Overview",
        url: "/agent/overview",
        component: AgentTransactionOverview,
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
    ],
  },
];
