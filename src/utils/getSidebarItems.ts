import { role } from "@/assets/constants/role";
import { adminSidebarItems } from "@/routes/adminSidebarItems";
import { userSidebarItems } from "@/routes/userSidebarItems";
import type { TRole } from "@/types";

export const getSidebarItems = (userRole: TRole) => {
  switch (userRole) {
    case role.admin:
      return [...adminSidebarItems];
    case role.agent:
      return [...userSidebarItems];
    case role.user:
      return [...userSidebarItems];
    default:
      return [];
  }
};
