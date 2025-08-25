import type { ISidebarItem } from "@/types";
import { lazy } from "react";

const Analytics = lazy(() => import("@/pages/Admin/Analytics"));
const AllUser = lazy(() => import("@/pages/Admin/AllUser"));
const AllTransactions = lazy(() => import("@/pages/Admin/AllTransactions"));

export const adminSidebarItems: ISidebarItem[] = [
  {
    title: "Admin Dashboard",
    items: [
      {
        title: "Analytics",
        url: "/admin/analytics",
        component: Analytics,
      },
      {
        title: "All User",
        url: "/admin/all-user",
        component: AllUser,
      },
      {
        title: "All Transaction",
        url: "/admin/all-transaction",
        component: AllTransactions,
      },
    ],
  },
];
