import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import MarketData from "@/components/MarketData";
import "./globals.css";

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
      <body>
        <div className="font-mono w-[100%]">
          <MarketData />
          <div className="flex flex-col items-center justify-center">
            <Navbar />
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
