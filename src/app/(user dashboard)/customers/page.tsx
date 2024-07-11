"use client";
import CustomersDataTable from "@/components/dashboard-layout/CustomersDataTable";
import CustomersOrdersWrapper from "@/components/dashboard-layout/CustomersWrapper";
import { DatePickerWithRange } from "@/components/global/calendar/DatePicker";
import PageSpinner from "@/components/global/spinner/PageSpinner";
import NothingInfo from "@/components/info/NothingInfo";
import TypographyH1 from "@/components/typography/TypographyH1";
import TypographyMuted from "@/components/typography/TypographyMuted";
import { Button } from "@/components/ui/button";
import { DateContext } from "@/context/DateProvider";
import { getOrderData } from "@/lib/fetch/orderData";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";

const Customers = () => {
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

  console.log(
    "currentPeriodOrders",
    currentPeriodOrders,
    "comparisonPeriodOrders",
    comparisonPeriodOrders
  );

  if(currentPeriodOrders.length === 0 || comparisonPeriodOrders.length === 0){
    return <PageSpinner className="mt-[50vh]" />
  }

  return (
    <section className="mb-7">
      <div className="flex flex-wrap justify-between items-center">
        <TypographyH1 className="my-7">Customers</TypographyH1>
        <div className="mb-5 sm:my-0">
          <DatePickerWithRange />
        </div>
      </div>
      <CustomersOrdersWrapper
        currentPeriod={currentPeriodOrders}
        comparisonPeriod={comparisonPeriodOrders}
      />
      <CustomersDataTable currentPeriod={currentPeriodOrders} />
    </section>
  );
};

export default Customers;
