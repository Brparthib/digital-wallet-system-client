import { TableRow, TableCell } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

interface TableSkeletonProps {
  rows?: number;
  columns?: number;
}

export default function TableSkeleton({
  rows = 10,
  columns = 6,
}: TableSkeletonProps) {
  return (
    <>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <TableRow key={rowIndex}>
            <TableCell colSpan={columns}>
              <Skeleton className="w-full h-5 bg-muted rounded-none" />
            </TableCell>
        </TableRow>
      ))}
    </>
  );
}
