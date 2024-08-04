"use client";
import React, { useContext } from "react";
import SmallCard from "./DashboardCard";
import { DateContext } from "@/context/DateProvider";
import { dashboardGrowthCalculation, getUniquePageIds } from "@/lib/utils/utils";

const OverviewCardsWrapper = ({
  currentPeriod,
  comparisonPeriod,
}: {
  currentPeriod: any[];
  comparisonPeriod: any[];
}) => {

  const { dayGap } = useContext(DateContext);

  const [comparisonPeriodOrderPageId, currentPeriodOrderPageId] =
    getUniquePageIds(currentPeriod, comparisonPeriod);

  const pageOrderGrowth =
    ((currentPeriodOrderPageId.length - comparisonPeriodOrderPageId.length) /
      comparisonPeriodOrderPageId.length) *
    100;

  const {
    currentFilteredOrders,
    currentTotalRevenue,
    orderGrowth,
    revenueGrowth,
    succOrderGrowth,
  } = dashboardGrowthCalculation({
    currentPeriod,
    comparisonPeriod,
  });

  return (
    <div className="flex flex-wrap justify-center gap-5">
      <SmallCard
        title="Total Orders"
        goal={currentPeriod?.length}
        desc={`${parseInt(JSON.stringify(orderGrowth))}% from last ${
          Number.isNaN(dayGap) ? 0 : dayGap
        } days`}
      />
      <SmallCard
        title="Total Revenue"
        goal={`₹${currentTotalRevenue}`}
        desc={`${parseInt(JSON.stringify(revenueGrowth))}% from last ${
          Number.isNaN(dayGap) ? 0 : dayGap
        } days`}
      />
      <SmallCard
        title="Sales Growth"
        goal={`${parseInt(JSON.stringify(revenueGrowth))}%`}
        desc={`${parseInt(JSON.stringify(revenueGrowth))}% from last ${
          Number.isNaN(dayGap) ? 0 : dayGap
        } days`}
      />
      <SmallCard
        title="Page Sold"
        goal={currentPeriodOrderPageId.length}
        desc={`${parseInt(JSON.stringify(pageOrderGrowth))}% from last ${
          Number.isNaN(dayGap) ? 0 : dayGap
        } days`}
      />
      <SmallCard
        title="Total Customers"
        goal={currentFilteredOrders?.length}
        desc={`${parseInt(JSON.stringify(succOrderGrowth))}% from last ${
          Number.isNaN(dayGap) ? 0 : dayGap
        } days`}
      />
    </div>
  );
};

export default OverviewCardsWrapper;
