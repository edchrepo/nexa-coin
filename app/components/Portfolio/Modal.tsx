import React, { useState } from "react";
import { useAppSelector } from "@/app/store/hooks";
import Image from "next/image";
import * as Icons from "@/app/icons";
import { getTodayDate } from "@/app/utils/utils";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

type SelectedCoinProps = {
  symbol?: string;
  name?: string;
  image?: string;
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const coins = useAppSelector((state) => state.coinsData);
  const [selectedCoin, setSelectedCoin] = useState<SelectedCoinProps>({});
  const [purchasedAmount, setPurchasedAmount] = useState(0);
  const [selectedDate, setSelectedDate] = useState("");

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCoinId = e.target.value;
    const matchedCoin = coins.find((coin) => coin.id === selectedCoinId);
    if (matchedCoin) {
      setSelectedCoin(matchedCoin);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (parseFloat(value) > 0) {
      setPurchasedAmount(parseFloat(value));
    } else {
      setPurchasedAmount(0);
    }
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
  };

  const clearModalState = () => {
    setSelectedCoin({});
    setPurchasedAmount(0);
    setSelectedDate("");
  };

  const handleClose = () => {
    clearModalState();
    onClose();
  };

  const handleSubmit = () => {};

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-50 ${
        isOpen ? "flex" : "hidden"
      } items-center justify-center backdrop-blur-sm`}
    >
      <div className="bg-[#a2a3e8] dark:bg-[#13121a] rounded-xl p-10 max-w-3xl w-full mx-auto z-50 relative">
        <div className="flex justify-between items-center mb-4">
          <span className="text-[#3c3c7e] dark:text-white text-lg">
            Select Coins
          </span>
          <button onClick={handleClose}>
            <Image className="w-7" src={Icons.Close} alt="close" />
          </button>
        </div>
        <div className="text-white flex">
          <div className="flex flex-col justify-center items-center bg-white dark:bg-[#191932] rounded-md w-3/5 mr-6">
            <div className="flex bg-[#2c2c4a] p-3 rounded-lg">
              <img
                src={selectedCoin.image}
                className="w-8 h-8 inline-block"
                alt={selectedCoin.name}
              />
            </div>
            <span className="text-[#3c3c7e] dark:text-white text-2xl mt-3">
              {selectedCoin.name
                ? `${selectedCoin.name} (${selectedCoin.symbol?.toUpperCase()})`
                : "Select a coin"}
            </span>
          </div>
          <div className="flex flex-col w-full">
            <div className="mb-4">
              <select
                className="dark:bg-[#191925] text-secondary rounded-md p-2 w-full"
                onChange={handleSelectChange}
              >
                <option value="" disabled selected>
                  Select coins
                </option>
                {coins.map((coin) => (
                  <option key={coin.id} value={coin.id}>
                    {coin.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <div className="flex justify-between dark:bg-[#191925] text-secondary rounded-md p-2 w-full">
                <label>Purchased Amount</label>
                <input
                  type="number"
                  className="dark:bg-[#191925] text-right placeholder:text-secondary"
                  placeholder="0"
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="mb-4">
              <div className="flex justify-between dark:bg-[#191925] text-secondary rounded-md p-2 w-full">
                <label>Purchased Date</label>
                <input
                  type="date"
                  className="dark:bg-[#191925] text-right"
                  value={selectedDate}
                  max={getTodayDate()}
                  onChange={handleDateChange}
                />
              </div>
            </div>
            <div className="flex space-x-2 mt-4">
              <button
                className="bg-[#aaabe8] dark:bg-[#232336] text-[#3c3c7e] dark:text-white rounded-md p-2 w-1/2"
                onClick={handleClose}
              >
                Cancel
              </button>
              <button
                className="bg-[#aaabe8] dark:bg-[#3c3c7e] text-[#3c3c7e] dark:text-white border-[#6161cb] shadow-whiteShadow rounded-md p-2 w-1/2"
                onClick={onClose}
              >
                Save and Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
