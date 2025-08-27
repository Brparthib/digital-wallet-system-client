import { approval } from "@/assets/constants/approval";
import { role } from "@/assets/constants/role";
import TableSkeleton from "@/components/loader/TableSkeleton";
import { UserUpdateDialog } from "@/components/modules/Admin/UserUpdateDialog";
import PaginationButtons from "@/components/PaginationButtons";
import { Badge } from "@/components/ui/badge";
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
import { cn } from "@/lib/utils";
import { useAllUsersQuery } from "@/redux/features/admin/admin.api";
import type { IUser } from "@/types";
import { useState } from "react";

export default function AllUser() {
  const [roleFilter, setRoleFilter] = useState<string>();
  const [currentPage, setCurrentPage] = useState(1);

  const query = { role: roleFilter, page: currentPage, limit: 5 };

  const { data, isLoading } = useAllUsersQuery(query);

  const totalPage = data?.meta?.totalPage;

  const pages = Array.from({ length: totalPage }, (_, index) => index + 1);

  return (
    <div className="w-full">
      <div className="flex-row space-y-4 md:flex md:space-y-0 justify-between items-center mb-5">
        <h4 className="text-xl font-bold">All Users</h4>
        <div>
          <Select onValueChange={(value) => setRoleFilter(value)}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Select a type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Role</SelectLabel>
                <SelectItem value={role.user}>{role.user}</SelectItem>
                <SelectItem value={role.agent}>{role.agent}</SelectItem>
                <SelectItem value={role.admin}>{role.admin}</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <Table className="border border-muted">
        <TableHeader className="bg-sidebar-accent-foreground dark:bg-sidebar-accent">
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Approval</TableHead>
            <TableHead>Claim Role</TableHead>
            <TableHead>CreatedAt</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableSkeleton columns={9} />
          ) : (
            data?.data?.map((item: IUser) => (
              <TableRow key={item._id}>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>{item.phone}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>
                  <Badge
                    className={cn(
                      "px-2 py-1 text-xs font-medium rounded-full",
                      item?.status === "ACTIVE" && "bg-green-500 text-white",
                      item?.status === "INACTIVE" && "bg-yellow-500 text-black",
                      item?.status === "BLOCKED" && "bg-rose-500 text-white"
                    )}
                  >
                    {item?.status}
                  </Badge>
                </TableCell>
                <TableCell>{item.role}</TableCell>
                <TableCell>
                  <Badge
                    className={cn(
                      "px-2 py-1 text-xs font-medium rounded-full",
                      item?.approval === approval.approved &&
                        "bg-green-500 text-white",
                      item?.approval === approval.suspend &&
                        "bg-rose-500 text-white"
                    )}
                  >
                    {item?.approval}
                  </Badge>
                </TableCell>
                <TableCell>{item.claimRole}</TableCell>
                <TableCell>{item.createdAt?.toString()}</TableCell>
                <TableCell className="text-right">
                  <UserUpdateDialog userData={item} />
                </TableCell>
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
