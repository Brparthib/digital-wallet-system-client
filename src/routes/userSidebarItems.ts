import Withdraw from "@/pages/User/Withdraw";
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
        title: "Withdraw Money",
        url: "/user/cash-out",
        component: Withdraw,
      },
      {
        title: "My Transactions",
        url: "/user/my-transactions",
        component: UserTransaction,
      },
    ],
  },
];
