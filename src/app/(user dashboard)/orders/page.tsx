"use client"
import OrderDataTable from "@/components/dashboard-layout/OrderTableData";
import OrdersCardWrapper from "@/components/dashboard-layout/OrdersCardWrapper";
import { DatePickerWithRange } from "@/components/global/calendar/DatePicker";
import TypographyH1 from "@/components/typography/TypographyH1";
import axios from "axios";
import React, { useEffect, useState } from "react";

const OrderPage = () => {
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
        <TypographyH1 className="my-7">Orders</TypographyH1>
        <div className="mb-5 sm:my-0">
          <DatePickerWithRange />
        </div>
      </div>
      <OrdersCardWrapper orders={orders} />
      <OrderDataTable orders={orders} />
    </section>
  );
};

export default OrderPage;
