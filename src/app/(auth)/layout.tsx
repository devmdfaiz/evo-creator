// This Layout page is build for to provide auth pages a common structure whithout repating code

import AuthHeader from "@/components/auth-layout/AuthHeader";
import ThemeProvider from "@/context/ThemeProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
