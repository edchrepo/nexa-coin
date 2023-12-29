"use client";

import React, { useState } from "react";
import Asset from "@/app/components/Asset";
import Modal from "@/app/components/Modal";

export default function Portfolio() {
  const assets = [1, 2];
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
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
      <Modal isOpen={isModalOpen} onClose={closeModal} />
      <div className="p-3 mt-3">
        {assets.map((index) => (
          <Asset key={index} />
        ))}
      </div>
    </div>
  );
}
