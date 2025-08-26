import App from "@/App";
import DashboardLayout from "@/components/layout/DashboardLayout";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import FAQ from "@/pages/FAQ";
import Features from "@/pages/Features";
import Homepage from "@/pages/Homepage";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import { createBrowserRouter } from "react-router";
import { generateRoutes } from "@/utils/generateRoutes";
import { adminSidebarItems } from "./adminSidebarItems";
import { agentSidebarItems } from "./agentSidebarItems";
import { userSidebarItems } from "./userSidebarItems";
import { withAuth } from "@/utils/withAuth";
import { role } from "@/assets/constants/role";
import type { TRole } from "@/types";
import { NavigateRoute } from "@/utils/NavigateRoute";
import Unauthorized from "@/pages/Unauthorized";

export const router = createBrowserRouter([
  {
    Component: App,
    path: "/",
    children: [
      {
        Component: Homepage,
        index: true,
      },
      {
        Component: About,
        path: "about",
      },
      {
        Component: Features,
        path: "features",
      },
      {
        Component: Contact,
        path: "contact",
      },
      {
        Component: FAQ,
        path: "faq",
      },
    ],
  },
  {
    Component: withAuth(DashboardLayout, role.admin as TRole),
    path: "/admin",
    children: [
      { index: true, element: NavigateRoute("/admin/overview") },
      ...generateRoutes(adminSidebarItems),
    ],
  },
  {
    Component: withAuth(DashboardLayout, role.agent as TRole),
    path: "/agent",
    children: [
      { index: true, element: NavigateRoute("/agent/overview") },
      ...generateRoutes(agentSidebarItems),
    ],
  },
  {
    Component: withAuth(DashboardLayout, role.user as TRole),
    path: "/user",
    children: [
      { index: true, element: NavigateRoute("/user/overview") },
      ...generateRoutes(userSidebarItems),
    ],
  },
  {
    Component: Login,
    path: "/login",
  },
  {
    Component: Register,
    path: "/register",
  },
  {
    Component: Unauthorized,
    path: "/unauthorized",
  },
]);
