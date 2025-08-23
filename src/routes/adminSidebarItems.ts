import type { ISidebarItem } from "@/types";
import { lazy } from "react";

const Analytics = lazy(() => import("@/pages/Admin/Analytics"));
const AllUser = lazy(() => import("@/pages/Admin/AllUser"));

export const adminSidebarItems: ISidebarItem[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Analytics",
        url: "/admin/analytics",
        component: Analytics,
      },
    ],
  },
  {
    title: "User Management",
    items: [
      {
        title: "Add Tour Type",
        url: "/admin/all-user",
        component: AllUser,
      },
    ],
  },
];
