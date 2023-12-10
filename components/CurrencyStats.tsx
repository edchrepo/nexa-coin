"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import * as Icons from "../icons";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Currency from "./Currency";

const CurrencyStats = () => {
  const [compare, setCompare] = useState(false);
  const coins = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const slider = useRef<any>(null);
  const [showPrev, setShowPrev] = useState(false);
  const [showNext, setShowNext] = useState(true);

  const settings = {
    speed: 1000,
    slidesToShow: 5,
    autoplay: true,
    arrows: false,
    infinite: false,
    beforeChange: (_: number, newIndex: number) => {
      setShowPrev(newIndex > 0);
      setShowNext(newIndex < coins.length - 5);
    },
    afterChange: (currentSlide: number) => {
      setShowPrev(currentSlide > 0);
      setShowNext(currentSlide < coins.length - 5);
    },
  };

  return (
    <div className="relative bg-[#13121a] flex-col justify-center mx-auto">
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
              className="h-5 w-5 -ml-1.5 mr-3"
              src={Icons.Exit}
              alt="Dark"
            />
          ) : (
            <Image
              className="h-6 w-6 -ml-1.5 mr-3"
              src={Icons.Comparison}
              alt="Light"
            />
          )}
          {compare ? "Exit comparison" : "Compare"}
        </button>
      </div>
      <div className="relative">
        <Slider ref={slider} {...settings} className="mt-4 mb-8">
          {coins.map((index) => (
            <div key={index}>
              <Currency />
            </div>
          ))}
        </Slider>
        {showPrev && (
          <button
            onClick={() => slider.current?.slickPrev()}
            className="flex items-center absolute left-0 -ml-6 z-10 bg-[#3c3c7e] border-2 border-[#6161cb] bg-opacity-95 p-3 h-10 w-10 rounded-full -translate-y-1/2 top-1/2"
          >
            <Image className="h-7 w-7" src={Icons.LeftArrow} alt="Left" />
          </button>
        )}
        {showNext && (
          <button
            onClick={() => slider.current?.slickNext()}
            className="flex items-center absolute right-0 -mr-7 z-10 bg-[#3c3c7e] border-2 border-[#6161cb] bg-opacity-95 p-3 h-10 w-10 rounded-full -translate-y-1/2 top-1/2"
          >
            <Image className="h-7 w-7" src={Icons.RightArrow} alt="Right" />
          </button>
        )}
      </div>
    </div>
  );
};

export default CurrencyStats;
