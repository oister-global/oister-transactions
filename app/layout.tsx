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
            <div className="fixed w-full top-0 z-10">
              <Header />
            </div>
            <div className="pt-20 m-3">{children}</div>
          </StoreProvider>
        </div>
      </body>
    </html>
  );
}
