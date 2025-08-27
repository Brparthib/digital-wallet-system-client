/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  useGetAllTransactionStatsQuery,
  useGetUserStatsQuery,
} from "@/redux/features/admin/admin.api";
import {
  Users,
  UserCheck,
  ArrowLeftRight,
  CreditCard,
  Wallet,
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
} from "recharts";

const COLORS = ["#10b981", "#3b82f6", "#f97316", "#ef4444", "#8b5cf6"];

export default function AdminOverview() {
  const { data: allTransactionStats, isLoading: transactionStatsLoading } =
    useGetAllTransactionStatsQuery(undefined);
  const { data: userStats, isLoading: userStatsLoading } =
    useGetUserStatsQuery(undefined);

  if (transactionStatsLoading || userStatsLoading) {
    return <p className="p-6">Loading...</p>; // later replace with Skeleton
  }

  const uStats = userStats?.data;
  const tStats = allTransactionStats?.data;

  // Pie Chart data (users by role)
  const roleChartData =
    uStats?.usersByRole?.map((role: any) => ({
      name: role._id,
      value: role.count,
    })) || [];

  // Bar Chart data (transactions)
  const transactionChartData = [
    { name: "Add", value: tStats?.totalAddTransaction || 0 },
    { name: "Withdraw", value: tStats?.totalWithdrawTransaction || 0 },
    { name: "Send", value: tStats?.totalSendTransaction || 0 },
  ];

  // Revenue data
  const revenueData = tStats?.totalRevenue?.[0];

  return (
    <div className="p-6 space-y-6 w-full">
      {/* Top Grid: Users + Transactions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-gradient-to-r from-amber-600 to-orange-700 text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-6 h-6" /> Total Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{uStats?.totalUsers || 0}</p>
            <p className="text-sm opacity-80">
              Active: {uStats?.totalActiveUsers || 0} | Blocked:{" "}
              {uStats?.totalBlockedUsers || 0}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ArrowLeftRight className="w-6 h-6" /> Total Transactions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {tStats?.totalTransaction || 0}
            </p>
            <p className="text-sm opacity-80">
              New (7d): {tStats?.newTransactionInLast7Days || 0}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-green-600" /> Total Fees
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl font-bold">
              {revenueData?.totalFees?.toFixed(2) || 0} BDT
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wallet className="w-5 h-5 text-blue-600" /> Admin Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl font-bold">
              {revenueData?.totalAdminRevenue?.toFixed(2) || 0} BDT
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-purple-600" /> Agent Commission
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl font-bold">
              {revenueData?.totalAgentCommission?.toFixed(2) || 0} BDT
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Transaction Types (Bar Chart) */}
        <Card>
          <CardHeader>
            <CardTitle>Transactions by Type</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={transactionChartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#10b981" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* User Role Distribution (Pie Chart) */}
        <Card>
          <CardHeader>
            <CardTitle>User Roles Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={roleChartData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={120}
                  fill="#8884d8"
                  label
                >
                  {roleChartData.map((_: any, index: number) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
