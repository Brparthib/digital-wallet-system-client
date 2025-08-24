import { Navigate } from "react-router";

export const NavigateRoute = (route: string) => {
  return <Navigate to={route} />;
}
