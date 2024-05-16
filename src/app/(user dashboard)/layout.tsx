// This Layout page is build for to provide common headers and footers to user pages
import DashBoardHeader from "@/components/dashboard-layout/DashBoardHeader";
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

  const isEmailVerified = session?.user?.isEmailVerified

  const user = session?.user

  if(!user || user){
    if(!isEmailVerified){
       redirect("/sign-in")
    }
  }

  return (
    <>
      {/* <DashboardAuthProvider> */}
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <DashBoardHeader />
        <div className="container mx-auto px-5">{children}</div>
      </ThemeProvider>
      {/* </DashboardAuthProvider> */}
    </>
  );
}
