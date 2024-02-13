"use client";

import Tabs from "@/components/Tabs/Tabs";
import CoinCarousel from "@/components/Carousel/CoinCarousel";
import ChartOverview from "@/components/Charts/ChartOverview";
import CoinsTable from "@/components/Table/CoinsTable";
import Converter from "@/components/Converter/Converter";
import { useTabLink } from "@/context/TabLinkContext";

export default function Home() {
  const { activeTab, setActiveTab } = useTabLink();

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
