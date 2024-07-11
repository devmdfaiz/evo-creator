import connectToDb from "@/lib/mongodb/connection/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../../AuthOptions";
import { NextResponse } from "next/server";
import razorpay from "@/lib/utils/razorpay/razorpay";
import axios from "axios";
import { evar } from "@/lib/envConstant";
import { User } from "@/lib/mongodb/models/user.model";
import { serverError } from "@/lib/utils/error/errorExtractor";
export async function POST(req: Request, res: Response) {
  console.log("started");

  // Connect to the database
  connectToDb();

  try {
    // Parse the request body
    const { businessName, businessType, businessCategory, subBusinessCategory, accountNumber, ifscCode, beneficiaryName, pan, addressLine, city, state, pinCode, country } =
      await req.json();

    // Get the session details
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json(
        {
          message: "Unauthorized",
          error: "User session not found",
        },
        { status: 401 }
      );
    }

const email = "test@test.com"

    console.log("phone",session);
    

    // Prepare payloads for Razorpay API calls
    const linkAccountPayload = {
      email: email,
      contact_name: session.user.name,
      phone: 9696293133,
      type: "route",
      legal_business_name: businessName,
      business_type: businessType,
      legal_info: {
        pan: pan,
      },
      profile: {
        category: businessCategory,
        subcategory: subBusinessCategory,
        addresses: {
           registered: {
              street1: addressLine,
              street2: addressLine,
              city: city,
              state: state,
              postal_code: JSON.parse(pinCode),
              country: country,
           }
        }
     },
    };

    const stackholderPayload = {
      name: session.user.name,
      email: email,
      phone: {
        primary: "9696293133",
      },
      kyc: {
        pan: pan,
      },
    };

    const productConfigurationPayload = {
      product_name: "route",
      tnc_accepted: true,
      settlements: {
        account_number: accountNumber,
        ifsc_code: ifscCode,
        beneficiary_name: beneficiaryName,
      },
    };

    // Create a linked account on Razorpay
    const linkedAccount = await razorpay.accounts.create(linkAccountPayload);
    const accountId = linkedAccount.id;

    // Create a stakeholder on Razorpay
    razorpay.stakeholders.create(accountId, stackholderPayload);

    // Configure the product on Razorpay
    const url = `https://api.razorpay.com/v2/accounts/${accountId}/products`;
    await axios.post(url, productConfigurationPayload, {
      auth: {
        username: evar.razorpayKey,
        password: evar.razorpaySec,
      },
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Update the user document with the Razorpay account ID
    await User.findOneAndUpdate(
      { userId: session.user.sub },
      { rzpAccountId: accountId }
    );

    console.log("accountId", accountId);
    

    // Return a success response
    return NextResponse.json(
      {
        message: "Razorpay route setup done",
        error: null,
      },
      { status: 200 }
    );
  } catch (error) {
    const errorMessage = serverError(error);

    console.log("errorMessage", error);

    // Return an error response
    return NextResponse.json(
      {
        message: "Razorpay route setup failed",
        error: error,
      },
      { status: 500 }
    );
  }
}
