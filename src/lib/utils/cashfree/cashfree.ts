import { evar } from "@/lib/envConstant";
import { Cashfree } from "cashfree-pg";

export default function initiateCashfree() {
  if (process.env.NODE_ENV === "development") {
    Cashfree.XClientId = evar.cashfreeAppId;
    Cashfree.XClientSecret = evar.cashfreeSecretKey;
    Cashfree.XEnvironment = Cashfree.Environment.SANDBOX;
  } else if (process.env.NODE_ENV === "production") {
    Cashfree.XClientId = evar.cashfreeAppId;
    Cashfree.XClientSecret = evar.cashfreeSecretKey;
    Cashfree.XEnvironment = Cashfree.Environment.PRODUCTION;
  }
}
