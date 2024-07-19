"use client";
import OverviewCardsWrapper from "@/components/dashboard-layout/OverviewCardsWrapper";
import { DatePickerWithRange } from "@/components/global/calendar/DatePicker";
import PageSpinner from "@/components/global/spinner/PageSpinner";
import TypographyH1 from "@/components/typography/TypographyH1";
import { DateContext } from "@/context/DateProvider";
import { useContext, useEffect, useMemo, useState } from "react";

import Link from "next/link";

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
import { getDashboardOrderData } from "@/lib/fetch/fetch";
import { aggregateAmountsByDate } from "@/lib/utils/utils";
import ButtonSpinner from "@/components/global/spinner/ButtonSpinner";
import TypographyP from "@/components/typography/TypographyP";

const chartConfig = {
  date: {
    label: "Date",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;

// React component
const OverviewPage = () => {
  const [currentPeriodOrders, setCurrentPeriodOrders] = useState(["nothing"]);
  const [comparisonPeriodOrders, setComparisonPeriodOrders] = useState([
    "nothing",
  ]);
  const [isOrdersLoading, setIsOrdersLoading] = useState(false);
  const { fromDate, toDate, dayGap, date } = useContext(DateContext);

  useMemo(() => {
    setIsOrdersLoading(true);
    getDashboardOrderData({
      fromDate,
      toDate,
      dayGap,
      date,
      setCurrentPeriodOrders,
      setComparisonPeriodOrders,
    }).then(() => {
      setIsOrdersLoading(false);
    });
  }, [date]);

  const chartData = aggregateAmountsByDate(currentPeriodOrders);

  if (
    currentPeriodOrders[0] === "nothing" ||
    comparisonPeriodOrders[0] === "nothing"
  ) {
    return <PageSpinner className="pt-[50vh]" />;
  }

  return (
    <section className="mb-7">
      <div className="flex flex-wrap justify-between items-center">
        <TypographyH1 className="my-7">Overview</TypographyH1>
        <div className="mb-5 sm:my-0">
          <div className="flex gap-2 items-center justify-center">
            {isOrdersLoading && <ButtonSpinner className="w-5 h-5" />}
            <DatePickerWithRange />
          </div>
        </div>
      </div>
      <OverviewCardsWrapper
        currentPeriod={currentPeriodOrders}
        comparisonPeriod={comparisonPeriodOrders}
      />

      <div className="w-full h-fit flex mt-6 gap-x-6 justify-center items-start flex-wrap ">
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
            {currentPeriodOrders.length > 0 ? (
              <ChartContainer
                config={chartConfig}
                className="md:h-[340px] w-full"
              >
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
            ) : (
              <div className="w-full h-[340px] flex items-center justify-center">
                <TypographyP>Nothing to show</TypographyP>
              </div>
            )}
          </CardContent>
        </Card>

        {/* sales */}
        <Card
          x-chunk="dashboard-01-chunk-5"
          className={`mt-6 lg:mt-0 hidden xl:block h-full grow-[0.1]`}
        >
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-8">
            {currentPeriodOrders.length > 0 ? (
              currentPeriodOrders
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
                })
            ) : (
              <div className="w-full h-[340px] flex items-center justify-center">
                <TypographyP>Nothing to show</TypographyP>
              </div>
            )}
          </CardContent>
          {currentPeriodOrders.length > 0 && (
            <CardFooter>
              <div className="w-full flex justify-center items-center">
                <Link href="/orders" className="hover:text-primary">
                  Show all
                </Link>
              </div>
            </CardFooter>
          )}
        </Card>
      </div>
    </section>
  );
};

export default OverviewPage;
