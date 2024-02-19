import React from "react";

const CoinRowSkeleton = () => {
  return (
    <div className="grid grid-cols-3 lg:grid-cols-48 gap-2 items-center bg-gray-200 dark:bg-gray-600 animate-pulse rounded-xl my-2 p-4">
      {/* Index */}
      <div className="hidden lg:block col-span-1">
        <div className="h-4 w-2 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
      </div>
      {/* Img, Name, Symbol */}
      <div className="col-span-1 lg:col-span-7 flex space-x-2 order-1 lg:order-none">
        <div className="w-8 h-8 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
        <div className="flex flex-col lg:flex-row">
          <div className="h-4 w-3/4 bg-gray-300 dark:bg-gray-700 rounded"></div>
          <div className="h-4 w-1/2 bg-gray-300 dark:bg-gray-700 rounded"></div>{" "}
        </div>
      </div>
      {/* Price */}
      <div className="col-span-1 lg:col-span-4 flex order-3 lg:order-none">
        <div className="h-4 w-16 lg:w-8 bg-gray-300 dark:bg-gray-700 rounded"></div>
      </div>
      {/* 1hr% */}
      <div className="hidden lg:flex col-span-4">
        <div className="h-4 w-8 bg-gray-300 dark:bg-gray-700 rounded"></div>
      </div>
      {/* 24h% */}
      <div className="hidden lg:flex col-span-4">
        <div className="h-4 w-8 bg-gray-300 dark:bg-gray-700 rounded"></div>
      </div>
      {/* 7d% */}
      <div className="hidden lg:flex col-span-4">
        <div className="h-4 w-8 bg-gray-300 dark:bg-gray-700 rounded"></div>
      </div>
      {/* 24h Volume / Market Cap */}
      <div className="hidden lg:flex col-span-8">
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
      </div>
      {/* Circulating / Total Supply */}
      <div className="hidden lg:flex col-span-8">
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
      </div>
      {/* Last 7d Chart */}
      <div className="col-span-1 lg:col-span-6 order-2 lg:order-none">
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
      </div>
    </div>
  );
};

export default CoinRowSkeleton;
