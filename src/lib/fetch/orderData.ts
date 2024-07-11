import axios from "axios";
import { format } from "date-fns";
import { clientError } from "../utils/error/errorExtractor";
import toast from "react-hot-toast";
import { showToast } from "../zod/index.zodSchema";

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

            if (data.orders) {
              setCurrentPeriodOrders(filtered);
              setComparisonPeriodOrders(data?.orders[0]?.comparisonPeriod);
            }

            return;
          }

          if (date?.templateData?.day === "yesterday") {
            const filtered = data?.orders[0]?.currentPeriod?.filter(
              (data: any) =>
                format(data?.createdAt, "dd/MM/yyyy") ===
                date?.templateData?.yesterdayDate
            );

            if (data.orders) {
              setCurrentPeriodOrders(filtered);
              setComparisonPeriodOrders(data?.orders[0]?.comparisonPeriod);
            }

            return;
          }

          if (data.orders) {
            setCurrentPeriodOrders(data?.orders[0]?.currentPeriod);
            setComparisonPeriodOrders(data?.orders[0]?.comparisonPeriod);
          }

          return;
        }

        if (data.orders) {
          setCurrentPeriodOrders(data?.orders[0]?.currentPeriod);
          setComparisonPeriodOrders(data?.orders[0]?.comparisonPeriod);
        }
      }
    })
    .then((error) => {
      const errorMessage = clientError(error);
      showToast(errorMessage, null, "Close", () => {})
    });
}
