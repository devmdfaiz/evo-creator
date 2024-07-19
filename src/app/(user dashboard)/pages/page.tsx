"use client";
import PageCardWrapper from "@/components/dashboard-layout/PageCardWrapper";
import PagesTableData from "@/components/dashboard-layout/PagesTableData";
import { DatePickerWithRange } from "@/components/global/calendar/DatePicker";
import ButtonSpinner from "@/components/global/spinner/ButtonSpinner";
import PageSpinner from "@/components/global/spinner/PageSpinner";
import TypographyH1 from "@/components/typography/TypographyH1";
import { buttonVariants } from "@/components/ui/button";
import { DateContext } from "@/context/DateProvider";
import { getDashboardPageData } from "@/lib/fetch/fetch";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useContext, useMemo, useState } from "react";

const Pages = () => {
  const [pages, setPages] = useState(["nothing"]);
  const [isOrdersLoading, setIsOrdersLoading] = useState(false);
  const { fromDate, toDate, date } = useContext(DateContext);

  useMemo(() => {
    setIsOrdersLoading(true);
    getDashboardPageData({
      fromDate,
      toDate,
      date,
      setPages,
    }).then(() => {
      setIsOrdersLoading(false);
    });
  }, [date]);

  if (pages[0] === "nothing") {
    return <PageSpinner className="mt-[50vh]" />;
  }

  return (
    <section className="mb-7">
      <div className="flex flex-wrap justify-between items-center">
        <TypographyH1 className="my-7">All Pages</TypographyH1>
        <div className="flex justify-start items-center flex-wrap gap-5 mb-5 sm:my-0">
          <div className="flex gap-2 items-center justify-center">
            {isOrdersLoading && <ButtonSpinner className="w-5 h-5" />}
            <DatePickerWithRange />
          </div>
          <Link
            href="/payment-page/create"
            className={buttonVariants({
              variant: "default",
            })}
          >
            <PlusCircledIcon className="mr-2 h-5 w-5" /> Create new Page
          </Link>
        </div>
      </div>
      <PageCardWrapper pages={pages} />
      <PagesTableData pages={pages} />
    </section>
  );
};

export default Pages;
