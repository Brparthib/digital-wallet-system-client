import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function OverviewLoading() {
  return (
    <div className="overview p-6 space-y-6 w-full">
      {/* Balance + Total Transaction */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Skeleton className="h-6 w-6 rounded-full bg-white/40" />
              <Skeleton className="h-5 w-32 bg-white/40" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Skeleton className="h-8 w-40 bg-white/40" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Skeleton className="h-6 w-6 rounded-full bg-white/40" />
              <Skeleton className="h-5 w-48 bg-white/40" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Skeleton className="h-8 w-40 bg-white/40" />
          </CardContent>
        </Card>
      </div>

      {/* 4 Transaction Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Skeleton className="h-5 w-5 rounded-full" />
                <Skeleton className="h-5 w-28" />
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-16" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Chart Section */}
      <Card>
        <CardHeader>
          <CardTitle>
            <Skeleton className="h-6 w-40" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full flex items-center justify-center">
            <Skeleton className="h-[250px] w-full rounded-lg" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
