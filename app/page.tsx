"use client";

import { useState } from "react";
import Tabs from "@/components/Tabs";
import CurrencyStats from "@/components/CurrencyStats";
import ChartOverview from "@/components/charts/ChartOverview";
import CoinsTable from "@/components/CoinsTable";
import Converter from "@/components/Converter";

export default function Home() {
  const [activeTab, setActiveTab] = useState("coins");

  return (
    <div className="bg-[#f3f5f9] dark:bg-[#13121a] flex-col justify-center w-[90%]">
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === "coins" ? (
        <>
          <CurrencyStats />
          <ChartOverview />
        </>
      ) : (
        <Converter />
      )}
      <CoinsTable />
    </div>
  );
}
