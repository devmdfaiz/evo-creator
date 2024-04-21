"use client"
import SmallCard from './Card'

const PageCardWrapper = () => {
  return (
    <div className="flex flex-wrap justify-center gap-5">
      <SmallCard
        title="Total Page"
        earn="50"
        desc="+20.1% from last month"
      />
      <SmallCard
        title="Total Page Revenue"
        earn="50"
        desc="+20.1% from last month"
      />
      <SmallCard
        title="Total Public Pages"
        earn="50"
        desc="+20.1% from last month"
      />
      <SmallCard
        title="Total Private Pages"
        earn="50"
        desc="+20.1% from last month"
      />
    </div>
  )
}

export default PageCardWrapper
