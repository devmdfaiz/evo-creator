// This Layout page is build for to provide common headers and footers to user pages
import ThemeProvider from "@/context/ThemeProvider";
import { fetchFullUserData } from "@/lib/fetch/fetch";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../AuthOptions";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <>

        {children}
    </>
  );
}
