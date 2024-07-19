"use client";
import { useContext } from "react";
import { DateContext } from "@/context/DateProvider";
import { dashboardGrowthCalculation } from "@/lib/utils/utils";
import DashboardCard from "./DashboardCard";

const CustomersOrdersWrapper = ({
  currentPeriod,
  comparisonPeriod,
}: {
  currentPeriod: any[];
  comparisonPeriod: any[];
}) => {
  const { dayGap } = useContext(DateContext);

  const {
    currentFilteredOrders,
    currentTotalRevenue,
    revenueGrowth,
    succOrderGrowth,
  } = dashboardGrowthCalculation({
    currentPeriod,
    comparisonPeriod,
  });

  return (
    <div className="flex flex-wrap justify-center gap-5">
      <DashboardCard
        title="Total Customers"
        goal={currentFilteredOrders?.length}
        desc={`${parseInt(JSON.stringify(succOrderGrowth))}% from last ${
          Number.isNaN(dayGap) ? 0 : dayGap
        } days`}
      />
      <DashboardCard
        title="Total Revenue"
        goal={`₹${currentTotalRevenue}`}
        desc={`${parseInt(JSON.stringify(revenueGrowth))}% from last ${
          Number.isNaN(dayGap) ? 0 : dayGap
        } days`}
      />
    </div>
  );
};

export default CustomersOrdersWrapper;
