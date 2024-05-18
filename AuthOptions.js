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
      if (user) {
        // editing jwt payload
        token.sub = user.userId;
        token.name = user.fullname;
        token.phone = user.phone;
        token.emailVerificationStatus = user.emailVerificationStatus;
        //TODO: isPhoneVerified letter
        // token.isPhoneVerified = user.isPhoneVerified
        token.userRole = user.userRole;
        token.picture = user.avatar;
      }
      return token;
    },
    async session({ session, token, user }) {
      if (token) {
        session.user.sub = token?.sub;
        session.user.emailVerificationStatus = token?.emailVerificationStatus;
        //TODO: isPhoneVerified letter
        // session.user.isPhoneVerified = token?.isPhoneVerified
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
