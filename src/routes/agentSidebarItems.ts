import type { ISidebarItem } from "@/types";
import { lazy } from "react";

const CashIn = lazy(() => import("@/pages/Agent/Cashin"));

export const agentSidebarItems: ISidebarItem[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Cash-in",
        url: "/agent/cash-in",
        component: CashIn,
      },
    ],
  },
];
