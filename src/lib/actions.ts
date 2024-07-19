"use server";
import connectToDb from "./mongodb/connection/db";
import { Order } from "@/lib/mongodb/models/order.model";
import { Page } from "./mongodb/models/page.model";
import fs from "fs";
import { storageServer } from "./utils/appwrite/appwriteServer";
import { ID } from "node-appwrite";
import { evar } from "./envConstant";

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

export async function genDummyFile(jsonData: {
  orderJson: any;
  pageJson: any;
}) {
  fs.writeFile("orders.json", jsonData.orderJson, (err) => {
    if (err) {
      console.error("Error writing JSON data to file:", err);
    } else {
      console.log("JSON data successfully written to orders.json");
    }
  });

  fs.writeFile("page.json", jsonData.pageJson, (err) => {
    if (err) {
      console.error("Error writing JSON data to file:", err);
    } else {
      console.log("JSON data successfully written to orders.json");
    }
  });
}

export const handleUploadAction = (imagesPreview: File) => {
  const promise = storageServer.createFile(
    evar.appwriteBucketId,
    ID.unique(),
    imagesPreview
  );

  promise.then(
    function (response) {
      console.log("succ", response); // Success
    },
    function (error) {
      console.log("err", error); // Failure
    }
  );
}