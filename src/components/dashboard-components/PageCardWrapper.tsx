"use client";
import SmallCard from "./DashboardCard";

const PageCardWrapper = ({ pages }: { pages: any[] }) => {
  let totalRevenue = 0;

  if (pages) {
    for (let page of pages) {
      totalRevenue += page?.totalRevenue;
    }
  }

  let noOfPublicPages = 0;
  let noOfPrivatePages = 0;

  if (pages) {
    for (let page of pages) {
      if (page?.publishStatus === "public") {
        noOfPublicPages += 1;
      }

      if (page?.publishStatus === "private") {
        noOfPrivatePages += 1;
      }
    }
  }

  return (
    <div className="flex flex-wrap justify-center gap-5">
      <SmallCard title="Total Page" goal={pages?.length} desc="" />
      <SmallCard title="Total Page Revenue" goal={`₹${totalRevenue}`} desc="" />
      <SmallCard title="Total Public Pages" goal={noOfPublicPages} desc="" />
      <SmallCard title="Total Private Pages" goal={noOfPrivatePages} desc="" />
    </div>
  );
};

export default PageCardWrapper;
