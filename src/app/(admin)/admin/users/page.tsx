"use client";
import CustomersDataTable from "@/components/dashboard-components/CustomersDataTable";
import CustomersOrdersWrapper from "@/components/dashboard-components/CustomersWrapper";
import { DatePickerWithRange } from "@/components/global/calendar/DatePicker";
import MainComponentsWrapper, {
  AdminMainComponentsWrapper,
} from "@/components/global/wrapper/MainComponentsWrapper";
import ButtonSpinner from "@/components/global/spinner/ButtonSpinner";
import PageSpinner from "@/components/global/spinner/PageSpinner";
import TypographyH1 from "@/components/typography/TypographyH1";
import { DateContext } from "@/context/DateProvider";
import React, { useContext, useMemo, useState } from "react";
import { getAdminUsersData } from "@/lib/fetch/adminFetch";
import UsersTableData from "@/components/dashboard-components/UsersDataTable";

const UsersPage = () => {
  const [currentPeriodUsers, setCurrentPeriodUsers] = useState(["nothing"]);
  const [comparisonPeriodUsers, setComparisonPeriodUsers] = useState([
    "nothing",
  ]);
  const [isUsersLoading, setIsUsersLoading] = useState(false);
  const { fromDate, toDate, dayGap, date, reloadPage } = useContext(DateContext);

  useMemo(() => {
    setIsUsersLoading(true);
    getAdminUsersData({
      fromDate,
      toDate,
      dayGap,
      date,
      setCurrentPeriodUsers,
      setComparisonPeriodUsers,
    }).then(() => {
      setIsUsersLoading(false);
    });
  }, [date, reloadPage]);

  if (
    currentPeriodUsers[0] === "nothing" ||
    comparisonPeriodUsers[0] === "nothing"
  ) {
    return <PageSpinner />;
  }

  return (
    <AdminMainComponentsWrapper>
      <div className="flex flex-wrap justify-between items-center">
        <TypographyH1 className="my-7">Users</TypographyH1>
        <div className="mb-5 sm:my-0">
          <div className="flex gap-2 items-center justify-center">
            {isUsersLoading && <ButtonSpinner className="w-5 h-5" />}
            <DatePickerWithRange />
          </div>
        </div>
      </div>
      <UsersTableData currentPeriod={currentPeriodUsers} />
    </AdminMainComponentsWrapper>
  );
};

export default UsersPage;
