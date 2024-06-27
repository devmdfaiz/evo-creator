"use client";
import { useContext } from "react";
import SmallCard from "./Card";
import { growthCalculation } from "./OrdersCardWrapper";
import { DateContext } from "@/context/DateProvider";

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
  } = growthCalculation({
    currentPeriod,
    comparisonPeriod,
  });

  return (
    <div className="flex flex-wrap justify-center gap-5">
      <SmallCard
        title="Total Customers"
        goal={currentFilteredOrders?.length}
        desc={`${parseInt(JSON.stringify(succOrderGrowth))}% from last ${
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
    </div>
  );
};

export default CustomersOrdersWrapper;
