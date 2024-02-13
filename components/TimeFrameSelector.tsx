"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setTimeFrame } from "@/store/slices/timeSlice";

const timeFrameOptions = [
  { value: 1, label: "1D" },
  { value: 7, label: "7D" },
  { value: 14, label: "14D" },
  { value: 30, label: "1M" },
  { value: 365, label: "1Y" },
  { value: 1325, label: "5Y" },
];

const TimeChart = () => {
  const dispatch = useAppDispatch();
  const timeSelected = useAppSelector((state) => state.time);

  const handleTimeFrameChange = (timeFrame: number) => {
    dispatch(setTimeFrame(timeFrame));
  };

  return (
    <div className="flex bg-[#e4e5f9] dark:bg-[#232336] md:w-[30%] w-[100%] p-1.5 rounded-[15px] my-10 text-[#3c3c7e] dark:text-white">
      {timeFrameOptions.map(({ value, label }) => (
        <div
          key={value}
          className={`flex justify-center items-center 
            ${
              timeSelected.timeFrame === value
                ? "bg-[#a2a3e8] dark:bg-[#3c3c7e] border-2 border-[#6161cb] shadow-whiteShadow"
                : "bg-[#e4e5f9] dark:bg-[#232336]"
            } p-2 rounded-lg w-[17%]`}
          onClick={() => handleTimeFrameChange(value)}
        >
          {label}
        </div>
      ))}
    </div>
  );
};

export default TimeChart;
