"use client";

import { useState, useEffect, useRef } from "react";
import { CoinData } from "@/store/slices/coinsDataSlice";
import Image from "next/image";
import { WhiteDownArrow } from "@/icons";

interface CustomSelectProps {
  options: CoinData[];
  selectedValue?: CoinData;
  onSelect: (selectedCoin: CoinData) => void;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  onSelect,
  selectedValue,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSelect = (option: CoinData) => {
    onSelect(option);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!dropdownRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        {/* Display selected item */}
        <div className="flex items-center space-x-2">
          <img
            src={selectedValue?.image}
            alt={selectedValue?.name}
            className="w-5 h-5"
          />
          <p>
            {selectedValue?.name} ({selectedValue?.symbol.toUpperCase()})
          </p>
          <Image className="w-2 h-2" src={WhiteDownArrow} alt="arrow" />
        </div>
      </div>

      {/* Display dropdown options when clicked */}
      {isOpen && (
        <div className="absolute z-10 bg-white dark:bg-[#1e1932] max-h-[500px] w-full overflow-y-auto">
          {options.map((option) => (
            <div
              key={option.id}
              className="flex items-center space-x-2 cursor-pointer p-1 hover:bg-[#503f92]"
              onClick={() => handleSelect(option)}
            >
              <img src={option.image} alt={option.name} className="w-5 h-5" />
              <p>
                {option.name} ({option.symbol.toUpperCase()})
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
