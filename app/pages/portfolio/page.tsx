"use client";

import React, { useState } from "react";
import Asset from "@/app/components/Portfolio/Asset";
import Modal from "@/app/components/Portfolio/Modal";

export interface AssetData {
  id: string;
  symbol: string;
  name: string;
  image: string;
  total_value: number;
  // percent change?
  purchase_date: Date;
  current_price: number;
  price_change_percentage_24h_in_currency: number;
  market_vs_volume: number;
  circ_vs_max: number;
}

export default function Portfolio() {
  const [assets, setAssets] = useState<AssetData[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const addAsset = (newAsset: AssetData) => {
    setAssets([...assets, newAsset]);
  };

  return (
    <div className="bg-[#f3f5f9] dark:bg-[#13121a] w-[90%]">
      <div className="flex justify-between p-4 mt-4">
        <div className="flex items-center text-[#3c3c7e] dark:text-white text-2xl">
          Portfolio
        </div>
        <button
          className="flex items-center bg-[#aaabe8] dark:bg-[#3c3c7e] text-[#3c3c7e] dark:text-white border-[#6161cb] shadow-whiteShadow rounded-md p-3 px-20"
          onClick={openModal}
        >
          Add Asset
        </button>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal} onAddAsset={addAsset} />
      <div className="p-3 mt-3">
        {assets.map((asset) => (
          <Asset key={asset.id} asset={asset} />
        ))}
      </div>
    </div>
  );
}
