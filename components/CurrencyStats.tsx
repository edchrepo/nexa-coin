"use client";

import { useState } from "react";
import Image from "next/image";
import * as Icons from "../icons";
import Currency from "./Currency";

const CurrencyStats = () => {
  const [compare, setCompare] = useState(false);

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

        {/* Map each coin and set activeCoin. Carousel effect here */}
      </div>
    </div>
  );
};

export default CurrencyStats;
