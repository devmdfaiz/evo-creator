"use client";
import OrderDataTable from "@/components/dashboard-layout/OrderTableData";
import OrdersCardWrapper from "@/components/dashboard-layout/OrdersCardWrapper";
import { DatePickerWithRange } from "@/components/global/calendar/DatePicker";
import TypographyH1 from "@/components/typography/TypographyH1";
import { DateContext } from "@/context/DateProvider";
import { getOrderData } from "@/lib/fetch/orderData";
import React, { useContext, useEffect, useState } from "react";

const OrderPage = () => {
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

  return (
    <section className="mb-7">
      <div className="flex flex-wrap justify-between items-center">
        <TypographyH1 className="my-7">Orders</TypographyH1>
        <div className="mb-5 sm:my-0">
          <DatePickerWithRange />
        </div>
      </div>
      <OrdersCardWrapper
        currentPeriod={currentPeriodOrders}
        comparisonPeriod={comparisonPeriodOrders}
      />
      <OrderDataTable currentPeriod={currentPeriodOrders} />
    </section>
  );
};

export default OrderPage;
