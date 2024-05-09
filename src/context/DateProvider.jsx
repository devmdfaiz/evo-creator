"use client";
import { addDays } from "date-fns";
import { createContext, useState } from "react";

const defaultDate = {
  from: addDays(new Date(), -7),
  to: new Date(),
};

export const DateContext = createContext();

const DateProvider = ({ children }) => {
  const [date, setDate] = useState(defaultDate);

  const fromDate = date?.from;
  const toDate = date?.to;

  // Get the time difference in milliseconds
  const timeDifference = toDate - fromDate;

  // Convert the time difference to days
  const dayGap = parseInt(timeDifference / (1000 * 60 * 60 * 24));

  return (
    <DateContext.Provider
      value={{
        date,
        setDate,
        fromDate,
        toDate,
        dayGap,
      }}
    >
      {children}
    </DateContext.Provider>
  );
};

export default DateProvider;
