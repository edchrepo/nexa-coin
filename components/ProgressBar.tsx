/* Reference ProgressBar https://www.geeksforgeeks.org/how-to-create-a-custom-progress-bar-component-in-react-js/# */
import React from "react";
import { CSSProperties } from "react";

interface ProgressBarProps {
  progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  const Parentdiv: CSSProperties = {
    width: "100%",
    backgroundColor: "whitesmoke",
    borderRadius: 40,
  };

  const Childdiv: CSSProperties = {
    width: `${progress}%`,
    backgroundColor: "#636363",
    borderRadius: 40,
    textAlign: "right",
  };

  const progresstext: CSSProperties = {
    color: "black",
    fontWeight: "bold",
  };

  return (
    <div style={Parentdiv}>
      <div style={Childdiv}>
        <span style={progresstext}>{`${progress}%`}</span>
      </div>
    </div>
  );
};

export default ProgressBar;
