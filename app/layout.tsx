import type { Metadata } from "next";
import StoreProvider from "./store/StoreProvider";

import "./globals.css";
import Header from "./components/Header";

export const metadata: Metadata = {
  title: "oister-transactions",
  description: "Next.js app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen flex-col gap-px">
          <StoreProvider>
            <Header />
            {children}
          </StoreProvider>
        </div>
      </body>
    </html>
  );
}
