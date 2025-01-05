import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { StatCard } from "@/components/stat-card";
import { ReviewList } from "@/components/review-list";
import { WordCloud } from "@/components/word-cloud";
import { monthlyReviewData } from "@/lib/constants";
import { TrendingUp } from "lucide-react";

const chartConfig = {
  reviews: {
    label: "Reviews",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

const DashboardOverview = () => {
  return (
    <div className="min-h-screen bg-[#f6f8ff] font-poppins">
      {/* Navigation */}

      <main className="container mx-auto p-4">
        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          <StatCard
            title="Total Reviews"
            value="2,345"
            change="+20%"
            timeframe="from last month"
          />
          <StatCard
            title="Average Rating"
            value="4.3 ★"
            change="+0.2"
            timeframe="from last month"
          />
          <StatCard
            title="Positive Reviews"
            value="78%"
            change="+5%"
            timeframe="from last month"
          />
          <StatCard
            title="Negative Reviews"
            value="12%"
            change="-3%"
            timeframe="from last month"
          />
          <StatCard
            title="Response Rate"
            value="65%"
            change="+15%"
            timeframe="from last month"
          />
        </div>

        {/* Main Content Grid */}
        <div className="mt-6 grid gap-6 lg:grid-cols-6">
          {/* Updated Bar Chart */}
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Monthly Reviews Trend</CardTitle>
              <CardDescription>
                Number of reviews received per month
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig}>
                <BarChart accessibilityLayer data={monthlyReviewData}>
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) => value.slice(0, 3)}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="dashed" />}
                  />
                  <Bar
                    dataKey="reviews"
                    fill="hsl(var(--chart-1))"
                    radius={4}
                  />
                </BarChart>
              </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
              <div className="flex gap-2 font-medium leading-none">
                Trending up by 5.2% this month{" "}
                <TrendingUp className="h-4 w-4" />
              </div>
              <div className="leading-none text-muted-foreground">
                Showing total reviews for the last 12 months
              </div>
            </CardFooter>
          </Card>

          {/* Recent Reviews */}
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle>Recent Reviews</CardTitle>
              <CardDescription>Latest customer feedback</CardDescription>
            </CardHeader>
            <CardContent>
              <ReviewList />
            </CardContent>
          </Card>

          {/* Word Cloud */}
          <Card className="col-span-6">
            <CardHeader>
              <CardTitle>Common Keywords</CardTitle>
              <CardDescription>
                Frequently mentioned words in reviews
              </CardDescription>
            </CardHeader>
            <CardContent>
              <WordCloud />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default DashboardOverview;
