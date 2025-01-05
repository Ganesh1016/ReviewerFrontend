import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowDown, ArrowUp } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  timeframe: string;
  trendDirection?: "up" | "down";
}

export function StatCard({
  title,
  value,
  change,
  timeframe,
  trendDirection,
}: StatCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {trendDirection && (
          <div
            className={cn(
              "rounded-full p-1",
              trendDirection === "up"
                ? "bg-green-100 text-green-600"
                : "bg-red-100 text-red-600"
            )}
          >
            {trendDirection === "up" ? (
              <ArrowUp className="h-4 w-4" />
            ) : (
              <ArrowDown className="h-4 w-4" />
            )}
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-[#100b00]">{value}</div>
        <p className="text-xs text-muted-foreground">
          <span
            className={cn(
              change.startsWith("+") ? "text-green-600" : "text-red-600"
            )}
          >
            {change}
          </span>{" "}
          {timeframe}
        </p>
      </CardContent>
    </Card>
  );
}
