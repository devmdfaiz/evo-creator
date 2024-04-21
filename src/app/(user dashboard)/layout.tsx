// This Layout page is build for to provide common headers and footers to user pages
import DashBoardHeader from "@/components/dashboard-layout/DashBoardHeader";
import ThemeProvider from "@/context/ThemeProvider";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
