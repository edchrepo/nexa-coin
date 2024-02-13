"use client";

import Tabs from "@/app/components/Tabs/Tabs";
import CoinCarousel from "@/app/components/Carousel/CoinCarousel";
import ChartOverview from "@/app/components/Charts/ChartOverview";
import CoinsTable from "@/app/components/Table/CoinsTable";
import Converter from "@/app/components/Converter/Converter";
import { useTabLink } from "@/app/context/TabLinkContext";

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
