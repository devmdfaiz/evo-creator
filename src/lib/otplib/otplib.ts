import { authenticator } from "otplib";
import { evar } from "../envConstant";

// Configure OTP settings
const otplibConfigration = () => {
  authenticator.options = { window: 5, digits: 6 }; // Time window for OTP validation (in minutes) and Length of the OTP
};

// Function to generate a new OTP
export const generateOTP = () => {
  otplibConfigration();
  // Generate a 6-digit OTP using a secret key from environment variables
  const otp = authenticator.generate(evar.otpSec);
  return otp;
};

// Function to verify if the provided OTP is correct
export const verifyOTP = (otp: string) => {
  otplibConfigration();
  return authenticator.verify({ token: otp, secret: evar.otpSec });
};
