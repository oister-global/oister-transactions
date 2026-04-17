import "./globals.css";
import { Work_Sans } from "next/font/google";
import StoreProvider from "./store/StoreProvider";
import Header from "./components/Header";
import MainLayout from "./components/MainLayout";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";

const workSans = Work_Sans({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Oister Transactions",
  description:
    "This is a B2B transaction discovery platform for Relationship Managers.",
};

export default function Layout({ children }) {
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
          <Footer />
        </StoreProvider>
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
