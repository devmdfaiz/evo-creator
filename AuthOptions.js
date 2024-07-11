import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { getServerSession } from "next-auth";

export const authOptions = {
  providers: [
    // Credentials provider setup
    CredentialsProvider({
      async authorize(credentials, req) {
        return credentials;
      },
    }),
    // Google Provider setup
    GoogleProvider({
      profile(profile) {
        let userRole;
        if (profile?.email === "inoogobyfaizan@gmail.com") {
          userRole = "ADMIN";
        }

        return { ...profile, userRole: userRole };
      },
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      // console.log("JWT callback - user:", user);
      if (user) {
        // editing jwt payload
        token.sub = user.userId;
        token.name = user.fullname;
        token.phone = user.phone;
        token.email = user.email;
        token.emailVerificationStatus = user.emailVerificationStatus;
        token.phoneVerificationStatus = user.phoneVerificationStatus;
        token.userRole = user.userRole;
        token.avatarUrl = user.avatarUrl;
        token.avatarId = user.avatarId;
        // console.log("JWT callback - token:", token);
      }
      return token;
    },
    async session({ session, token, user }) {
      // console.log("Session callback - token:", token);
      if (token) {
        session.user.sub = token.sub;
        session.user.emailVerificationStatus = token.emailVerificationStatus;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.phoneVerificationStatus = token.phoneVerificationStatus;
        session.user.phone = token.phone;
        session.user.userRole = token.userRole;
        session.user.avatarUrl = token.avatarUrl;
        session.user.avatarId = token.avatarId;
        // console.log("Session callback - session:", session);
      }
      return session;
    },
  },
};

//Exporting currect user like Next Auth v5
export const auth = async () => {
  const user = await getServerSession(authOptions);
  return user;
};
