// This Layout page is build for to provide auth pages a common structure whithout repating code

import AuthHeader from "@/components/auth-layout/AuthHeader";
import ThemeProvider from "@/context/ThemeProvider";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../AuthOptions";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await getServerSession(authOptions);

  if(session?.user){
    if(session?.user?.isEmailVerified){
       redirect("/")
    }
  }

  return (
    <>
      {/* <AuthProvider> */}
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <AuthHeader />
        <main className="w-full" style={{ height: "calc(100vh - 57px)" }}>
          {children}
        </main>
      </ThemeProvider>
      {/* </AuthProvider> */}
    </>
  );
}
