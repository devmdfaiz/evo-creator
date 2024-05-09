import axios from "axios";
import { format } from "date-fns";

export function getOrderData({
    fromDate,
    toDate,
    dayGap,
    date,
    setCurrentPeriodOrders,
    setComparisonPeriodOrders,
  }: {
    fromDate: Date;
    toDate: Date;
    dayGap: number;
    date: any;
    setCurrentPeriodOrders: any;
    setComparisonPeriodOrders: any;
  }) {
    axios
      .post("/api/order/order-data", { fromDate, toDate, dayGap })
      .then((res) => {
        const { data, status } = res;
        if (status === 200) {
          if (date?.type === "template") {
            if (date?.templateData?.day === "today") {
              const filtered = data?.orders[0]?.currentPeriod?.filter(
                (data: any) =>
                  format(data?.createdAt, "dd/MM/yyyy") ===
                  date?.templateData?.todayDate
              );
  
              setCurrentPeriodOrders(filtered);
              setComparisonPeriodOrders(data?.orders[0]?.comparisonPeriod);
  
              return;
            }
  
            if (date?.templateData?.day === "yesterday") {
              const filtered = data?.orders[0]?.currentPeriod?.filter(
                (data: any) =>
                  format(data?.createdAt, "dd/MM/yyyy") ===
                  date?.templateData?.yesterdayDate
              );
  
              setCurrentPeriodOrders(filtered);
              setComparisonPeriodOrders(data?.orders[0]?.comparisonPeriod);
              return;
            }
  
            setCurrentPeriodOrders(data?.orders[0]?.currentPeriod);
            setComparisonPeriodOrders(data?.orders[0]?.comparisonPeriod);
            return;
          }
  
          setCurrentPeriodOrders(data?.orders[0]?.currentPeriod);
          setComparisonPeriodOrders(data?.orders[0]?.comparisonPeriod);
        }
      });
  }