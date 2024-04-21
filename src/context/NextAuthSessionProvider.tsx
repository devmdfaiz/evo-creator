"use client";
import { children } from "@/lib/types/reactComponent.type";
import { SessionProvider } from "next-auth/react";

const NextAuthSessionProvider = ({ children }: children) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default NextAuthSessionProvider;
