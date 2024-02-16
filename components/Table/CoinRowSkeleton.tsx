import React from "react";

const CoinRowSkeleton = () => {
  return (
    <div className="grid grid-cols-3 lg:grid-cols-48 gap-2 bg-gray-200 animate-pulse rounded-xl my-2 p-4">
      {/* Index */}
      <div className="hidden lg:block col-span-1">
        <div className="h-4 bg-gray-300 rounded-full"></div>
      </div>
      {/* Img, Name, Symbol */}
      <div className="col-span-1 lg:col-span-7 flex items-center space-x-2">
        <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
        <div className="flex-1">
          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2 mt-2"></div>{" "}
        </div>
      </div>
      {/* Price */}
      <div className="col-span-1 lg:col-span-4">
        <div className="h-4 bg-gray-300 rounded"></div>
      </div>
      {/* 1hr% */}
      <div className="hidden lg:flex col-span-4 items-center">
        <div className="h-4 bg-gray-300 rounded w-full"></div>
      </div>
      {/* 24h% */}
      <div className="hidden lg:flex col-span-4 items-center">
        <div className="h-4 bg-gray-300 rounded w-full"></div>
      </div>
      {/* 7d% */}
      <div className="hidden lg:flex col-span-4 items-center">
        <div className="h-4 bg-gray-300 rounded w-full"></div>
      </div>
      {/* 24h Volume / Market Cap */}
      <div className="hidden lg:flex col-span-8">
        <div className="h-4 bg-gray-300 rounded w-full"></div>
      </div>
      {/* Circulating / Total Supply */}
      <div className="hidden lg:flex col-span-8">
        <div className="h-4 bg-gray-300 rounded w-full"></div>
      </div>
      {/* Last 7d Chart */}
      <div className="lg:col-span-6 col-span-3">
        <div className="h-24 bg-gray-300 rounded"></div>
      </div>
    </div>
  );
};

export default CoinRowSkeleton;
