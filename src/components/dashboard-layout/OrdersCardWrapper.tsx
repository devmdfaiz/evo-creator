"use client"
import SmallCard from "./Card";

const OrdersCardWrapper = () => {

  return (
    <div className="flex flex-wrap justify-center gap-5">
      <SmallCard
        title="Total Orders"
        earn="50"
        desc="+20.1% from last month"
      />
      <SmallCard
        title="Total Revenue"
        earn="50"
        desc="+20.1% from last month"
      />
      <SmallCard
        title="Total Success Order"
        earn="50"
        desc="+20.1% from last month"
      />
      <SmallCard
        title="Total Field Order"
        earn="50"
        desc="+20.1% from last month"
      />
    </div>
  );
};

export default OrdersCardWrapper;
