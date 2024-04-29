"use client";
import SmallCard from "./Card";

const OrdersCardWrapper = ({ orders }: { orders: any[] }) => {

  let totalRevenue = 0;

  const filteredOrders = orders.filter((data) => {
    return data.isPaid === true;
  });

  for (const filteredOrder of filteredOrders) {
    totalRevenue += filteredOrder.amount;
  }

  return (
    <div className="flex flex-wrap justify-center gap-5">
      <SmallCard
        title="Total Orders"
        goal={orders.length}
        desc="+20.1% from last month"
      />
      <SmallCard
        title="Total Revenue"
        goal={`₹${totalRevenue}`}
        desc="+20.1% from last month"
      />
      <SmallCard
        title="Total Success Order"
        goal={orders.length}
        desc="+20.1% from last month"
      />
      <SmallCard
        title="Total Field Order"
        goal={orders.length - filteredOrders.length}
        desc="+20.1% from last month"
      />
    </div>
  );
};

export default OrdersCardWrapper;
