"use client";
import React, { useContext, useState } from "react";
import SmallCard from "./Card";
import { growthCalculation } from "./OrdersCardWrapper";
import { DateContext } from "@/context/DateProvider";

const getUniquePageIds = (
  currentPeriodOrder: any[],
  comparisonPeriodOrder: any[]
): any[] => {
  const currentPeriodOrderMap = currentPeriodOrder.map((order) => order.pageId);
  const currentPeriodOrderPageId = Array.from(new Set(currentPeriodOrderMap));

  const comparisonPeriodOrderMap = comparisonPeriodOrder.map(
    (order) => order.pageId
  );
  const comparisonPeriodOrderPageId = Array.from(
    new Set(comparisonPeriodOrderMap)
  );

  return [comparisonPeriodOrderPageId, currentPeriodOrderPageId];
};

const OverviewCardsWrapper = ({
  currentPeriod,
  comparisonPeriod,
}: {
  currentPeriod: any[];
  comparisonPeriod: any[];
}) => {

  const { fromDate, toDate, dayGap, date } = useContext(DateContext);

  const [comparisonPeriodOrderPageId, currentPeriodOrderPageId] =
    getUniquePageIds(currentPeriod, comparisonPeriod);

  const pageOrderGrowth =
    ((currentPeriodOrderPageId.length - comparisonPeriodOrderPageId.length) /
      comparisonPeriodOrderPageId.length) *
    100;

  const {
    currentFilteredOrders,
    currentTotalRevenue,
    faildOrderGrowth,
    orderGrowth,
    revenueGrowth,
    succOrderGrowth,
  } = growthCalculation({
    currentPeriod,
    comparisonPeriod,
  });

  return (
    <div className="flex flex-wrap justify-center gap-5">
      <SmallCard
        title="Total Sales"
        goal={currentPeriod?.length}
        desc={`${parseInt(JSON.stringify(orderGrowth))}% from last ${
          Number.isNaN(dayGap) ? 0 : dayGap
        } days`}
        data={currentPeriod}
        key="value"
      />
      <SmallCard
        title="Total Revenue"
        goal={`₹${currentTotalRevenue}`}
        desc={`${parseInt(JSON.stringify(revenueGrowth))}% from last ${
          Number.isNaN(dayGap) ? 0 : dayGap
        } days`}
        data={currentPeriod}
        key="value"
      />
      <SmallCard
        title="Sales Growth"
        goal={`${parseInt(JSON.stringify(revenueGrowth))}%`}
        desc={`${parseInt(JSON.stringify(revenueGrowth))}% from last ${
          Number.isNaN(dayGap) ? 0 : dayGap
        } days`}
        data={currentPeriod}
        key="value"
      />
      <SmallCard
        title="Page Sold"
        goal={currentPeriodOrderPageId.length}
        desc={`${parseInt(JSON.stringify(pageOrderGrowth))}% from last ${
          Number.isNaN(dayGap) ? 0 : dayGap
        } days`}
        data={currentPeriod}
        key="value"
      />
      <SmallCard
        title="Total Customers"
        goal={currentFilteredOrders?.length}
        desc={`${parseInt(JSON.stringify(succOrderGrowth))}% from last ${
          Number.isNaN(dayGap) ? 0 : dayGap
        } days`}
        data={currentPeriod}
        key="value"
      />
    </div>
  );
};

export default OverviewCardsWrapper;
