import { Work_Sans } from "next/font/google";
import { Toaster } from "react-hot-toast";
import AuthGuard from "./components/AuthGuard";
import Footer from "./components/Footer";
import Header from "./components/Header";
import ScrollToTop from "./components/ScrollToTop";
import "./globals.css";
import StoreProvider from "./store/StoreProvider";

const workSans = Work_Sans({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Oister Transactions",
  description:
    "Oister Transactions Platform for Relationship Managers to discover and express interest in transactions",
  icons: {
    icon: "https://oistercdn.s3.ap-south-1.amazonaws.com/Pre-investment-dashboard/favicon.png",
  },
};

export default function Layout({ children }) {
  return (
    <html lang="en">
      <body className={`${workSans.className} text-base antialiased`}>
        <StoreProvider>
          <div className="flex min-h-screen flex-col">
            <AuthGuard>
              <ScrollToTop />
              <div className="fixed left-0 z-50 w-full">
                <Header />
              </div>
              {children}
            </AuthGuard>
          </div>
          <Footer />
        </StoreProvider>
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
