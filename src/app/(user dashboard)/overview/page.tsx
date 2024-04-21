import OverviewCardsWrapper from "@/components/dashboard-layout/OverviewCardsWrapper";
import { DatePickerWithRange } from "@/components/global/calendar/DatePicker";
import TypographyH1 from "@/components/typography/TypographyH1";

const OverviewPage = () => {

  return (
    <section className="mb-7">
      <div className="flex flex-wrap justify-between items-center">
        <TypographyH1 className="my-7">Overview</TypographyH1>
        <div className="mb-5 sm:my-0">
          <DatePickerWithRange />
        </div>
      </div>
      <OverviewCardsWrapper />
    </section>
  );
};

export default OverviewPage;
