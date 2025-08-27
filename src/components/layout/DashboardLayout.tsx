import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Outlet } from "react-router";
import { ModeToggle } from "./ModeToggler";
import LoginLogoutButton from "./LoginLogoutButton";
import { useEffect, useState } from "react";
import Joyride, { type Step, STATUS, type CallBackProps } from "react-joyride";
import { useUserInfoQuery } from "@/redux/features/user/user.api";

export default function DashboardLayout() {
  const [run, setRun] = useState(false);
  const { data, isLoading } = useUserInfoQuery(undefined);
  const user = data?.data;

  const steps: Step[] = [
    {
      target: ".overview",
      content:
        "📊 This is your dashboard where you can see your current balance, recent activity, and quick stats.",
    },
    {
      target: ".sendMoney",
      content:
        "💸 Use this feature to send money to your contacts quickly and securely.",
    },
    {
      target: ".withdraw",
      content:
        "🏧 Here you can withdraw funds to your bank account or linked card.",
    },
    {
      target: ".transaction",
      content:
        "📜 View your transaction history here, including all past payments and receipts.",
    },
    {
      target: ".profile",
      content:
        "👤 Access and update your profile, manage security settings, and account details here.",
    },
  ];

  useEffect(() => {
    const userVisited = localStorage.getItem(`${user?.phone}`);
    if (!userVisited) {
      setRun(true);
      localStorage.setItem(`${user?.phone}`, "true");
    }
  }, [user?.phone]);

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status } = data;
    if (status === STATUS.FINISHED || status === STATUS.SKIPPED) {
      setRun(false);
    }
  };

  return (
    <>
      <Joyride
        steps={steps}
        run={run}
        continuous
        showSkipButton
        showProgress
        callback={handleJoyrideCallback}
      />
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <div className="ml-auto flex items-center gap-2">
              <ModeToggle />
              <LoginLogoutButton />
            </div>
          </header>
          <div className="flex flex-1 gap-4 p-5">
            <Outlet />
          </div>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}
