"use client";
import CustomersDataTable from "@/components/dashboard-layout/CustomersDataTable";
import CustomersOrdersWrapper from "@/components/dashboard-layout/CustomersWrapper";
import { DatePickerWithRange } from "@/components/global/calendar/DatePicker";
import TypographyH1 from "@/components/typography/TypographyH1";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Customers = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get("/api/order/data").then((res) => {
      const { data, status } = res;
      if (status === 200) {
        setOrders(data.orders);
      }
    });
  }, []);

  return (
    <section className="mb-7">
      <div className="flex flex-wrap justify-between items-center">
        <TypographyH1 className="my-7">Customers</TypographyH1>
        <div className="mb-5 sm:my-0">
          <DatePickerWithRange />
        </div>
      </div>
      <CustomersOrdersWrapper orders={orders} />
      <CustomersDataTable orders={orders} />
    </section>
  );
};

export default Customers;
