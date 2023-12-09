"use client";

import { useState } from "react";
import Image from "next/image";
import * as Icons from "../icons";
import Currency from "./Currency";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";

const CurrencyStats = () => {
  const [compare, setCompare] = useState(false);
  const coins = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

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
      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={7}
        slidesPerView={5}
        navigation
        autoplay
        className="mt-4 mb-8"
      >
        {coins.map((index) => (
          <SwiperSlide key={index}>
            <Currency />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CurrencyStats;
