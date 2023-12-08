"use client";

import { useState } from "react";

const TimeChart = () => {
  const [activeTime, setActiveTime] = useState("7D");

  return (
    <div className="flex bg-[#232336] w-[30%] p-1.5 rounded-[15px] my-10">
      <div
        className={`flex justify-center items-center 
              ${
                activeTime === "1D"
                  ? "bg-[#3c3c7e] border-2 border-[#6161cb]"
                  : "bg-[#232336]"
              } p-2 rounded-lg w-[17%]`}
        onClick={() => setActiveTime("1D")}
      >
        1D
      </div>
      <div
        className={`flex justify-center items-center 
              ${
                activeTime === "7D"
                  ? "bg-[#3c3c7e] border-2 border-[#6161cb]"
                  : "bg-[#232336]"
              } p-2 rounded-lg w-[17%]`}
        onClick={() => setActiveTime("7D")}
      >
        7D
      </div>
      <div
        className={`flex justify-center items-center 
              ${
                activeTime === "14D"
                  ? "bg-[#3c3c7e] border-2 border-[#6161cb]"
                  : "bg-[#232336]"
              } p-2 rounded-lg w-[17%]`}
        onClick={() => setActiveTime("14D")}
      >
        14D
      </div>
      <div
        className={`flex justify-center items-center 
              ${
                activeTime === "1M"
                  ? "bg-[#3c3c7e] border-2 border-[#6161cb]"
                  : "bg-[#232336]"
              } p-2 rounded-lg w-[17%]`}
        onClick={() => setActiveTime("1M")}
      >
        1M
      </div>
      <div
        className={`flex justify-center items-center 
              ${
                activeTime === "1Y"
                  ? "bg-[#3c3c7e] border-2 border-[#6161cb]"
                  : "bg-[#232336]"
              } p-2 rounded-lg w-[17%]`}
        onClick={() => setActiveTime("1Y")}
      >
        1Y
      </div>
      <div
        className={`flex justify-center items-center 
              ${
                activeTime === "5Y"
                  ? "bg-[#3c3c7e] border-2 border-[#6161cb]"
                  : "bg-[#232336]"
              } p-2 rounded-lg w-[17%]`}
        onClick={() => setActiveTime("5Y")}
      >
        5Y
      </div>
    </div>
  );
};

export default TimeChart;
