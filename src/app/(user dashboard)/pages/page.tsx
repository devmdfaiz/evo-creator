"use client";
import PageCardWrapper from "@/components/dashboard-layout/PageCardWrapper";
import PagesTableData from "@/components/dashboard-layout/PagesTableData";
import { DatePickerWithRange } from "@/components/global/calendar/DatePicker";
import PageSpinner from "@/components/global/spinner/PageSpinner";
import TypographyH1 from "@/components/typography/TypographyH1";
import { DateContext } from "@/context/DateProvider";
import { clientError } from "@/lib/utils/error/errorExtractor";
import { showToast } from "@/lib/zod/index.zodSchema";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import axios from "axios";
import { format } from "date-fns";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";

function getPageData({
  fromDate,
  toDate,
  date,
  setPages,
}: {
  fromDate: Date;
  toDate: Date;
  date: any;
  setPages: any;
}) {
  axios
    .post("/api/page", { fromDate, toDate })
    .then((res) => {
      const { data, status } = res;
      if (status === 200) {
        if (date?.type === "template") {
          if (date?.templateData?.day === "today") {
            const filtered = data.pages.filter(
              (data: any) =>
                format(data?.createdAt, "dd/MM/yyyy") ===
                date?.templateData?.todayDate
            );

            if (filtered) {
              setPages(filtered);
            }
            return;
          }

          if (date?.templateData?.day === "yesterday") {
            const filtered = data?.pages?.filter(
              (data: any) =>
                format(data?.createdAt, "dd/MM/yyyy") ===
                date?.templateData?.yesterdayDate
            );

            if (filtered) {
              setPages(filtered);
            }
            return;
          }

          if (data.pages) {
            setPages(data?.pages);
          }
          return;
        }

        if (data.pages) {
          setPages(data?.pages);
        }
      }
    })
    .then((error) => {
      const errorMessage = clientError(error);
      showToast(errorMessage, null, "Close", () => {});
    });
}

const Pages = () => {
  const [pages, setPages] = useState([]);
  const { fromDate, toDate, date } = useContext(DateContext);

  useEffect(() => {
    getPageData({
      fromDate,
      toDate,
      date,
      setPages,
    });
  }, [date]);

  if (pages.length === 0) {
    return <PageSpinner className="mt-[50vh]" />;
  }

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
