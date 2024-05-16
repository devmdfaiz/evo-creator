// This Layout page is build for to provide common headers and footers to user pages
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
        <main className="h-screen w-full">
        {children}
        </main>
      </ThemeProvider>
      {/* </DashboardAuthProvider> */}
    </>
  );
}
