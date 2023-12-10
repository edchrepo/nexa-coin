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
            className="absolute left-0 z-10 bg-blue-500 text-white p-2 rounded-full -translate-y-1/2 top-1/2"
          >
            Prev
          </button>
        )}
        {showNext && (
          <button
            onClick={() => slider.current?.slickNext()}
            className="absolute right-0 z-10 bg-blue-500 text-white p-2 rounded-full -translate-y-1/2 top-1/2"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default CurrencyStats;
