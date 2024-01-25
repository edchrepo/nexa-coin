import React, { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/app/store/hooks";
import { fetchProfitPercentage } from "@/app/store/slices/portfolioSlice";
import { CoinData } from "@/app/store/slices/coinsDataSlice";
import { AssetData } from "@/app/store/slices/portfolioSlice";
import Image from "next/image";
import * as Icons from "@/app/icons";
import { currencyMap, getTodayDate } from "@/app/utils/utils";
import { v4 as uuidv4 } from "uuid";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onUpdateAssets: (newAsset: AssetData) => void;
  assetToEdit?: AssetData;
  onDeleteAsset: (assetId: string) => void;
};

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onUpdateAssets,
  assetToEdit,
  onDeleteAsset,
}) => {
  const coins = useAppSelector((state) => state.coinsData);
  const currency = useAppSelector((state) => state.currency.value);
  const dispatch = useAppDispatch();
  const [selectedCoin, setSelectedCoin] = useState<CoinData | null>(null);
  const [purchasedAmount, setPurchasedAmount] = useState(0);
  const [selectedDate, setSelectedDate] = useState("");

  // change state for asset to edit
  useEffect(() => {
    if (assetToEdit) {
      setSelectedCoin(
        coins.find((coin) => coin.name === assetToEdit.name) || null
      );
      setPurchasedAmount(assetToEdit.totalValue);
      setSelectedDate(assetToEdit.purchaseDate.substring(0, 10));
    } else {
      clearModalState();
    }
  }, [assetToEdit, coins]);

  const clearModalState = () => {
    setSelectedCoin(null);
    setPurchasedAmount(0);
    setSelectedDate("");
  };

  const handleClose = () => {
    clearModalState();
    onClose();
  };

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
      setPurchasedAmount(value ? parseFloat(value) : 0);
    } else {
      setPurchasedAmount(0);
    }
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedCoin && purchasedAmount > 0 && selectedDate) {
      try {
        // dispatch thunk and wait for profit percentage result
        const profitPercentage = await dispatch(
          fetchProfitPercentage({
            assetId: selectedCoin.id,
            purchaseDate: new Date(selectedDate + "T00:00:00").toISOString(),
            currentPrice: selectedCoin.current_price,
          })
        ).unwrap();

        // Finalized asset to be created or edited
        const newAsset: AssetData = {
          id: assetToEdit ? assetToEdit.id : uuidv4(), // edited asset's id or generate new one
          symbol: selectedCoin.symbol,
          name: selectedCoin.name,
          image: selectedCoin.image,
          currency: currency,
          totalValue: purchasedAmount,
          purchaseDate: new Date(selectedDate + "T00:00:00").toISOString(), // set time to midnight for time zone differences
          profitPercentage: profitPercentage,
        };

        // update finalized asset (either add or edit)
        onUpdateAssets(newAsset);
        handleClose();
      } catch (error) {
        console.error("Error calculating profit percentage", error);
        handleClose();
      }
    }
  };

  const handleDelete = (assetId: string) => {
    onDeleteAsset(assetId);
    handleClose();
  };

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
          <button type="button" onClick={handleClose}>
            <Image className="w-7" src={Icons.Close} alt="close" />
          </button>
        </div>
        <div className="text-white flex">
          <div className="flex flex-col justify-center items-center bg-white dark:bg-[#191932] rounded-md w-3/5 mr-6">
            <div className="flex bg-[#2c2c4a] p-3 rounded-lg">
              <img
                src={assetToEdit ? assetToEdit.image : selectedCoin?.image}
                className="w-8 h-8 inline-block"
                alt={assetToEdit ? assetToEdit.name : selectedCoin?.name}
              />
            </div>
            <span className="text-[#3c3c7e] dark:text-white text-2xl text-center mt-3">
              {assetToEdit
                ? `${assetToEdit.name} (${assetToEdit.symbol?.toUpperCase()})`
                : selectedCoin?.name
                ? `${selectedCoin.name} (${selectedCoin.symbol?.toUpperCase()})`
                : "Select a coin"}
            </span>
          </div>
          <form className="flex flex-col w-full" onSubmit={handleSubmit}>
            <div className="mb-4">
              <select
                className="dark:bg-[#191925] text-secondary rounded-md p-2 w-full"
                value={selectedCoin?.id || ""}
                onChange={handleSelectChange}
              >
                <option value="" disabled>
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
              <div className="flex justify-between bg-white dark:bg-[#191925] text-secondary rounded-md p-2 w-full">
                <label>
                  Purchased Amount (
                  {currencyMap[currency as keyof typeof currencyMap]})
                </label>
                <input
                  type="number"
                  className="dark:bg-[#191925] text-right placeholder:text-secondary"
                  value={purchasedAmount}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="mb-4">
              <div className="flex justify-between bg-white dark:bg-[#191925] text-secondary rounded-md p-2 w-full">
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
                type="button"
                className="bg-[#aaabe8] dark:bg-[#232336] text-[#3c3c7e] dark:text-white rounded-md p-2 w-1/2"
                onClick={handleClose}
              >
                Cancel
              </button>
              {assetToEdit && (
                <button
                  type="button"
                  className="bg-[#aaabe8] dark:bg-[#232336] text-[#3c3c7e] dark:text-white rounded-md p-2 w-1/2"
                  onClick={() => handleDelete(assetToEdit.id)}
                >
                  Delete Asset
                </button>
              )}
              <button
                type="submit"
                className="bg-[#aaabe8] dark:bg-[#3c3c7e] text-[#3c3c7e] dark:text-white border-[#6161cb] shadow-whiteShadow rounded-md p-2 w-1/2"
              >
                Save and Continue
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;
