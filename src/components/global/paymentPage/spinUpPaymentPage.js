import { load } from "@cashfreepayments/cashfree-js";

export default async function spinUpCashfreePaymentPage(order) {
  let cashfree;

  if (process.env.NODE_ENV === "development") {
    cashfree = await load({
      mode: "sandbox",
    });
  } else if (process.env.NODE_ENV === "production") {
    cashfree = await load({
      mode: "sandbox",
    });
  }

  const checkoutOptions = {
    paymentSessionId: order.cashfreePaymentSessionId,
  };

  cashfree.checkout(checkoutOptions);
}
