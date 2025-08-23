import type { ISidebarItem } from "@/types";
import { lazy } from "react";

const AddMoney = lazy(() => import("@/pages/User/AddMoney"));

export const userSidebarItems: ISidebarItem[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Add Money",
        url: "/user/add-money",
        component: AddMoney,
      },
    ],
  },
];
