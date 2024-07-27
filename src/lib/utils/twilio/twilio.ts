import { evar } from "@/lib/envConstant";

const client = require("twilio")(evar.twilioAccountSid, evar.twilioAuthToken);

export default function sendSms({ body, to }: { body: string; to: number }) {
  try {
    client.messages.create({
      from: "+15557122661",
      body,
      to,
    });

    return { success: true, error: null };
  } catch (error) {
    return { success: false, error };
  }
}
