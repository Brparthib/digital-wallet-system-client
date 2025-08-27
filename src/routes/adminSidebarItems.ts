import type { ISidebarItem } from "@/types";
import { lazy } from "react";

const AdminOverview = lazy(() => import("@/pages/Admin/AdminOverview"));
const AllUser = lazy(() => import("@/pages/Admin/AllUser"));
const AllTransactions = lazy(() => import("@/pages/Admin/AllTransactions"));
const Profile = lazy(() => import("@/pages/Profile"));

export const adminSidebarItems: ISidebarItem[] = [
  {
    title: "Admin Dashboard",
    items: [
      {
        title: "Overview",
        url: "/admin/overview",
        component: AdminOverview,
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
