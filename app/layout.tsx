import type { Metadata } from "next";
import Navbar from "@/components/Navbar/Navbar";
import MarketData from "@/components/MarketData";
import "./globals.css";
import StoreProvider from "@/store/StoreProvider";
import ThemeContextProvider from "@/context/ThemeContext";
import { TabLinkProvider } from "@/context/TabLinkContext";

export const metadata: Metadata = {
  title: "NexaCoin",
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
            <TabLinkProvider>
              <div className="w-[100%]">
                <MarketData />
                <div className="flex flex-col items-center justify-center">
                  <Navbar />
                  {children}
                </div>
              </div>
            </TabLinkProvider>
          </StoreProvider>
        </ThemeContextProvider>
      </body>
    </html>
  );
}
