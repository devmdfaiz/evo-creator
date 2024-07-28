import nodemailer from "nodemailer";
import { evar } from "../envConstant";

export const transporter = nodemailer.createTransport({
  host: evar.emailServerHost,
  port: parseInt(evar.emailServerPort),
  secure: true,
  auth: {
    user: evar.senderEmail,
    pass: evar.emailServerPass,
  },
});
