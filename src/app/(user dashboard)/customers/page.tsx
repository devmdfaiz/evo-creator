import CustomersDataTable from "@/components/dashboard-layout/CustomersDataTable";
import CustomersOrdersWrapper from "@/components/dashboard-layout/CustomersWrapper";
import { DatePickerWithRange } from "@/components/global/calendar/DatePicker";
import TypographyH1 from "@/components/typography/TypographyH1";
import React from "react";

const Customers = () => {
  return (
    <section className="mb-7">
      <div className="flex flex-wrap justify-between items-center">
        <TypographyH1 className="my-7">Customers</TypographyH1>
        <div className="mb-5 sm:my-0">
          <DatePickerWithRange />
        </div>
      </div>
      <CustomersOrdersWrapper />
      <CustomersDataTable />
    </section>
  );
};

export default Customers;
