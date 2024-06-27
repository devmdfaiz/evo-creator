"use client";
import { useContext } from "react";
import SmallCard from "./Card";
import { DateContext } from "@/context/DateProvider";

export function growthCalculation({
  currentPeriod,
  comparisonPeriod,
}: {
  currentPeriod: any[];
  comparisonPeriod: any[];
}) {
  //Current calculation
  let currentTotalRevenue = 0;

  const currentFilteredOrders = currentPeriod?.filter((data) => {
    return data?.isPaid === true;
  });

  for (const filteredOrder of currentFilteredOrders) {
    currentTotalRevenue += parseFloat(filteredOrder?.amount);
  }

  const currentOrderCount = currentPeriod?.length;

  // Comparison calculation
  let comparisonTotalRevenue = 0;

  const comparisonFilteredOrders = comparisonPeriod?.filter((data) => {
    return data?.isPaid === true;
  });

  for (const filteredOrder of comparisonFilteredOrders) {
    comparisonTotalRevenue += parseFloat(filteredOrder?.amount);
  }
  const comparisonOrderCount = comparisonPeriod?.length;

  const currentRevenueTotalCount = currentTotalRevenue;
  const comparisonRevenueTotalCount = comparisonTotalRevenue;

  // % calculations
  const revenueGrowth =
    comparisonOrderCount === 0
      ? 0 // Avoid division by zero
      : ((currentRevenueTotalCount - comparisonRevenueTotalCount) /
          comparisonRevenueTotalCount) *
        100;

  const orderGrowth =
    comparisonOrderCount === 0
      ? 0 // Avoid division by zero
      : ((currentOrderCount - comparisonOrderCount) / comparisonOrderCount) *
        100;

  const succOrderGrowth =
    currentFilteredOrders.length === 0
      ? 0 // Avoid division by zero
      : ((currentFilteredOrders?.length - comparisonFilteredOrders?.length) /
          comparisonFilteredOrders?.length) *
        100;

  const faildOrderGrowth =
    currentFilteredOrders.length === 0
      ? 0 // Avoid division by zero
      : ((currentPeriod.length -
          currentFilteredOrders.length -
          (comparisonPeriod?.length - comparisonFilteredOrders?.length)) /
          (comparisonPeriod?.length - comparisonFilteredOrders?.length)) *
        100;

  return {
    orderGrowth,
    currentTotalRevenue,
    revenueGrowth,
    currentFilteredOrders,
    succOrderGrowth,
    faildOrderGrowth,
  };
}

const OrdersCardWrapper = ({
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
        title="Total Success Order"
        goal={currentFilteredOrders?.length}
        desc={`${parseInt(JSON.stringify(succOrderGrowth))}% from last ${
          Number.isNaN(dayGap) ? 0 : dayGap
        } days`}
      />
      <SmallCard
        title="Total Faild Order"
        goal={currentPeriod?.length - currentFilteredOrders?.length}
        desc={`${parseInt(JSON.stringify(faildOrderGrowth))}% from last ${
          Number.isNaN(dayGap) ? 0 : dayGap
        } days`}
      />
    </div>
  );
};

export default OrdersCardWrapper;
