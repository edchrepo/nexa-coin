"use client";

import { useState } from "react";

type DescriptionProps = {
  text: string;
  maxLength: number;
};

const Description: React.FC<DescriptionProps> = ({ text, maxLength }) => {
  const [isTruncated, setIsTruncated] = useState(true);

  const endOfText = isTruncated ? text.slice(0, maxLength) + "..." : text;

  const toggleIsTruncated = () => {
    setIsTruncated(!isTruncated);
  };

  return (
    <div>
      <p dangerouslySetInnerHTML={{ __html: endOfText }}></p>
      {text.length > maxLength && (
        <button className="text-[#7272ab]" onClick={toggleIsTruncated}>
          {isTruncated ? "Read more" : "Read less"}
        </button>
      )}
    </div>
  );
};

export default Description;
