interface Evar {
  jwtSession: string;
  appwriteEndpoint: string;
  appwriteProjectId: string;
  razorpayKey: string;
  razorpaySec: string;
  domain: string;
}

export const evar: Evar = {
  jwtSession: process.env.JWT_SECRET!,
  appwriteEndpoint: process.env.APPWRITE_PROJECT_ID!,
  appwriteProjectId: process.env.APPWRITE_ENDPOINT!,
  razorpayKey: process.env.RAZORPAY_KEY_ID!,
  razorpaySec: process.env.RAZORPAY_KEY_SEC!,
  domain: process.env.DOMAIN!
};
