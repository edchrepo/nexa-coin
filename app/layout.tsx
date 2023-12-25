import type { Metadata } from "next";
import Navbar from "@/app/components/Navbar/Navbar";
import MarketData from "@/app/components/MarketData";
import "./globals.css";
import StoreProvider from "./store/StoreProvider";
import ThemeContextProvider from "@/app/context/ThemeContext";

export const metadata: Metadata = {
  title: "Crypto App",
  description: "Analyzing Crypto Trends",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#f3f5f9] dark:bg-[#13121a]">
        <ThemeContextProvider>
          <StoreProvider>
            <div className="w-[100%]">
              <MarketData />
              <div className="flex flex-col items-center justify-center">
                <Navbar />
                {children}
              </div>
            </div>
          </StoreProvider>
        </ThemeContextProvider>
      </body>
    </html>
  );
}
