import { approval } from "@/assets/constants/approval";
import { role } from "@/assets/constants/role";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import type { TRole } from "@/types";
import type { ComponentType } from "react";
import { Navigate } from "react-router";

export const withAuth = (Component: ComponentType, requiredRole?: TRole) => {
  return function AuthWrapper() {
    const { data, isLoading } = useUserInfoQuery(undefined);

    if (!isLoading && !data?.data?.phone) {
      return <Navigate to="/login" />;
    }

    if (
      requiredRole &&
      requiredRole === data?.data?.role &&
      requiredRole === role.agent &&
      data?.data?.approval === approval.suspend
    ) {
      return <Navigate to="/unauthorized" />;
    }

    if (
      requiredRole &&
      requiredRole === data?.data?.role &&
      requiredRole === role.agent &&
      data?.data?.approval === approval.approved
    ) {
      return <Component />;
    }

    if (requiredRole && !isLoading && requiredRole !== data?.data?.role) {
      return <Navigate to="/unauthorized" />;
    }

    return <Component />;
  };
};
