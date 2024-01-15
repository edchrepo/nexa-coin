"use client";

import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import {
  addAsset,
  editAsset,
  deleteAsset,
} from "@/app/store/slices/portfolioSlice";
import { AssetData } from "@/app/store/slices/portfolioSlice";
import Asset from "@/app/components/Portfolio/Asset";
import Modal from "@/app/components/Portfolio/Modal";

export default function Portfolio() {
  const assets = useAppSelector((state) => state.portfolio.assets);
  const dispatch = useAppDispatch();
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

  const handleUpdateAssets = (asset: AssetData) => {
    if (assetToEdit) {
      dispatch(editAsset(asset));
    } else {
      dispatch(addAsset(asset));
    }
    closeModal();
  };

  const handleDeleteAsset = (assetId: string) => {
    dispatch(deleteAsset(assetId));
  };

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
        onUpdateAssets={handleUpdateAssets}
        assetToEdit={assetToEdit}
        onDeleteAsset={handleDeleteAsset}
      />
      <div className="p-3 mt-3">
        {assets.map((asset) => (
          <Asset key={asset.id} asset={asset} onEdit={() => openModal(asset)} /> // call with asset param for 'EDIT' modal
        ))}
      </div>
    </div>
  );
}
