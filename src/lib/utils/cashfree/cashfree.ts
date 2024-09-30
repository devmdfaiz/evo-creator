import { evar } from "@/lib/envConstant";
import { Cashfree } from "cashfree-pg";

export default function initiateCashfree() {
  Cashfree.XClientId = evar.cashfreeAppId;
  Cashfree.XClientSecret = evar.cashfreeSecretKey;
  Cashfree.XEnvironment = Cashfree.Environment.SANDBOX;
}
