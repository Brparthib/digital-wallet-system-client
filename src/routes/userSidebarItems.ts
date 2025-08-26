import type { ISidebarItem } from "@/types";
import { lazy } from "react";

const UserOverView = lazy(() => import("@/pages/User/UserOverView"));
const SendMoney = lazy(() => import("@/pages/User/SendMoney"));
const Withdraw = lazy(() => import("@/pages/User/Withdraw"));
const UserTransaction = lazy(() => import("@/pages/User/UserTransaction"));

export const userSidebarItems: ISidebarItem[] = [
  {
    title: "User Dashboard",
    items: [
      {
        title: "Overview",
        url: "/user/overview",
        component: UserOverView,
      },
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
