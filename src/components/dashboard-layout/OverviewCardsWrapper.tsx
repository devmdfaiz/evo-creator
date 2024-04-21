"use client";
import React, { useState } from "react";
import SmallCard from "./Card";

const OverviewCardsWrapper = () => {
  const [data, setData] = useState([
    { name: "some thing", value: 234 },
    { name: "some thing", value: 124 },
    { name: "some thing", value: 24 },
    { name: "some thing", value: 625 },
    { name: "some thing", value: 234 },
    { name: "some thing", value: 334 },
    { name: "some thing", value: 634 },
    { name: "some thing", value: 734 },
    { name: "some thing", value: 254 },
  ]);

  return (
    <div className="flex flex-wrap justify-center gap-5">
      <SmallCard
        title="Total Sales"
        earn="50"
        desc="+20.1% from last month"
        data={data}
        key="value"
      />
      <SmallCard
        title="Total Revenue"
        earn="₹15,000.00"
        desc="+10.1% from last month"
        data={data}
        key="value"
      />
      <SmallCard
        title="Sales Growth"
        earn="50%"
        desc="+50.1% from last month"
        data={data}
        key="value"
      />
      <SmallCard
        title="Page Sold"
        earn="100"
        desc="+15.4% from last month"
        data={data}
        key="value"
      />
      <SmallCard
        title="Total Customers"
        earn="150"
        desc="+55.4% from last month"
        data={data}
        key="value"
      />
    </div>
  );
};

export default OverviewCardsWrapper;
