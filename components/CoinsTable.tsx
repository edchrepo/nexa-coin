"use client";

import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/store/hooks";
import { fetchCoinsData } from "../app/store/slices/coinsDataSlice";
import Image from "next/image";
import * as Icons from "../icons";
import { CoinData } from "../app/store/slices/coinsDataSlice";
import CoinRow from "./CoinRow";
import InfiniteScroll from "react-infinite-scroll-component";

type SortKey = keyof CoinData;

const CoinsTable = () => {
  const dispatch = useAppDispatch();
  const coins = useAppSelector((state) => state.coinsData);
  const [sortedCoins, setSortedCoins] = useState<CoinData[]>([]);
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });
  const [page, setPage] = useState(1);
  const [apiError, setApiError] = useState(false);

  const handleSort = (key: SortKey) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });

    const sortedData = [...coins].sort((a, b) => {
      if (key in a && key in b) {
        if (a[key] < b[key]) {
          return direction === "ascending" ? -1 : 1;
        }
        if (a[key] > b[key]) {
          return direction === "ascending" ? 1 : -1;
        }
      }
      return 0;
    });

    setSortedCoins(sortedData);
  };

  const fetchMoreData = () => {
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    dispatch(fetchCoinsData(page))
      .unwrap()
      .catch(() => {
        setApiError(true);
      });
  }, [dispatch, page]);

  useEffect(() => {
    setSortedCoins(coins);
  }, [coins]);

  return (
    <div>
      <div className="grid grid-cols-48 gap-2 text-left text-[#3c3c7e] dark:text-secondary mt-20 mb-5">
        <div className="col-span-2 text-center">#</div>
        <div className="flex items-center justify-left col-span-6">
          <div className="mr-1">Name</div>
          <Image
            className="h-5 w-5 cursor-pointer"
            src={Icons.Sort}
            alt="sort"
            onClick={() => handleSort("name" as SortKey)}
          />
        </div>
        <div className="flex items-center justify-left col-span-4">
          <div className="mr-1">Price</div>
          <Image
            className="h-5 w-5 cursor-pointer"
            src={Icons.Sort}
            alt="sort"
            onClick={() => handleSort("current_price" as SortKey)}
          />
        </div>
        <div className="flex items-center justify-left col-span-4">
          <div className="mr-1">1h%</div>
          <Image
            className="h-5 w-5 cursor-pointer"
            src={Icons.Sort}
            alt="sort"
            onClick={() =>
              handleSort("price_change_percentage_1h_in_currency" as SortKey)
            }
          />
        </div>
        <div className="flex items-center justify-left col-span-4">
          <div className="mr-1">24h%</div>
          <Image
            className="h-5 w-5 cursor-pointer"
            src={Icons.Sort}
            alt="sort"
            onClick={() =>
              handleSort("price_change_percentage_24h_in_currency" as SortKey)
            }
          />
        </div>
        <div className="flex items-center justify-left col-span-4">
          <div className="mr-1">7d%</div>
          <Image
            className="h-5 w-5 cursor-pointer"
            src={Icons.Sort}
            alt="sort"
            onClick={() =>
              handleSort("price_change_percentage_7d_in_currency" as SortKey)
            }
          />
        </div>
        <div className="col-span-8">24h Volume / Market Cap</div>
        <div className="col-span-8">Circulating / Total Supply</div>
        <div className="col-span-6">Last 7d</div>
      </div>
      <InfiniteScroll
        dataLength={coins.length}
        next={fetchMoreData}
        hasMore={true}
        loader={
          <p className="text-center mt-4">
            {apiError ? "No more coins to load" : "Loading more coins..."}
          </p>
        }
      >
        {sortedCoins.map((coin, index) => (
          <CoinRow key={coin.id} coin={coin} index={index} />
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default CoinsTable;
