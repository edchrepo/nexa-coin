"use client";

import React, { useState, useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchCoinsData } from "@/store/slices/coinsDataSlice";
import {
  addCoin,
  removeCoin,
  removeAllCoins,
} from "@/store/slices/selectedCoinSlice";
import Image from "next/image";
import * as Icons from "@/icons";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Coin from "./Coin";
import CoinSkeleton from "./CoinSkeleton";

const CoinCarousel = () => {
  const [compare, setCompare] = useState(false);
  const slider = useRef<any>(null);
  const [showPrev, setShowPrev] = useState(false);
  const [showNext, setShowNext] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const selectedCoins = useAppSelector((state) => state.selectedCoinData.coins);
  const coins = useAppSelector((state) => state.coinsData);
  const maxSlides = 6;
  const slidesToShow = Math.max(maxSlides - selectedCoins.length, 1); // carousel length based on selected coins
  const selectedWidthPercent = (selectedCoins.length / maxSlides) * 100; // dynamic width for selected
  const restWidthPercent = 100 - selectedWidthPercent; // dynamic width for rest

  const settings = {
    speed: 1000,
    slidesToShow: slidesToShow,
    autoplay: true,
    arrows: false,
    infinite: false,
    beforeChange: (_: number, newIndex: number) => {
      setShowPrev(newIndex > 0);
      setShowNext(newIndex < coins.length - 6);
    },
    afterChange: (currentSlide: number) => {
      setShowPrev(currentSlide > 0);
      setShowNext(currentSlide < coins.length - 6);
    },
    responsive: [
      {
        breakpoint: 550,
        settings: {
          slidesToShow: Math.max(3 - selectedCoins.length, 1),
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: Math.max(4 - selectedCoins.length, 1),
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.max(5 - selectedCoins.length, 1),
        },
      },
    ],
  };

  const selectedCoinsSliderSettings = {
    speed: 500,
    slidesToShow: selectedCoins.length || 1,
    swipe: false,
    draggable: false,
    arrows: false,
    infinite: false,
  };

  const handleSelectedCurrency = (coinId: string) => {
    if (selectedCoins.includes(coinId)) {
      dispatch(removeCoin(coinId));
    }
    // Don't allow users to select more than 1 coin in default mode
    // Don't allow users to select more than 3 coins in compare mode
    else if (!compare && selectedCoins.length >= 1) return;
    else if (compare && selectedCoins.length >= 3) return;
    else dispatch(addCoin(coinId));
  };

  const handleCompare = () => {
    if (compare) {
      dispatch(removeAllCoins());
    }
    setCompare(!compare);
  };

  useEffect(() => {
    setIsLoading(true);
    dispatch(fetchCoinsData(1))
      .unwrap()
      .then(() => setIsLoading(false))
      .catch(() => setIsLoading(false));
  }, [dispatch]);

  return (
    <div className="relative bg-[#f3f5f9] dark:bg-[#13121a] flex-col justify-center mx-auto">
      <div className="flex justify-between">
        <div className="flex items-end text-[#3c3c7e] dark:text-secondary">
          Select the currency to view statistics
        </div>
        <button
          className="flex items-center bg-white dark:bg-[#232336] text-[#3c3c7e] dark:text-white rounded-md p-3 px-8"
          onClick={handleCompare}
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
      <div className="flex relative">
        {selectedCoins.length > 0 && (
          <div style={{ width: `${selectedWidthPercent}%` }}>
            <Slider {...selectedCoinsSliderSettings} className="mt-4 mb-4">
              {selectedCoins.map((coinId) => {
                const coin = coins.find((c) => c.id === coinId);
                return (
                  coin && (
                    <div
                      key={coin.id}
                      onClick={() => handleSelectedCurrency(coin.id)}
                    >
                      <Coin coin={coin} isSelected={true} compare={compare} />
                    </div>
                  )
                );
              })}
            </Slider>
          </div>
        )}
        <div style={{ width: `${restWidthPercent}%` }}>
          <Slider ref={slider} {...settings} className="mt-4 mb-4">
            {isLoading
              ? Array.from({ length: maxSlides }).map((_, index) => (
                  <CoinSkeleton key={index} />
                ))
              : coins
                  .filter((coin) => !selectedCoins.includes(coin.id))
                  .map((coin) => (
                    <div
                      key={coin.id}
                      onClick={() => handleSelectedCurrency(coin.id)}
                    >
                      <Coin
                        coin={coin}
                        isSelected={selectedCoins.includes(coin.id)}
                        compare={compare}
                      />
                    </div>
                  ))}
          </Slider>
        </div>
        {coins && showPrev && (
          <button
            onClick={() => slider.current?.slickPrev()}
            className="hidden lg:flex items-center absolute left-0 -ml-6 z-10 bg-[#aaabe8] dark:bg-[#3c3c7e] border-2 border-[#6161cb] shadow-whiteShadow bg-opacity-95 p-3 h-10 w-10 rounded-full -translate-y-1/2 top-1/2"
          >
            <Image className="h-7 w-7" src={Icons.LeftArrow} alt="Left" />
          </button>
        )}
        {coins && showNext && (
          <button
            onClick={() => slider.current?.slickNext()}
            className="hidden lg:flex items-center absolute right-0 -mr-7 z-10 bg-[#aaabe8] dark:bg-[#3c3c7e] border-2 border-[#6161cb] shadow-whiteShadow bg-opacity-95 p-3 h-10 w-10 rounded-full -translate-y-1/2 top-1/2"
          >
            <Image className="h-7 w-7" src={Icons.RightArrow} alt="Right" />
          </button>
        )}
      </div>
    </div>
  );
};

export default CoinCarousel;
