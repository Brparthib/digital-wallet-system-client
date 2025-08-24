import TableSkeleton from "@/components/loader/TableSkeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetTransactionsQuery } from "@/redux/features/transaction/transaction.api";
import type { ITransaction } from "@/types";

export default function AgentTransaction() {
  const { data, isLoading } = useGetTransactionsQuery(undefined);
  console.log(data?.data);

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-5">
        <h4 className="text-xl font-bold">My Transaction</h4>
      </div>
      <Table className="border border-muted">
        <TableHeader className="bg-sidebar-accent-foreground dark:bg-sidebar-accent">
          <TableRow>
            <TableHead className="w-[250px]">Transaction</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Method</TableHead>
            <TableHead>Commission</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableSkeleton rows={5} columns={4} />
          ) : (
            data?.data?.map((item: ITransaction) => (
              <TableRow key={item._id}>
                <TableCell className="font-medium">
                  {item.transactionId}
                </TableCell>
                <TableCell>{item.status}</TableCell>
                <TableCell>{item.type}</TableCell>
                <TableCell>{item.commission}</TableCell>
                <TableCell className="text-right">৳ {item.amount}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
