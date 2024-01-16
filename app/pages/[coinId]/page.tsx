"use client";

import CoinData from "../../components/CoinSummary/CoinStats"
import DataStats from "../../components/CoinSummary/DataStats";
import Description from "../../components/CoinSummary/Description";
import LinkSection from "../../components/CoinSummary/LinkSection";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { fetchCoinSummary } from "@/app/store/slices/coinSummarySlice";

const CoinSummary = () => {
  const dispatch = useAppDispatch();
  const params = useParams();
  const coinId = params.coinId as string;
  const coinSummary = useAppSelector((state) => state.coinSummary);

  useEffect(() => {
    dispatch(fetchCoinSummary(coinId));
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
              <CoinData data={coinSummary[coinId]} />
            </div>
            <div className="w-[45%]">
              <DataStats data={coinSummary[coinId]} />
            </div>
          </div>
          <div className="flex justify-center space-x-16">
            <div className="w-[55%]">
              <p>Description</p>
              <Description
                text={coinSummary[coinId].description.en}
                maxLength={750}
              />
            </div>
            <div className="w-[45%]">
              <LinkSection data={coinSummary[coinId]} />
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default CoinSummary;