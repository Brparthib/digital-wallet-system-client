import type { ISidebarItem } from "@/types";
import { lazy } from "react";

const SendMoney = lazy(() => import("@/pages/User/SendMoney"));
const UserTransaction = lazy(() => import("@/pages/User/UserTransaction"));

export const userSidebarItems: ISidebarItem[] = [
  {
    title: "User Dashboard",
    items: [
      {
        title: "Send Money",
        url: "/user/send-money",
        component: SendMoney,
      },
      {
        title: "My Transactions",
        url: "/user/my-transactions",
        component: UserTransaction,
      },
    ],
  },
];
