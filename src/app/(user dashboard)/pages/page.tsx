import PageCardWrapper from "@/components/dashboard-layout/PageCardWrapper";
import PagesTableData from "@/components/dashboard-layout/PagesTableData";
import { DatePickerWithRange } from "@/components/global/calendar/DatePicker";
import TypographyH1 from "@/components/typography/TypographyH1";
import { Button } from "@/components/ui/button";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import Link from "next/link";

const Pages = () => {
  return (
    <section className="mb-7">
      <div className="flex flex-wrap justify-between items-center">
        <TypographyH1 className="my-7">All Pages</TypographyH1>
        <div className="flex justify-start items-center flex-wrap gap-5 mb-5 sm:my-0">
          <DatePickerWithRange />
          <Link href="/payment-page/add" className="flex justify-center items-center bg-primary py-1 px-4 rounded-sm">
            <PlusCircledIcon className="mr-2 h-4 w-4" /> Create new Page
          </Link>
        </div>
      </div>
      <PageCardWrapper />
      <PagesTableData />
    </section>
  );
};

export default Pages;
