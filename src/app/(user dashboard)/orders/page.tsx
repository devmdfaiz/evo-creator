"use client";
import OrdersCardWrapper from "@/components/dashboard-components/OrdersCardWrapper";
import OrderDataTable from "@/components/dashboard-components/OrderTableData";
import { DatePickerWithRange } from "@/components/global/calendar/DatePicker";
import MainComponentsWrapper from "@/components/global/wrapper/MainComponentsWrapper";
import ButtonSpinner from "@/components/global/spinner/ButtonSpinner";
import PageSpinner from "@/components/global/spinner/PageSpinner";
import TypographyH1 from "@/components/typography/TypographyH1";
import { DateContext } from "@/context/DateProvider";
import { getDashboardOrderData } from "@/lib/fetch/fetch";
import React, { useContext, useMemo, useState } from "react";
import AccountBlockInfo from "@/components/info/AccountBlockInfo";

const OrderPage = () => {
  const [currentPeriodOrders, setCurrentPeriodOrders] = useState(["nothing"]);
  const [comparisonPeriodOrders, setComparisonPeriodOrders] = useState([
    "nothing",
  ]);
  const [accountStatus, setAccountStatus] = useState<"BLOCKED" | "ACTIVE">(
    "ACTIVE"
  );
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
      setAccountStatus,
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
    <MainComponentsWrapper>
      <AccountBlockInfo accountStatus={accountStatus} />
      <div className="flex flex-wrap justify-between items-center">
        <TypographyH1 className="my-7">Orders</TypographyH1>
        <div className="mb-5 sm:my-0">
          <div className="flex gap-2 items-center justify-center">
            {isOrdersLoading && <ButtonSpinner className="w-5 h-5" />}
            <DatePickerWithRange />
          </div>
        </div>
      </div>
      <OrdersCardWrapper
        currentPeriod={currentPeriodOrders}
        comparisonPeriod={comparisonPeriodOrders}
      />
      <OrderDataTable currentPeriod={currentPeriodOrders} />
    </MainComponentsWrapper>
  );
};

export default OrderPage;
