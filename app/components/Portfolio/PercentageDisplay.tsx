import React from "react";

interface PercentageDisplayProps {
  className?: string;
  value: number;
  isPositive: boolean;
}

const PercentageDisplay: React.FC<PercentageDisplayProps> = ({
  className = "",
  value,
  isPositive,
}) => {
  return (
    <span
      className={`${className} ${
        isPositive ? "text-[#00b1a6]" : "text-[#fe2264]"
      }`}
    >
      {value}%
    </span>
  );
};

export default PercentageDisplay;
