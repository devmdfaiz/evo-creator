"use client";
import CustomersDataTable from "@/components/dashboard-layout/CustomersDataTable";
import CustomersOrdersWrapper from "@/components/dashboard-layout/CustomersWrapper";
import { DatePickerWithRange } from "@/components/global/calendar/DatePicker";
import TypographyH1 from "@/components/typography/TypographyH1";
import { DateContext } from "@/context/DateProvider";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { dummyDataAndFileGen } from "@/lib/faker/index";

const Customers = () => {
  const [currentPeriodOrders, setCurrentPeriodOrders] = useState([]);
  const [comparisonPeriodOrders, setComparisonPeriodOrders] = useState([]);
  const { fromDate, toDate, dayGap } = useContext(DateContext);

  useEffect(() => {
    axios.post("/api/order/order-data", { fromDate, toDate, dayGap }).then((res) => {
      const { data, status } = res;
      if (status === 200) {
        setCurrentPeriodOrders(data.orders[0].currentPeriod);
        setComparisonPeriodOrders(data.orders[0].comparisonPeriod)
      }
    });
  }, [dayGap]);

  // dummyDataAndFileGen();

  return (
    <section className="mb-7">
      <div className="flex flex-wrap justify-between items-center">
        <TypographyH1 className="my-7">Customers</TypographyH1>
        <div className="mb-5 sm:my-0">
          <DatePickerWithRange />
        </div>
      </div>
      <CustomersOrdersWrapper currentPeriod={currentPeriodOrders} comparisonPeriod={comparisonPeriodOrders}/>
      <CustomersDataTable currentPeriod={currentPeriodOrders} />
    </section>
  );
};

export default Customers;
