"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/store/hooks";
import { fetchCoinsData } from "../app/store/slices/coinsDataSlice";
import CoinRow from "./CoinRow";

const CoinsTable = () => {
  const dispatch = useAppDispatch();
  const coins = useAppSelector((state) => state.coinsData);

  useEffect(() => {
    dispatch(fetchCoinsData());
  }, [dispatch]);

  return (
    <div>
      <div className="grid grid-cols-48 gap-2 text-left text-[#3c3c7e] dark:text-secondary mt-20 mb-5">
        <div className="col-span-2 text-center">#</div>
        <div className="col-span-6">Name</div>
        <div className="col-span-4">Price</div>
        <div className="col-span-4">1h%</div>
        <div className="col-span-4">24h%</div>
        <div className="col-span-4">7d%</div>
        <div className="col-span-8">24h Volume / Market Cap</div>
        <div className="col-span-8">Circulating / Total Supply</div>
        <div className="col-span-6">Last 7d</div>
      </div>
      {coins.map((coin, index) => (
        <CoinRow key={coin.id} coin={coin} index={index} />
      ))}
    </div>
  );
};

export default CoinsTable;
