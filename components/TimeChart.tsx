"use client";

import { useAppDispatch, useAppSelector } from "../app/store/hooks";
import { setTimeFrame } from "../app/store/slices/timeSlice";

const TimeChart = () => {
  const dispatch = useAppDispatch();
  const timeSelected = useAppSelector((state) => state.time);

  const handleTimeFrameChange = (timeFrame: number) => {
    dispatch(setTimeFrame(timeFrame));
  };

  return (
    <div className="flex bg-[#e4e5f9] dark:bg-[#232336] w-[30%] p-1.5 rounded-[15px] my-10 text-[#3c3c7e] dark:text-white">
      <div
        className={`flex justify-center items-center 
              ${
                timeSelected.timeFrame === 1
                  ? "bg-[#a2a3e8] dark:bg-[#3c3c7e] border-2 border-[#6161cb] shadow-whiteShadow"
                  : "bg-[#e4e5f9] dark:bg-[#232336]"
              } p-2 rounded-lg w-[17%]`}
        onClick={() => handleTimeFrameChange(1)}
      >
        1D
      </div>
      <div
        className={`flex justify-center items-center 
              ${
                timeSelected.timeFrame === 7
                  ? "bg-[#a2a3e8] dark:bg-[#3c3c7e] border-2 border-[#6161cb] shadow-whiteShadow"
                  : "bg-[#e4e5f9] dark:bg-[#232336]"
              } p-2 rounded-lg w-[17%]`}
        onClick={() => handleTimeFrameChange(7)}
      >
        7D
      </div>
      <div
        className={`flex justify-center items-center 
              ${
                timeSelected.timeFrame === 14
                  ? "bg-[#a2a3e8] dark:bg-[#3c3c7e] border-2 border-[#6161cb] shadow-whiteShadow"
                  : "bg-[#e4e5f9] dark:bg-[#232336]"
              } p-2 rounded-lg w-[17%]`}
        onClick={() => handleTimeFrameChange(14)}
      >
        14D
      </div>
      <div
        className={`flex justify-center items-center 
              ${
                timeSelected.timeFrame === 30
                  ? "bg-[#a2a3e8] dark:bg-[#3c3c7e] border-2 border-[#6161cb] shadow-whiteShadow"
                  : "bg-[#e4e5f9] dark:bg-[#232336]"
              } p-2 rounded-lg w-[17%]`}
        onClick={() => handleTimeFrameChange(30)}
      >
        1M
      </div>
      <div
        className={`flex justify-center items-center 
              ${
                timeSelected.timeFrame === 365
                  ? "bg-[#a2a3e8] dark:bg-[#3c3c7e] border-2 border-[#6161cb] shadow-whiteShadow"
                  : "bg-[#e4e5f9] dark:bg-[#232336]"
              } p-2 rounded-lg w-[17%]`}
        onClick={() => handleTimeFrameChange(365)}
      >
        1Y
      </div>
      <div
        className={`flex justify-center items-center 
              ${
                timeSelected.timeFrame === 1325
                  ? "bg-[#a2a3e8] dark:bg-[#3c3c7e] border-2 border-[#6161cb] shadow-whiteShadow"
                  : "bg-[#e4e5f9] dark:bg-[#232336]"
              } p-2 rounded-lg w-[17%]`}
        onClick={() => handleTimeFrameChange(1325)}
      >
        5Y
      </div>
    </div>
  );
};

export default TimeChart;
