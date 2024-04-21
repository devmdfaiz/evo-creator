import { evar } from "@/lib/envConstant";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: evar.razorpayKey,
  key_secret: evar.razorpaySec,
});

export const rzpPopUp = (options) => {
  const rzp = new window.Razorpay(options);
  return rzp
}

export default razorpay