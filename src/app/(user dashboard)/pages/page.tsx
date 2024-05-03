"use client";
import PageCardWrapper from "@/components/dashboard-layout/PageCardWrapper";
import PagesTableData from "@/components/dashboard-layout/PagesTableData";
import { DatePickerWithRange } from "@/components/global/calendar/DatePicker";
import TypographyH1 from "@/components/typography/TypographyH1";
import { DateContext } from "@/context/DateProvider";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import axios from "axios";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";

const Pages = () => {
  const [pages, setPages] = useState([]);
  const { fromDate, toDate } = useContext(DateContext);

  useEffect(() => {
    axios.post(`/api/page`, { fromDate, toDate }).then((res) => {
      const {
        data: { pages },
      } = res;
      setPages(pages);
    });
  }, [fromDate, toDate]);

  return (
    <section className="mb-7">
      <div className="flex flex-wrap justify-between items-center">
        <TypographyH1 className="my-7">All Pages</TypographyH1>
        <div className="flex justify-start items-center flex-wrap gap-5 mb-5 sm:my-0">
          <DatePickerWithRange />
          <Link
            href="/payment-page/create"
            className="flex justify-center items-center bg-primary py-1 px-4 rounded-sm"
          >
            <PlusCircledIcon className="mr-2 h-4 w-4" /> Create new Page
          </Link>
        </div>
      </div>
      <PageCardWrapper pages={pages} />
      <PagesTableData pages={pages} />
    </section>
  );
};

export default Pages;
