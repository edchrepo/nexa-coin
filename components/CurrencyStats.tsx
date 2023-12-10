"use client";

import { useState } from "react";
import Image from "next/image";
import * as Icons from "../icons";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Currency from "./Currency";
import PrevArrow from "./PrevArrow";
import NextArrow from "./NextArrow";

const CurrencyStats = () => {
  const [compare, setCompare] = useState(false);
  const coins = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const settings = {
    speed: 1000,
    slidesToShow: 5,
    autoplay: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <div>
      <div className="flex justify-between text-secondary">
        <div className="flex items-end">
          Select the currency to view statistics
        </div>
        <button
          className="flex items-center bg-[#232336] text-white rounded-md p-3 px-8"
          onClick={() => setCompare(!compare)}
        >
          {compare ? (
            <Image
              className="h-7 w-7 -ml-1.5 mr-2"
              src={Icons.Dark}
              alt="Dark"
            />
          ) : (
            <Image
              className="h-7 w-7 -ml-1.5 mr-2"
              src={Icons.Light}
              alt="Light"
            />
          )}
          {compare ? "Exit comparison" : "Compare"}
        </button>
      </div>
      <Slider {...settings}>
        {coins.map((index) => (
          <div key={index}>
            <Currency />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CurrencyStats;
