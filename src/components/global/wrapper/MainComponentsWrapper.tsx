import DashBoardHeader from "@/components/dashboard-components/DashBoardHeader";
import React from "react";
import SupportBar from "../SupportBar/SupportBar";

const MainComponentsWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <DashBoardHeader />
      <div className="container mx-auto px-5 mb-7">{children}</div>
      <SupportBar />
    </>
  );
};

export const AdminMainComponentsWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <>
      <DashBoardHeader userRoll="ADMIN" />
      <div className="container mx-auto px-5 mb-7">{children}</div>
      <SupportBar />
    </>
  );
};

export const MainComponentsWrapperOnly = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <>
      <div className="container mx-auto px-5 mb-7">{children}</div>
    </>
  );
};

export default MainComponentsWrapper;
