import "./globals.css";
import "@blocknote/core/style.css";

import { Toaster } from "sonner";

import { Inter } from "next/font/google";
import type { Metadata } from "next";

import { ConvexClientProvider } from "@/components/providers/convex";
import { ModalProvider } from "@/components/providers/modal";
import { ThemeProvider } from "@/components/providers/theme";

import { EdgeStoreProvider } from "@/lib/edgestore";

const inter = Inter({ subsets: ["latin"], weight: ["400", "600"] });

export const metadata: Metadata = {
  title: "Brainlet",
  description: "Your brain, your way",
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
          <EdgeStoreProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
              storageKey="epic-theme-251"
            >
              <Toaster position="bottom-center" />
              <ModalProvider />
              {children}
            </ThemeProvider>
          </EdgeStoreProvider>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
