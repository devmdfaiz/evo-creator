import connectToDb from "@/lib/mongodb/connection/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../../AuthOptions";
import { Order } from "@/lib/mongodb/models/order.model";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

/**
 * This is the main function
 */

// export async function POST(req: Response) {
//   connectToDb();

//   const {
//     user: { sub },
//   } = await getServerSession(authOptions);

//   const { fromDate, toDate } = await req.json();

//   const trailingStartDate = new Date(toDate);
//   trailingStartDate.setDate(trailingStartDate.getDate() - 7);

//   try {
//     const orders = await Order.aggregate([
//       {
//         $match: {
//           owner: new mongoose.Types.ObjectId(sub),
//           createdAt: {
//             $gte: new Date(fromDate),
//             $lte: new Date(toDate),
//           },
//         },
//       },
//       {
//         $unwind: "$ofPage",
//       },
//       {
//         $lookup: {
//           from: "pages",
//           localField: "ofPage",
//           foreignField: "_id",
//           as: "pageData",
//         },
//       },
//       {
//         $unwind: {
//           path: "$pageData",
//         },
//       },
//       {
//         $group: {
//           _id: "$_id",
//           customerInfo: {
//             $first: "$customerInfo",
//           },
//           isPaid: {
//             $first: "$isPaid",
//           },
//           rzrPayOrderId: {
//             $first: "$rzrPayOrderId",
//           },
//           amount: {
//             $first: "$amount",
//           },
//           createdAt: {
//             $first: "$createdAt",
//           },
//           pageId: {
//             $first: "$pageData._id",
//           },
//           pageTitle: {
//             $first: "$pageData.metaData.metaTitle",
//           },
//         },
//       },
//     ]);

//     return NextResponse.json(
//       {
//         msg: "Orders feched succ",
//         orders,
//         error: null,
//       },
//       { status: 200 }
//     );
//   } catch (error) {
//     return NextResponse.json({
//       msg: "Orders feched failed",
//       orders: null,
//       error,
//     });
//   }
// }

/**
 * This api is for dummy order data
 */

import { DummyOrder } from "@/lib/mongodb/models/dummy/orders.dummy";

export async function POST(req: Response) {
  connectToDb();

  const {
    user: { sub },
  } = await getServerSession(authOptions);

  const { fromDate, toDate, dayGap } = await req.json();

  // Calculate a comparison period (e.g., last 7 days from `toDate`)
  const comparisonStartDate = new Date(toDate);
  comparisonStartDate.setDate(
    comparisonStartDate.getDate() - (Number.isNaN(dayGap) ? 0 : dayGap)
  ); // Last dayGap days

  try {
    const orders = await DummyOrder.aggregate([
      {
        $facet: {
          currentPeriod: [
            {
              $match: {
                createdAt: {
                  $gte: fromDate,
                  $lte: toDate,
                },
              },
            },
            {
              $unwind: "$ofPage",
            },
            {
              $lookup: {
                from: "dummypagedatas",
                localField: "ofPage",
                foreignField: "_id",
                as: "pageData",
              },
            },
            {
              $unwind: {
                path: "$pageData",
              },
            },
            {
              $group: {
                _id: "$_id",
                customerInfo: {
                  $first: "$customerInfo",
                },
                isPaid: {
                  $first: "$isPaid",
                },
                rzrPayOrderId: {
                  $first: "$rzrPayOrderId",
                },
                amount: {
                  $first: "$amount",
                },
                createdAt: {
                  $first: "$createdAt",
                },
                pageId: {
                  $first: "$pageData._id",
                },
                pageTitle: {
                  $first: "$pageData.metaData.metaTitle",
                },
              },
            },
          ],

          comparisonPeriod: [
            {
              $match: {
                createdAt: {
                  $gte: comparisonStartDate.toJSON(),
                  $lte: toDate,
                },
              },
            },
            {
              $unwind: "$ofPage",
            },
            {
              $lookup: {
                from: "dummypagedatas",
                localField: "ofPage",
                foreignField: "_id",
                as: "pageData",
              },
            },
            {
              $unwind: {
                path: "$pageData",
              },
            },
            {
              $group: {
                _id: "$_id",
                customerInfo: {
                  $first: "$customerInfo",
                },
                isPaid: {
                  $first: "$isPaid",
                },
                rzrPayOrderId: {
                  $first: "$rzrPayOrderId",
                },
                amount: {
                  $first: "$amount",
                },
                createdAt: {
                  $first: "$createdAt",
                },
                pageId: {
                  $first: "$pageData._id",
                },
                pageTitle: {
                  $first: "$pageData.metaData.metaTitle",
                },
              },
            },
          ],
        },
      },
    ]);

    return NextResponse.json(
      {
        msg: "Orders feched succ",
        orders,
        error: null,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({
      msg: "Orders feched failed",
      orders: null,
      error,
    });
  }
}
