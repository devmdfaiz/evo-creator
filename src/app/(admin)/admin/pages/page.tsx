"use client";
import PageCardWrapper from "@/components/dashboard-components/PageCardWrapper";
import PagesTableData from "@/components/dashboard-components/PagesTableData";
import { DatePickerWithRange } from "@/components/global/calendar/DatePicker";
import MainComponentsWrapper, {
  AdminMainComponentsWrapper,
} from "@/components/global/wrapper/MainComponentsWrapper";
import ButtonSpinner from "@/components/global/spinner/ButtonSpinner";
import PageSpinner from "@/components/global/spinner/PageSpinner";
import TypographyH1 from "@/components/typography/TypographyH1";
import { buttonVariants } from "@/components/ui/button";
import { DateContext } from "@/context/DateProvider";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useContext, useMemo, useState } from "react";
import { getAdminPageData } from "@/lib/fetch/adminFetch";

const Pages = () => {
  const [pages, setPages] = useState(["nothing"]);
  const [isOrdersLoading, setIsOrdersLoading] = useState(false);
  const { fromDate, toDate, date, reloadPage } = useContext(DateContext);

  useMemo(() => {
    setIsOrdersLoading(true);
    getAdminPageData({
      fromDate,
      toDate,
      date,
      setPages,
    }).then(() => {
      setIsOrdersLoading(false);
    });
  }, [date, reloadPage]);

  if (pages[0] === "nothing") {
    return <PageSpinner />;
  }

  return (
    <AdminMainComponentsWrapper>
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
    </AdminMainComponentsWrapper>
  );
};

export default Pages;
