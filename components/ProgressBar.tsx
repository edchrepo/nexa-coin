/* Reference ProgressBar https://www.geeksforgeeks.org/how-to-create-a-custom-progress-bar-component-in-react-js/# */
import React from "react";
import { CSSProperties } from "react";

interface ProgressBarProps {
  progress: number;
  color?: string;
  secondaryColor?: string;
  height?: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  color = "#71797E",
  secondaryColor = "#E5E4E2",
  height = 10,
}) => {
  const Parentdiv: CSSProperties = {
    width: "100%",
    height: height,
    backgroundColor: secondaryColor,
    borderRadius: 30,
  };

  const Childdiv: CSSProperties = {
    width: `${progress}%`,
    height: height,
    backgroundColor: color,
    borderRadius: 30,
    textAlign: "right",
  };

  return (
    <div style={Parentdiv}>
      <div style={Childdiv}>
        <span>&#8203;</span>
      </div>
    </div>
  );
};

export default ProgressBar;
