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
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <div className="min-h-screen">{children}</div>
      </ThemeProvider>
    </>
  );
}
