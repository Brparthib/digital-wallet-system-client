import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetUserTransactionStatsQuery } from "@/redux/features/user/user.api";
import {
  Wallet,
  Send,
  Download,
  ArrowUpCircle,
  ArrowDownCircle,
  CreditCard,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function UserOverView() {
  const { data, isLoading } = useGetUserTransactionStatsQuery(undefined);

  if (isLoading) {
    return <p>Loading...</p>; // later replace with shadcn Skeleton
  }

  const balance = data?.data?.currentBalance?.balance;
  const stats = data?.data?.userTransaction?.[0];

  const totalTransactionAmount = stats?.allTransactions?.totalTransaction;
  const totalTransactionCount = stats?.allTransactions?.count;

  const sendMoney = stats?.sendMoney?.totalSent;
  const sendCount = stats?.sendMoney?.count;

  const receivedMoney = stats?.receivedMoney?.totalReceived;
  const receivedCount = stats?.receivedMoney?.count;

  const addMoney = stats?.addMoney?.totalCashIn;
  const addCount = stats?.addMoney?.count;

  const withdrawMoney = stats?.withDraw?.totalCashOut;
  const withdrawCount = stats?.withDraw?.count;

  const chartData = [
    { name: "Send", value: sendMoney || 0 },
    { name: "Receive", value: receivedMoney || 0 },
    { name: "Add", value: addMoney || 0 },
    { name: "Withdraw", value: withdrawMoney || 0 },
  ];

  return (
    <div className="overview p-6 space-y-6 w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Balance Card */}
        <Card className="bg-gradient-to-r from-green-500 to-emerald-600 text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wallet className="w-6 h-6" /> Current Balance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{balance?.toFixed(2)} BDT</p>
          </CardContent>
        </Card>
        {/* Transaction Card */}
        <Card className="bg-gradient-to-r from-yellow-500 to-orange-600 text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="w-6 h-6" /> Total Transaction Amount (
              {totalTransactionCount})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {totalTransactionAmount?.toFixed(2)} BDT
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Grid of Transaction Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Send className="w-5 h-5 text-blue-500" /> Send Money
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>Total: ${sendMoney || 0}</p>
            <p>Count: {sendCount || 0}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Download className="w-5 h-5 text-green-500" /> Received Money
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>Total: ${receivedMoney || 0}</p>
            <p>Count: {receivedCount || 0}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ArrowUpCircle className="w-5 h-5 text-purple-500" /> Add Money
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>Total: ${addMoney || 0}</p>
            <p>Count: {addCount || 0}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ArrowDownCircle className="w-5 h-5 text-red-500" /> Withdraw
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>Total: ${withdrawMoney || 0}</p>
            <p>Count: {withdrawCount || 0}</p>
          </CardContent>
        </Card>
      </div>

      {/* Chart Section */}
      <Card>
        <CardHeader>
          <CardTitle>Transaction Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#10b981" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
