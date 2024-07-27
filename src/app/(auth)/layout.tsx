// This Layout page is build for to provide auth pages a common structure whithout repating code

import AuthHeader from "@/components/auth-components/AuthHeader";
import ThemeProvider from "@/context/ThemeProvider";

export default async function RootLayout({
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
