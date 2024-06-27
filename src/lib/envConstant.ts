interface Evar {
  projectName: string;
  jwtSec: string;
  razorpayKey: string;
  razorpaySec: string;
  domain: string;
  resendApiKey: string;
  otpSec: string;
  appwriteProjectId: string;
  appwriteApiKey: string;
  appwriteBucketId: string;
}

export const evar: Evar = {
  projectName: process.env.PROJECT_NAME!,
  jwtSec: process.env.JWT_SECRET!,
  razorpayKey: process.env.RAZORPAY_KEY_ID!,
  razorpaySec: process.env.RAZORPAY_KEY_SEC!,
  domain: process.env.DOMAIN!,
  resendApiKey: process.env.RESEND_API_KEY!,
  otpSec: process.env.OTP_KEY!,
  appwriteApiKey: process.env.NEXT_PUBLIC_APPWRITE_API_KEY!,
  appwriteProjectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!,
  appwriteBucketId: process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID!
};
