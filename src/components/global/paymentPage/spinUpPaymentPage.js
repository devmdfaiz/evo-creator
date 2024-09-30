import { load } from "@cashfreepayments/cashfree-js";

export default async function spinUpCashfreePaymentPage(order) {
  let cashfree;

  cashfree = await load({
    mode: "sandbox",
  });

  const checkoutOptions = {
    paymentSessionId: order.cashfreePaymentSessionId,
  };

  cashfree.checkout(checkoutOptions);
}
