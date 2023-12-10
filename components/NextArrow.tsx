import React from "react";

type ArrowProps = {
  className?: string;
  onClick?: () => void;
};

const NextArrow: React.FC<ArrowProps> = ({ className, onClick }) => {
  return <div className={`${className}`} onClick={onClick} />;
};

export default NextArrow;
