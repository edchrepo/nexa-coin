"use client";

import CoinStats from "../../components/CoinSummary/CoinStats";
import DataStats from "../../components/CoinSummary/DataStats";
import Description from "../../components/CoinSummary/Description";
import LinkSection from "../../components/CoinSummary/LinkSection";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchCoinSummary } from "@/store/slices/coinSummarySlice";
import { AssetData } from "@/store/slices/portfolioSlice";

const CoinSummary = () => {
  const dispatch = useAppDispatch();
  const [copied, setCopied] = useState(false);
  const [asset, setAsset] = useState<AssetData | undefined>(undefined);
  const params = useParams();
  const coinId = params.coinId as string;
  const coinSummary = useAppSelector((state) => state.coinSummary);
  const coins = useAppSelector((state) => state.coinsData);
  const portfolio = useAppSelector((state) => state.portfolio);

  const handleCopy = (link: string) => {
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    dispatch(fetchCoinSummary(coinId));
    const searchedAsset = coins.find((coin) => coin.id === coinId);
    // Set asset to pass profit data as props
    setAsset(
      portfolio.assets.find((asset) => searchedAsset?.name === asset.name)
    );
  }, [dispatch, params]);

  return (
    coinSummary[coinId] && (
      <div className="flex-col justify-center w-[90%]">
        <div className="mt-9 mb-5">
          <p className="text-lg text-[#424286] dark:text-white">
            Portfolio / {coinSummary[coinId].name} summary
          </p>
        </div>
        <div className="space-y-20 lg:space-y-44">
          <div className="flex flex-col justify-center lg:flex-row space-y-16 lg:space-x-16 lg:space-y-0">
            <div className="lg:w-[55%]">
              <CoinStats
                data={coinSummary[coinId]}
                handleCopy={handleCopy}
                asset={asset}
                copied={copied}
              />
            </div>
            <div className="lg:w-[45%]">
              <DataStats data={coinSummary[coinId]} />
            </div>
          </div>
          <div className="flex flex-col justify-center lg:flex-row space-y-16 lg:space-x-16 lg:space-y-0">
            <div className="lg:w-[55%] text-[#424286] dark:text-white">
              <p>Description</p>
              <Description
                text={coinSummary[coinId].description.en}
                maxLength={750}
              />
            </div>
            <div className="lg:w-[45%] pb-10 lg:pb-0">
              <LinkSection data={coinSummary[coinId]} handleCopy={handleCopy} />
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default CoinSummary;
