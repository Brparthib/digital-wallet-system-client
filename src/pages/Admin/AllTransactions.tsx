import TableSkeleton from "@/components/loader/TableSkeleton";
import PaginationButtons from "@/components/PaginationButtons";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
import { addCountryCode } from "@/utils/addCountryCode";

const searchFields = ["transactionId", "type", "status", "fromUser", "toUser"];

export default function AllTransactions() {
  const [currentPage, setCurrentPage] = useState(1);

  // search state
  const [searchField, setSearchField] = useState<string>("transactionId");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [appliedSearch, setAppliedSearch] = useState<{
    field: string;
    value: string;
  }>();

  if (appliedSearch?.field === "type" || appliedSearch?.field === "status") {
    appliedSearch.value = appliedSearch.value.toUpperCase();
  }

  if (
    appliedSearch?.field === "fromUser" ||
    appliedSearch?.field === "toUser"
  ) {
    appliedSearch.value = addCountryCode(appliedSearch.value, "BD") as string;
  }

  const query = {
    ...(appliedSearch ? { [appliedSearch.field]: appliedSearch.value } : {}),
    page: currentPage,
    limit: 3,
  };

  const { data, isLoading } = useGetAllTransactionsQuery(query);

  const totalPage = data?.meta?.totalPage || 1;
  const pages = Array.from({ length: totalPage }, (_, index) => index + 1);

  const handleSearch = () => {
    if (searchTerm.trim()) {
      setAppliedSearch({ field: searchField, value: searchTerm.trim() });
      setCurrentPage(1);
      console.log(appliedSearch?.value);
    } else {
      setAppliedSearch(undefined);
    }
  };

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-5">
        <h4 className="text-xl font-bold">All Transactions</h4>

        <div className="space-y-4 sm:space-y-0 sm:flex gap-2 justify-end">
          {/* category select */}
          <div>
            <Select
              onValueChange={(value) => setSearchField(value)}
              value={searchField}
            >
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Select field" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Search by</SelectLabel>
                  {searchFields.map((field) => (
                    <SelectItem key={field} value={field}>
                      {field}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* search input */}
          <div className="flex items-center gap-2">
            <Input
              placeholder={`Search ${searchField}`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="md:w-[300px]"
            />

            <Button onClick={handleSearch} className="cursor-pointer">
              Search
            </Button>
          </div>
        </div>
      </div>

      <Table className="border border-muted">
        <TableHeader className="bg-sidebar-accent-foreground dark:bg-sidebar-accent">
          <TableRow>
            <TableHead className="w-[250px]">Transaction ID</TableHead>
            <TableHead>From</TableHead>
            <TableHead>To</TableHead>
            <TableHead>Method</TableHead>
            <TableHead>Status</TableHead>
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
                <TableCell>{item.type}</TableCell>
                <TableCell>{item.status}</TableCell>
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
