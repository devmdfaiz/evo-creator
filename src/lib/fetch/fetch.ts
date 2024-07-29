import axios from "axios";
import { format } from "date-fns";
import { clientError } from "../utils/error/errorExtractor";
import { showToast } from "../zod/index.zodSchema";
import { evar } from "../envConstant";
import { Dispatch, SetStateAction } from "react";

export async function getDashboardOrderData({
  fromDate,
  toDate,
  dayGap,
  date,
  setCurrentPeriodOrders,
  setComparisonPeriodOrders,
  setAccountStatus,
}: {
  fromDate: Date;
  toDate: Date;
  dayGap: number;
  date: any;
  setCurrentPeriodOrders: any;
  setComparisonPeriodOrders: any;
  setAccountStatus: any;
}) {
  try {
    const res = await axios.post("/api/order/order-data", {
      fromDate,
      toDate,
      dayGap,
    });
    const { data, status } = res;

    if (status === 200) {
      setAccountStatus(data.accountStatus);
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
          } else {
            setCurrentPeriodOrders([]);
            setComparisonPeriodOrders([]);
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
          } else {
            setCurrentPeriodOrders([]);
            setComparisonPeriodOrders([]);
          }

          return;
        }

        if (data.orders) {
          setCurrentPeriodOrders(data?.orders[0]?.currentPeriod);
          setComparisonPeriodOrders(data?.orders[0]?.comparisonPeriod);
        } else {
          setCurrentPeriodOrders([]);
          setComparisonPeriodOrders([]);
        }

        return;
      }

      if (data.orders) {
        setCurrentPeriodOrders(data?.orders[0]?.currentPeriod);
        setComparisonPeriodOrders(data?.orders[0]?.comparisonPeriod);
      } else {
        setCurrentPeriodOrders([]);
        setComparisonPeriodOrders([]);
      }
    }
  } catch (error) {
    const errorMessage = clientError(error);
    showToast(errorMessage, null, "Close", () => {});
  }
}

export const getPageData = async (id: string) => {
  const url = `${process.env.NEXTAUTH_URL!}/api/page/public-page-data`; // Replace with your actual API endpoint

  try {
    const response = await axios.post(url, { id });

    if (response.status !== 200) {
      throw new Error(`Error fetching data: ${response.status}`);
    }

    const fieldValue = await response.data.fieldValue;
    return fieldValue;
  } catch (error) {
    console.error("Error fetching data:", error);
    return { massage: error, fieldValue: null };
  }
};

export async function getDashboardPageData({
  fromDate,
  toDate,
  date,
  setPages,
  setAccountStatus,
}: {
  fromDate: Date;
  toDate: Date;
  date: any;
  setPages: any;
  setAccountStatus: any;
}) {
  try {
    const res = await axios.post("/api/page", { fromDate, toDate });
    const { data, status } = res;

    if (status === 200) {
      setAccountStatus(data.accountStatus);
      if (date?.type === "template") {
        if (date?.templateData?.day === "today") {
          const filtered = data.pages.filter(
            (data: any) =>
              format(data?.createdAt, "dd/MM/yyyy") ===
              date?.templateData?.todayDate
          );

          if (filtered) {
            setPages(filtered);
          } else {
            setPages([]);
          }
          return;
        }

        if (date?.templateData?.day === "yesterday") {
          const filtered = data?.pages?.filter(
            (data: any) =>
              format(data?.createdAt, "dd/MM/yyyy") ===
              date?.templateData?.yesterdayDate
          );

          if (filtered) {
            setPages(filtered);
          } else {
            setPages([]);
          }
          return;
        }

        if (data.pages) {
          setPages(data?.pages);
        } else {
          setPages([]);
        }
        return;
      }

      if (data.pages) {
        setPages(data?.pages);
      } else {
        setPages([]);
      }
    }
  } catch (error) {
    const errorMessage = clientError(error);
    showToast(errorMessage, null, "Close", () => {});
  }
}

export const getPublicPageData = async (id: string) => {
  const url = `${evar.domain}/api/page/public-page-data`; // Replace with your actual API endpoint

  try {
    const response = await axios.post(url, { id });

    const fieldValue = await response.data.fieldValue;
    return { fieldValue, error: null };
  } catch (error) {
    console.error("Error fetching data:", error);
    const errorMessage = clientError(error);
    return { fieldValue: null, error: errorMessage };
  }
};

export const checkOrderPaidOrNot = async (
  orderId: string,
  setPaymentStatus: Dispatch<
    SetStateAction<"verifying" | "paid" | "unpaid" | "error">
  >,
  setOrderData: Dispatch<SetStateAction<any[]>>
) => {
  try {
    const { data, status } = await axios.post(
      "/api/order/thank-you-order-data",
      {
        orderId,
      }
    );

    if (status === 200) {
      if (data.orderData[0].isPaid) {
        setPaymentStatus("paid");
        setOrderData(data.orderData);
      } else {
        setPaymentStatus("unpaid");
        setOrderData(data.orderData);
      }
    }
  } catch (error) {
    setPaymentStatus("error");
    console.log("Error in fetching thank you page order data: ", error);
    const errorMessage = clientError(error);

    showToast(errorMessage, null, "Close", () => {});
  }
};

export const fetchFullUserData = async (userId: string) => {
  try {
    const { data, status } = await axios.post(
      `${evar.domain}/api/full-user-data`,
      { userId }
    );

    if (status === 200) {
      return { data };
    }
  } catch (error) {
    console.log("Error in fetching full user data: ", error);
    const errorMessage = clientError(error);
    return { data: null };
  }
};
