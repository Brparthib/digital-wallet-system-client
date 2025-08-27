import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetAgentStatsQuery } from "@/redux/features/agent/agent.api";
import {
  Wallet,
  ArrowDownCircle,
  ArrowUpCircle,
  ArrowLeftRight,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

export default function AgentOverview() {
  const { data: agentStats, isLoading } = useGetAgentStatsQuery(undefined);

  if (isLoading) {
    return <p className="p-6">Loading...</p>; // later replace with Skeleton
  }

  const stats = agentStats?.data?.agentTransaction?.[0];
  const balance = agentStats?.data?.currentBalance?.balance || 0;

  const totalTransactionAmount = stats?.allTransactions?.totalTransaction || 0;
  const totalTransactionCount = stats?.allTransactions?.count || 0;

  const receivedMoney = stats?.receivedMoney?.totalReceived || 0;
  const receivedCount = stats?.receivedMoney?.count || 0;
  const totalCommission = stats?.receivedMoney?.totalCommissionEarned || 0;

  const addMoney = stats?.addMoney?.totalCashIn || 0;
  const addCount = stats?.addMoney?.count || 0;

  // Bar chart data
  const transactionChartData = [
    { name: "Cash In", value: addMoney },
    { name: "Received", value: receivedMoney },
  ];

  return (
    <div className="p-6 space-y-6 w-full">
      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wallet className="w-6 h-6" /> Current Balance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{balance.toFixed(2)} BDT</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r  from-purple-500 to-pink-600 text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ArrowLeftRight className="w-6 h-6" /> Total Transactions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {totalTransactionAmount.toFixed(2)} BDT
            </p>
            <p className="text-sm opacity-80">Count: {totalTransactionCount}</p>
          </CardContent>
        </Card>
      </div>

      {/* Breakdown Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ArrowUpCircle className="w-5 h-5 text-green-600" /> Commission
              Earned
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {totalCommission.toFixed(2)} BDT
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ArrowDownCircle className="w-5 h-5 text-green-600" /> Cash In
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>Total: ৳ {addMoney.toFixed(2)}</p>
            <p>Count: {addCount}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ArrowUpCircle className="w-5 h-5 text-blue-600" /> Received
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>Total: ৳ {receivedMoney.toFixed(2)}</p>
            <p>Count: {receivedCount}</p>
          </CardContent>
        </Card>
      </div>

      {/* Bar Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Transactions Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={transactionChartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#10b981" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
