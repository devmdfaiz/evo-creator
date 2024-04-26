"use server";
import connectToDb from "./mongodb/connection/db";
import { Order } from "@/lib/mongodb/models/order.model";
import { Page } from "./mongodb/models/page.model";

/**
 * Function (server action) that takes customer info which is collected form payment page via handleOrderFilledInfo(). Roll of this function takes customer info and save to database
 * @param
 */
export const actionOrderFilledInfo = async (
  data: any,
  pageId: string,
  device: string,
  priceType: string
) => {
  connectToDb();

  try {
    const pageDetail = await Page.findById(pageId);

    const amount = pageDetail?.pagePrice?.price;
    let createdOrder;

    const auctionPrice = data?.auctionPrice;

    if (pageDetail) {
      createdOrder = await Order.create({
        customerInfo: data,
        ofPage: [pageId],
        amount: priceType === "auctionPrice" ? auctionPrice : amount,
        device,
      });
    }

    if (createdOrder) {
      pageDetail.pageOrders.push(createdOrder._id);
      await pageDetail.save();
    }

    return { msg: "Order created", status: 200 };
  } catch (error) {
    console.log("error in creating order =>", error);
    return { msg: "Some went wrong", status: 500 };
  }
};

export const checkOrderPaidOrNot = async (orderId: string) => {
  connectToDb();
  try {
    const { rzrPayStatus, isPaid } = await Order.findOne({
      rzrPayOrderId: orderId,
    });

    return { rzrPayStatus, isPaid, status: true };
  } catch (error) {
    return { rzrPayStatus: null, isPaid: false, status: false };
  }
};
