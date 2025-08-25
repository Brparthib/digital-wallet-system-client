import { transactionType } from "@/assets/constants/transactionType";
import TableSkeleton from "@/components/loader/TableSkeleton";
import PaginationButtons from "@/components/PaginationButtons";
import SearchInput from "@/components/SearchInput";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetAllTransactionsQuery } from "@/redux/features/transaction/transaction.api";
import type { ITransaction } from "@/types";
import { useState } from "react";

export default function AllTransactions() {
  const [typeFilter, setTypeFilter] = useState<string>();
  const [currentPage, setCurrentPage] = useState(1);

  const query = { type: typeFilter, page: currentPage, limit: 3 };

  const { data, isLoading } = useGetAllTransactionsQuery(query);

  const totalPage = data?.meta?.totalPage;

  const pages = Array.from({ length: totalPage }, (_, index) => index + 1);

  return (
    <div className="w-full">
      <div className="flex-row space-y-4 md:flex md:space-y-0 justify-between items-center mb-5">
        <h4 className="text-xl font-bold">My Transaction</h4>
        <div>
          <SearchInput />
        </div>
        <div>
          <Select onValueChange={(value) => setTypeFilter(value)}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Select a type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Type</SelectLabel>
                <SelectItem value={transactionType.add}>
                  {transactionType.add}
                </SelectItem>
                <SelectItem value={transactionType.send}>
                  {transactionType.send}
                </SelectItem>
                <SelectItem value={transactionType.withdraw}>
                  {transactionType.withdraw}
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <Table className="border border-muted">
        <TableHeader className="bg-sidebar-accent-foreground dark:bg-sidebar-accent">
          <TableRow>
            <TableHead className="w-[250px]">Transaction ID</TableHead>
            <TableHead>From</TableHead>
            <TableHead>To</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Method</TableHead>
            <TableHead>Agent Commission</TableHead>
            <TableHead>Fee</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableSkeleton columns={8} />
          ) : (
            data?.data?.map((item: ITransaction) => (
              <TableRow key={item._id}>
                <TableCell className="font-medium">
                  {item.transactionId}
                </TableCell>
                <TableCell>{item.fromUser}</TableCell>
                <TableCell>{item.toUser}</TableCell>
                <TableCell>{item.status}</TableCell>
                <TableCell>{item.type}</TableCell>
                <TableCell>{item.commission}</TableCell>
                <TableCell>{item.fee}</TableCell>
                <TableCell className="text-right">৳ {item.amount}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      <PaginationButtons
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        totalPage={totalPage}
        pages={pages}
      />
    </div>
  );
}
