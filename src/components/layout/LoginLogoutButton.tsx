import { Link } from "react-router";
import { Button } from "../ui/button";
import {
  authApi,
  useLogoutMutation,
} from "@/redux/features/auth/auth.api";
import { useAppDispatch } from "@/redux/hook";
import { useUserInfoQuery } from "@/redux/features/user/user.api";

export default function LoginLogoutButton() {
  const { data, isLoading } = useUserInfoQuery(undefined);
  const [logout] = useLogoutMutation();
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    await logout(undefined);
    dispatch(authApi.util.resetApiState());
  };

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      {data?.data?.phone && (
        <Button
          onClick={handleLogout}
          variant="outline"
          size="sm"
          className="text-sm hover:bg-background hover:text-destructive cursor-pointer"
          >
          Logout
        </Button>
      )}
      {!data?.data?.phone && (
          <Button
          asChild
          variant="default"
          size="sm"
          className="text-sm cursor-pointer"
        >
          <Link to="/login">Login</Link>
        </Button>
      )}
    </>
  );
}
