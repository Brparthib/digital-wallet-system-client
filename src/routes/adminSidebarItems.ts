import type { ISidebarItem } from "@/types";
import { lazy } from "react";

const AllTransactionOverview = lazy(
  () => import("@/pages/Admin/AllTransactionOverview")
);
const AllUser = lazy(() => import("@/pages/Admin/AllUser"));
const AllTransactions = lazy(() => import("@/pages/Admin/AllTransactions"));
const Profile = lazy(() => import("@/pages/Profile"));

export const adminSidebarItems: ISidebarItem[] = [
  {
    title: "Admin Dashboard",
    items: [
      {
        title: "Analytics",
        url: "/admin/overview",
        component: AllTransactionOverview,
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
      {
        title: "Profile",
        url: "/admin/profile",
        component: Profile,
      },
    ],
  },
];
