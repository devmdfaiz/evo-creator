// This Layout page is build for to provide common headers and footers to landing page

import AuthProvider from "@/context/Auth-AuthProvider";
import ThemeProvider from "@/context/ThemeProvider";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <div className="">{children}</div>
      </ThemeProvider>
    </AuthProvider>
  );
}
