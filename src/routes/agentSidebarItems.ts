import type { ISidebarItem } from "@/types";
import { lazy } from "react";

const AddMoney = lazy(() => import("@/pages/Agent/AddMoney"));

export const agentSidebarItems: ISidebarItem[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Add Money",
        url: "/agent/add-money",
        component: AddMoney,
      },
    ],
  },
];
