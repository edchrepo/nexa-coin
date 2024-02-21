import React from "react";

const CoinSkeleton = () => {
  return (
    <div className="flex items-center border-2 bg-gray-200 dark:bg-[#181825] border-white dark:border-[#181825] rounded-md m-1 p-2 h-15 w-30 lg:h-20 lg:w-50 lg:my-3 animate-pulse">
      {/* Image */}
      <div className="h-7 w-7 mx-2 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
      <div className="flex flex-col ml-2">
        {/* Name and Symbol */}
        <div className="h-4 w-16 bg-gray-300 dark:bg-gray-700 rounded xl:mb-2"></div>
        {/* Price */}
        <div className="hidden xl:flex">
          <div className="h-4 w-16 bg-gray-300 dark:bg-gray-700 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default CoinSkeleton;
