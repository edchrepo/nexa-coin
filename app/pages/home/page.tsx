"use client";

import { useState } from "react";
import Tabs from "@/app/components/Tabs";
import CoinCarousel from "@/app/components/Carousel/CoinCarousel";
import ChartOverview from "@/app/components/Charts/ChartOverview";
import CoinsTable from "@/app/components/Table/CoinsTable";
import Converter from "@/app/components/Converter/Converter";

export default function Home() {
  const [activeTab, setActiveTab] = useState("coins");

  return (
    <div className="bg-[#f3f5f9] dark:bg-[#13121a] flex-col justify-center w-[90%]">
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === "coins" ? (
        <>
          <CoinCarousel />
          <ChartOverview />
        </>
      ) : (
        <Converter />
      )}
      <CoinsTable />
    </div>
  );
}
