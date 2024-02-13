"use client";

import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import {
  addAsset,
  editAsset,
  deleteAsset,
} from "@/app/store/slices/portfolioSlice";
import { AssetData } from "@/app/store/slices/portfolioSlice";
import Image from "next/image";
import * as Icons from "@/app/icons";
import Asset from "@/app/components/Portfolio/Asset";
import Modal from "@/app/components/Portfolio/Modal";
import { useTabLink } from "@/app/context/TabLinkContext";
import MobileTabs from "@/app/components/Tabs/MobileTabs";

export default function Portfolio() {
  const assets = useAppSelector((state) => state.portfolio.assets);
  const dispatch = useAppDispatch();
  const [assetToEdit, setAssetToEdit] = useState<AssetData | undefined>(
    undefined
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const { activeTab, setActiveTab } = useTabLink();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const openEditModal = (asset: AssetData) => {
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

  useEffect(() => {
    setIsClient(true); // on client
  }, []);

  if (!isClient) {
    return <div>Loading...</div>; // loading when not on client
  }

  return (
    <div className="bg-[#f3f5f9] dark:bg-[#13121a] w-[90%]">
      <div className="hidden md:flex justify-between p-4 mt-4">
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
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        onUpdateAssets={handleUpdateAssets}
        assetToEdit={assetToEdit}
        onDeleteAsset={handleDeleteAsset}
      />
      <div className="p-3 mt-3">
        {assets.map((asset) => (
          <Asset
            key={asset.id}
            asset={asset}
            onEdit={() => openEditModal(asset)}
          />
        ))}
      </div>
      <button
        className="flex justify-center items-center fixed z-10 bottom-32 right-6 bg-[#aaabe8] dark:bg-[#3c3c7e] border-2 border-[#6161cb] shadow-whiteShadow bg-opacity-95 p-3 h-16 w-16 rounded-full md:hidden"
        onClick={openModal}
      >
        <Image className="h-7 w-7" src={Icons.Add} alt="add" />
      </button>
      <MobileTabs activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}
