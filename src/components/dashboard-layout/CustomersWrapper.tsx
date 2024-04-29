"use client";
import SmallCard from "./Card";

const CustomersOrdersWrapper = ({ orders }: { orders: any[] }) => {
  const filteredOrders = orders.filter((data) => {
    return data.isPaid === true;
  });

  let totalRevenue = 0;

  for (const filteredOrder of filteredOrders) {
    totalRevenue += filteredOrder.amount;
  }

  return (
    <div className="flex flex-wrap justify-center gap-5">
      <SmallCard
        title="Total Customers"
        goal={filteredOrders.length}
        desc="+20.1% from last month"
      />
      <SmallCard
        title="Total Revenue"
        goal={`₹${totalRevenue}`}
        desc="+20.1% from last month"
      />
      <SmallCard
        title="Total Success Orders"
        goal={filteredOrders.length}
        desc="+20.1% from last month"
      />
      <SmallCard
        title="Total Field Orders"
        goal={orders.length - filteredOrders.length}
        desc="+20.1% from last month"
      />
    </div>
  );
};

export default CustomersOrdersWrapper;
