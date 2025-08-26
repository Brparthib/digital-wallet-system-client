import { transactionType } from "@/assets/constants/transactionType";
import TableSkeleton from "@/components/loader/TableSkeleton";
import PaginationButtons from "@/components/PaginationButtons";
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
import { useGetTransactionsQuery } from "@/redux/features/transaction/transaction.api";
import type { ITransaction } from "@/types";
import { useState } from "react";

export default function UserTransaction() {
  const [typeFilter, setTypeFilter] = useState<string>();
  const [currentPage, setCurrentPage] = useState(1);

  const query = { type: typeFilter, page: currentPage, limit: 3 };

  const { data, isLoading } = useGetTransactionsQuery(query);

  const totalPage = data?.meta?.totalPage;

  const pages = Array.from({ length: totalPage }, (_, index) => index + 1);

  return (
    <div className="w-full p-6">
      <div className="flex justify-between items-center mb-5">
        <h4 className="text-xl font-bold">My Transaction</h4>
        <div>
          <Select onValueChange={(value) => setTypeFilter(value)}>
            <SelectTrigger className="w-[180px]">
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
            <TableHead className="w-[250px]">Transaction</TableHead>
            <TableHead>From</TableHead>
            <TableHead>To</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Method</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableSkeleton columns={6} />
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
      {/* {totalPage > 1 && (
        <div className="mt-5 flex justify-end">
          <div>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => setCurrentPage((prev) => prev - 1)}
                    className={
                      currentPage <= 1
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer"
                    }
                  />
                </PaginationItem>
                {pages.map((page) => (
                  <PaginationItem
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className="cursor-pointer"
                  >
                    <PaginationLink isActive={currentPage === page}>
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                    className={
                      currentPage >= totalPage
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer"
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      )} */}
    </div>
  );
}
