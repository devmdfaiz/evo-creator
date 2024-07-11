"use client";
import OverviewCardsWrapper from "@/components/dashboard-layout/OverviewCardsWrapper";
import { DatePickerWithRange } from "@/components/global/calendar/DatePicker";
import PageSpinner from "@/components/global/spinner/PageSpinner";
import TypographyH1 from "@/components/typography/TypographyH1";
import { DateContext } from "@/context/DateProvider";
import { getOrderData } from "@/lib/fetch/orderData";
import { useContext, useEffect, useState } from "react";

import Link from "next/link";
import { TrendingUp } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { format, parseISO } from "date-fns";

const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
];
const chartConfig = {
  date: {
    label: "Date",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;

const aggregateAmountsByDate = (orders: any[]) => {
  const amountsByDate: { [key: string]: number } = {};

  orders.forEach(order => {
    if (order.isPaid) {
      const date = order.createdAt.split('T')[0];
      if (!amountsByDate[date]) {
        amountsByDate[date] = 0;
      }
      amountsByDate[date] += order.amount;
    }
  });

  return Object.keys(amountsByDate).map(date => ({
    Amount: amountsByDate[date],
    date: date
  }));
};

// React component
const OverviewPage = () => {
  const [currentPeriodOrders, setCurrentPeriodOrders] = useState([]);
  const [comparisonPeriodOrders, setComparisonPeriodOrders] = useState([]);
  const { fromDate, toDate, dayGap, date } = useContext(DateContext);

  useEffect(() => {
    getOrderData({
      fromDate,
      toDate,
      dayGap,
      date,
      setCurrentPeriodOrders,
      setComparisonPeriodOrders,
    });
  }, [date]);

  const chartData = aggregateAmountsByDate(currentPeriodOrders);
  

  if (currentPeriodOrders.length === 0 || comparisonPeriodOrders.length === 0) {
    return <PageSpinner className="pt-[50vh]" />;
  }

  return (
    <section className="mb-7">
      <div className="flex flex-wrap justify-between items-center">
        <TypographyH1 className="my-7">Overview</TypographyH1>
        <div className="mb-5 sm:my-0">
          <DatePickerWithRange />
        </div>
      </div>
      <OverviewCardsWrapper
        currentPeriod={currentPeriodOrders}
        comparisonPeriod={comparisonPeriodOrders}
      />

      <div className="w-full flex mt-6 gap-x-6 justify-center items-start flex-wrap ">
        {/* Chart */}
        <Card className="grow">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
            <CardDescription>
              {format(fromDate, "dd-MMMM-yyyy")} to{" "}
              {format(toDate, "dd-MMMM-yyyy")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[340px] w-full">
              <BarChart
                accessibilityLayer
                data={chartData}
                margin={{
                  top: 20,
                }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => {
                    const parsedDate = parseISO(value);
                    const formattedDate = format(parsedDate, "dd-MMMM-yyyy");
                    return formattedDate;
                  }}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Bar dataKey="Amount" fill="var(--color-date)" radius={8}>
                  <LabelList
                    position="top"
                    offset={12}
                    className="fill-foreground"
                    fontSize={12}
                  />
                </Bar>
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* sales */}
        <Card
          x-chunk="dashboard-01-chunk-5"
          className="mt-6 lg:mt-0 grow lg:grow-0"
        >
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-8">
            {currentPeriodOrders
              .slice(0, 5)
              .map((currentPeriodOrder: any, i: number) => {
                const fallbackNameArr =
                  currentPeriodOrder.customerInfo["Full Name"].split(" ");
                const fallbackName1 = fallbackNameArr[0].slice(0, 1);
                const fallbackName2 = fallbackNameArr[1].slice(0, 1);
                return (
                  <div className="flex items-center gap-4" key={i}>
                    <Avatar className="hidden h-9 w-9 sm:flex">
                      <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="Avatar"
                      />
                      <AvatarFallback>
                        {fallbackName1}
                        {fallbackName2}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                      <p className="text-sm font-medium leading-none">
                        {currentPeriodOrder.customerInfo["Full Name"]}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {currentPeriodOrder.customerInfo["Email"]}
                      </p>
                    </div>
                    <div className="ml-auto font-medium">
                      +₹{currentPeriodOrder.amount}.00
                    </div>
                  </div>
                );
              })}
          </CardContent>
          <CardFooter>
            <div className="w-full flex justify-center items-center">
              <Link href="/orders" className="hover:text-primary">
                Show all
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
};

export default OverviewPage;
