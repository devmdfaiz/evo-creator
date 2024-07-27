import axios from "axios";
import { format } from "date-fns";
import { clientError } from "../utils/error/errorExtractor";
import { showToast } from "../zod/index.zodSchema";

export async function getAdminOrderData({
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
  try {
    const res = await axios.post("/api/admin/order-data", {
      fromDate,
      toDate,
      dayGap,
    });
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

export async function getAdminUsersData({
  fromDate,
  toDate,
  dayGap,
  date,
  setCurrentPeriodUsers,
  setComparisonPeriodUsers,
}: {
  fromDate: Date;
  toDate: Date;
  dayGap: number;
  date: any;
  setCurrentPeriodUsers: any;
  setComparisonPeriodUsers: any;
}) {
  try {
    const res = await axios.post("/api/admin/users-data", {
      fromDate,
      toDate,
      dayGap,
    });
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
            setCurrentPeriodUsers(filtered);
            setComparisonPeriodUsers(data?.orders[0]?.comparisonPeriod);
          } else {
            setCurrentPeriodUsers([]);
            setComparisonPeriodUsers([]);
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
            setCurrentPeriodUsers(filtered);
            setComparisonPeriodUsers(data?.orders[0]?.comparisonPeriod);
          } else {
            setCurrentPeriodUsers([]);
            setComparisonPeriodUsers([]);
          }

          return;
        }

        if (data.orders) {
          setCurrentPeriodUsers(data?.orders[0]?.currentPeriod);
          setComparisonPeriodUsers(data?.orders[0]?.comparisonPeriod);
        } else {
          setCurrentPeriodUsers([]);
          setComparisonPeriodUsers([]);
        }

        return;
      }

      if (data.orders) {
        setCurrentPeriodUsers(data?.orders[0]?.currentPeriod);
        setComparisonPeriodUsers(data?.orders[0]?.comparisonPeriod);
      } else {
        setCurrentPeriodUsers([]);
        setComparisonPeriodUsers([]);
      }
    }
  } catch (error) {
    const errorMessage = clientError(error);
    showToast(errorMessage, null, "Close", () => {});
  }
}

export async function getAdminPageData({
  fromDate,
  toDate,
  date,
  setPages,
}: {
  fromDate: Date;
  toDate: Date;
  date: any;
  setPages: any;
}) {
  try {
    const res = await axios.post("/api/admin/pages", { fromDate, toDate });
    const { data, status } = res;

    if (status === 200) {
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

export async function getAdminPageDataSearch({
  fromDate,
  toDate,
  date,
  setPages,
  idForPage,
}: {
  fromDate: Date;
  toDate: Date;
  date: any;
  setPages: any;
  idForPage: string | null;
}) {
  try {
    const res = await axios.post("/api/admin/pages/user-specific-page", {
      fromDate,
      toDate,
      idForPage,
    });
    const { data, status } = res;

    if (status === 200) {
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

export async function getAdminOrderDataSearch({
  fromDate,
  toDate,
  dayGap,
  date,
  setCurrentPeriodOrders,
  setComparisonPeriodOrders,
  idForOrder,
}: {
  fromDate: Date;
  toDate: Date;
  dayGap: number;
  date: any;
  setCurrentPeriodOrders: any;
  setComparisonPeriodOrders: any;
  idForOrder: string | null;
}) {
  try {
    const res = await axios.post("/api/admin/user-specific-order", {
      fromDate,
      toDate,
      dayGap,
      idForOrder,
    });
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