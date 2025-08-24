import type { ISidebarItem } from "@/types";
import { lazy } from "react";

const AddMoney = lazy(() => import("@/pages/Agent/AddMoney"));
const AgentTransaction = lazy(() => import("@/pages/Agent/AgentTransaction"));

export const agentSidebarItems: ISidebarItem[] = [
  {
    title: "Agent Dashboard",
    items: [
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
