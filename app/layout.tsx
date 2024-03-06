import "./globals.css";

import { Inter } from "next/font/google";
import type { Metadata } from "next";
import { ConvexClientProvider } from "@/components/providers/convex";
import { ThemeProvider } from "@/components/providers/theme";

const inter = Inter({ subsets: ["latin"], weight: ["400", "600"] });

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
        <ConvexClientProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
            storageKey="epic-theme-251"
          >
            {children}
          </ThemeProvider>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
