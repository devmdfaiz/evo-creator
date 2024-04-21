"use client"
import SmallCard from './Card'

const CustomersOrdersWrapper = () => {
  return (
    <div className="flex flex-wrap justify-center gap-5">
      <SmallCard
        title="Total Customers"
        earn="50"
        desc="+20.1% from last month"
      />
      <SmallCard
        title="Total Revenue"
        earn="50"
        desc="+20.1% from last month"
      />
      <SmallCard
        title="Total Success Customers"
        earn="50"
        desc="+20.1% from last month"
      />
      <SmallCard
        title="Total Field Customers"
        earn="50"
        desc="+20.1% from last month"
      />
    </div>
  )
}

export default CustomersOrdersWrapper
