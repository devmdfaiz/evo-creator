import OrderDataTable from "@/components/dashboard-layout/OrderTableData";
import OrdersCardWrapper from "@/components/dashboard-layout/OrdersCardWrapper";
import { DatePickerWithRange } from "@/components/global/calendar/DatePicker";
import TypographyH1 from "@/components/typography/TypographyH1";
import React from "react";

const OrderPage = () => {
  return (
    <section className="mb-7">
      <div className="flex flex-wrap justify-between items-center">
        <TypographyH1 className="my-7">Orders</TypographyH1>
        <div className="mb-5 sm:my-0">
          <DatePickerWithRange />
        </div>
      </div>
      <OrdersCardWrapper />
      <OrderDataTable />
    </section>
  );
};

export default OrderPage;
