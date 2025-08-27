import { Card, CardHeader,  CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
// import { Avatar } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

export default function ProfileLoading() {
  return (
    <div className="profile container mx-auto p-6">
      <Card className="bg-background text-foreground p-0">
        {/* Header with Avatar + Name */}
        <CardHeader className="bg-muted/50 dark:bg-muted/30 py-6">
          <div className="flex items-center space-x-4">
            <Skeleton className="h-24 w-24 rounded-full border-4 border-background shadow-md bg-primary/20" />
            <div className="space-y-2">
              <Skeleton className="h-6 w-40 bg-primary/20" />
              <Skeleton className="h-4 w-64 bg-secondary/20" />
            </div>
          </div>
        </CardHeader>

        {/* Content */}
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          {/* Left Column: Profile Details Skeleton */}
          <div className="space-y-4">
            <Skeleton className="h-5 w-32 bg-primary/20" />
            <Separator />
            <div className="space-y-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex items-center space-x-3">
                  <Skeleton className="h-5 w-5 rounded-full bg-secondary/30" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-20 bg-muted/40" />
                    <Skeleton className="h-4 w-32 bg-muted/40" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Editable Form Skeleton */}
          <div className="space-y-4">
            <Skeleton className="h-5 w-28 bg-primary/20" />
            <Separator />
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-4 w-24 bg-muted/40" />
                  <Skeleton className="h-10 w-full rounded-md bg-secondary/20" />
                </div>
              ))}
            </div>
            <CardFooter className="flex justify-end pt-6 px-0">
              <Skeleton className="h-10 w-32 rounded-lg bg-primary/40" />
            </CardFooter>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
