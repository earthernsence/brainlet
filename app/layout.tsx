import "./globals.css";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import { ThemeProvider } from "@/components/ui/providers/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Epic Notes App",
  description: "To take epic notes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          storageKey="jotion-theme-2"
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
