"use client";

import React, { useState, useEffect } from "react";
import Asset from "@/app/components/Portfolio/Asset";
import Modal from "@/app/components/Portfolio/Modal";

export interface AssetData {
  id: string;
  symbol: string;
  name: string;
  image: string;
  total_value: number;
  // percent change?
  purchase_date: string;
  current_price: number;
  price_change_percentage_24h_in_currency: number;
  market_vs_volume: number;
  circ_vs_max: number;
}

function loadAssetsFromLocalStorage() {
  if (typeof window === "undefined") return [];

  const savedAssets = localStorage.getItem("assets");
  return savedAssets ? JSON.parse(savedAssets) : [];
}

export default function Portfolio() {
  const [assets, setAssets] = useState<AssetData[]>([]);
  const [assetToEdit, setAssetToEdit] = useState<AssetData | undefined>(
    undefined
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (asset?: AssetData) => {
    setIsModalOpen(true);
    setAssetToEdit(asset);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setAssetToEdit(undefined);
  };

  const addAsset = (newAsset: AssetData) => {
    setAssets([...assets, newAsset]);
  };

  const editAsset = (editedAsset: AssetData) => {
    setAssets(
      assets.map((asset) => (asset.id === editedAsset.id ? editedAsset : asset))
    );
  };

  const deleteAsset = (assetId: string) => {
    setAssets(assets.filter((asset) => asset.id !== assetId));
  };

  useEffect(() => {
    // Load assets from localStorage after component mounts
    const loadedAssets = loadAssetsFromLocalStorage();
    if (loadedAssets.length > 0) {
      setAssets(loadedAssets);
    }
  }, []);

  useEffect(() => {
    // Runs only on client-side
    if (typeof window !== "undefined") {
      localStorage.setItem("assets", JSON.stringify(assets));
    }
  }, [assets]);

  return (
    <div className="bg-[#f3f5f9] dark:bg-[#13121a] w-[90%]">
      <div className="flex justify-between p-4 mt-4">
        <div className="flex items-center text-[#3c3c7e] dark:text-white text-2xl">
          Portfolio
        </div>
        <button
          className="flex items-center bg-[#aaabe8] dark:bg-[#3c3c7e] text-[#3c3c7e] dark:text-white border-[#6161cb] shadow-whiteShadow rounded-md p-3 px-20"
          onClick={() => openModal()} // call without params for 'ADD' modal
        >
          Add Asset
        </button>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        onUpdateAssets={assetToEdit ? editAsset : addAsset}
        assetToEdit={assetToEdit}
        onDeleteAsset={deleteAsset}
      />
      <div className="p-3 mt-3">
        {assets.map((asset) => (
          <Asset key={asset.id} asset={asset} onEdit={() => openModal(asset)} /> // call with asset param for 'EDIT' modal
        ))}
      </div>
    </div>
  );
}
