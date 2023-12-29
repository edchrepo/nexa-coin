import React from "react";
import Image from "next/image";
import * as Icons from "@/app/icons";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-50 ${
        isOpen ? "flex" : "hidden"
      } items-center justify-center backdrop-blur-sm`}
    >
      <div className="bg-[#13121a] rounded-xl p-10 max-w-3xl w-full mx-auto z-50 relative">
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg">Select Coins</span>
          <button onClick={onClose}>
            <Image className="w-7" src={Icons.Close} alt="close" />
          </button>
        </div>
        <div className="text-white flex">
          <div className="flex flex-col justify-center items-center bg-[#191932] rounded-md w-3/5 mr-6">
            <div className="flex bg-[#2c2c4a] p-3 rounded-lg">
              <Image className="w-7" src={Icons.BitcoinIcon} alt="BTC" />
            </div>
            <span className="text-2xl mt-3">Bitcoin (BTC)</span>
          </div>
          <div className="flex flex-col w-full">
            <div className="mb-4">
              <select className="bg-[#191925] text-secondary rounded-md p-2 w-full">
                <option value="coin">Select coins</option>
              </select>
            </div>
            <div className="mb-4">
              <select className="bg-[#191925] text-secondary rounded-md p-2 w-full">
                <option value="USD">Purchased amount</option>
              </select>
            </div>
            <div className="mb-4">
              <select className="bg-[#191925] text-secondary rounded-md p-2 w-full">
                <option value="date">Purchased date</option>
              </select>
            </div>
            <div className="flex space-x-2 mt-4">
              <button
                className="bg-[#aaabe8] dark:bg-[#232336] text-[#3c3c7e] dark:text-white rounded-md p-2 w-1/2"
                onClick={onClose}
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
