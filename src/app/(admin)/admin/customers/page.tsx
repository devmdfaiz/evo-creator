"use client";
import CustomersDataTable from "@/components/dashboard-components/CustomersDataTable";
import CustomersOrdersWrapper from "@/components/dashboard-components/CustomersWrapper";
import { DatePickerWithRange } from "@/components/global/calendar/DatePicker";
import MainComponentsWrapper, { AdminMainComponentsWrapper } from "@/components/global/wrapper/MainComponentsWrapper";
import ButtonSpinner from "@/components/global/spinner/ButtonSpinner";
import PageSpinner from "@/components/global/spinner/PageSpinner";
import TypographyH1 from "@/components/typography/TypographyH1";
import { DateContext } from "@/context/DateProvider";
import React, { useContext, useMemo, useState } from "react";
import { getAdminOrderData } from "@/lib/fetch/adminFetch";

const Customers = () => {
  const [currentPeriodOrders, setCurrentPeriodOrders] = useState(["nothing"]);
  const [comparisonPeriodOrders, setComparisonPeriodOrders] = useState([
    "nothing",
  ]);
  const [isOrdersLoading, setIsOrdersLoading] = useState(false);
  const { fromDate, toDate, dayGap, date } = useContext(DateContext);

  useMemo(() => {
    setIsOrdersLoading(true);
    getAdminOrderData({
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

  if (
    currentPeriodOrders[0] === "nothing" ||
    comparisonPeriodOrders[0] === "nothing"
  ) {
    return <PageSpinner />;
  }

  return (
    <AdminMainComponentsWrapper>
      <div className="flex flex-wrap justify-between items-center">
        <TypographyH1 className="my-7">Customers</TypographyH1>
        <div className="mb-5 sm:my-0">
          <div className="flex gap-2 items-center justify-center">
            {isOrdersLoading && <ButtonSpinner className="w-5 h-5" />}
            <DatePickerWithRange />
          </div>
        </div>
      </div>
      <CustomersOrdersWrapper
        currentPeriod={currentPeriodOrders}
        comparisonPeriod={comparisonPeriodOrders}
      />
      <CustomersDataTable currentPeriod={currentPeriodOrders} />
    </AdminMainComponentsWrapper>
  );
};

export default Customers;
