import NextAuth from "next-auth";

export interface UserNextAuth {
  userId: string;
  name: string;
  email: string;
  phone: string;
  emailVerificationStatus: boolean;
  phoneVerificationStatus: boolean;
  userRole: string;
  avatarUrl: string;
  avatarId: string;
}

declare module "next-auth" {
  interface User {
    userId: string;
    fullname: string;
    email: string;
    phone: string;
    emailVerificationStatus: boolean;
    phoneVerificationStatus: boolean;
    userRole: string;
    avatarUrl: string;
    avatarId: string;
  }

  interface Session {
    user: {
      sub: string;
      email: string;
      emailVerificationStatus: boolean;
      name: string;
      phoneVerificationStatus: boolean;
      phone: string;
      userRole: string;
      avatarUrl: string;
      avatarId: string;
    };
  }

  interface JWT {
    sub: string;
    email: string;
    name: string;
    phone: string;
    emailVerificationStatus: boolean;
    phoneVerificationStatus: boolean;
    userRole: string;
    avatarUrl: string;
    avatarId: string;
  }
}
