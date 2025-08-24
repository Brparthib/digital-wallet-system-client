import type { ISidebarItem } from "@/types";
import { lazy } from "react";

const SendMoney = lazy(() => import("@/pages/User/SendMoney"));

export const userSidebarItems: ISidebarItem[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Send Money",
        url: "/user/send-money",
        component: SendMoney,
      },
    ],
  },
];
