import "./globals.css";
import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";
import StoreProvider from "./store/StoreProvider";
import Header from "./components/Header";
import MainLayout from "./components/MainLayout";

const workSans = Work_Sans({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Oister Transactions",
  description:
    "This is a B2B transaction discovery platform for Relationship Managers.",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={workSans.className}>
        <StoreProvider>
          <div className="flex min-h-screen flex-col">
            <div className="fixed left-0 z-50 w-full">
              <Header />
            </div>
            <MainLayout>{children}</MainLayout>
          </div>
        </StoreProvider>
      </body>
    </html>
  );
}
