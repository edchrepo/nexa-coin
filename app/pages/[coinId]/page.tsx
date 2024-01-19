"use client";

import CoinStats from "../../components/CoinSummary/CoinStats"
import DataStats from "../../components/CoinSummary/DataStats";
import Description from "../../components/CoinSummary/Description";
import LinkSection from "../../components/CoinSummary/LinkSection";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { fetchCoinSummary } from "@/app/store/slices/coinSummarySlice";
import { AssetData } from "@/app/store/slices/portfolioSlice";

const CoinSummary = () => {
  const dispatch = useAppDispatch();
  const [asset, setAsset] = useState<AssetData | undefined>(
    undefined
  );
  const params = useParams();
  const coinId = params.coinId as string;
  const coinSummary = useAppSelector((state) => state.coinSummary);
  const coins = useAppSelector((state) => state.coinsData)
  const portfolio = useAppSelector((state) => state.portfolio)

  const handleCopy = (link: string) => {
    navigator.clipboard.writeText(link)
  };

  useEffect(() => {
    dispatch(fetchCoinSummary(coinId));
    const searchedAsset = coins.find((coin) => coin.id === coinId)
    // Set asset to pass profit data as props
    setAsset(portfolio.assets.find((asset) => searchedAsset?.name === asset.name))
  }, [dispatch, params]);

  return (
    coinSummary[coinId] && (
      <div className="flex-col justify-center w-[90%]">
        <div className="mt-9 mb-5">
          <p className="text-lg text-[#424286] dark:text-white">
            Portfolio / {coinSummary[coinId].name} summary
          </p>
        </div>
        <div className="space-y-44">
          <div className="flex justify-center space-x-16">
            <div className="w-[55%]">
              <CoinStats data={coinSummary[coinId]} handleCopy={handleCopy} asset={asset}/>
            </div>
            <div className="w-[45%]">
              <DataStats data={coinSummary[coinId]} />
            </div>
          </div>
          <div className="flex justify-center space-x-16">
            <div className="w-[55%] text-[#424286] dark:text-white">
              <p>Description</p>
              <Description
                text={coinSummary[coinId].description.en}
                maxLength={750}
              />
            </div>
            <div className="w-[45%]">
              <LinkSection data={coinSummary[coinId]} handleCopy={handleCopy} />
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default CoinSummary;