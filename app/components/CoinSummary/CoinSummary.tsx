import Image from "next/image";
import * as Icons from "@/app/icons";
import DataStats from "./DataStats";

const CoinSummary = () => {
  return (
    <div className="flex-col justify-center w-[90%]">
      <div className="mt-9 mb-5">
        <p className="text-lg text-[#424286] dark:text-white">
          Portfolio / Bitcoin summary
        </p>
      </div>
      <div className="flex justify-center space-x-16">
        <div className="w-[55%] space-y-48">
          <div className="flex space-x-8">
            <div className="w-[45%] space-y-5">
              <div className="bg-white dark:bg-[#1e1932] p-20 rounded-[20px] text-black dark:text-white ">
                <div className="flex flex-col items-center justify-center text-center space-y-4">
                  <Image
                    className="h-10 w-10"
                    src={Icons.BitcoinIcon}
                    alt="Bitcoin"
                  />
                  <p className="text-xl font-bold">Bitcoin (BTC)</p>
                </div>
              </div>
              <div className="flex items-center justify-center bg-white dark:bg-[#1e1932] p-5 rounded-[20px] text-black dark:text-white space-x-3">
                <Image
                  className="h-5 w-5"
                  src={Icons.WhiteLink}
                  alt="whitelink"
                />
                <p>www.bitcoin.org</p>
                <Image
                  className="h-5 w-5"
                  src={Icons.WhiteTab}
                  alt="whitetab"
                />
              </div>
            </div>
            <div className="w-[55%] flex flex-col justify-center items-center bg-white dark:bg-[#1e1932] rounded-[20px] text-black dark:text-white">
              <div>
                <div className="flex space-x-6">
                  <p className="text-3xl font-bold">$40,017</p>
                  <div className="flex items-center space-x-1">
                    <Image
                      className="h-2 w-2"
                      src={Icons.UpArrow}
                      alt="uparrow"
                    />
                    <p className="text-[#00b1a6]">5.02%</p>
                  </div>
                </div>
                <div className="flex text-lg space-x-2 mt-2">
                  <p>Profit:</p>
                  <p className="text-[#00b1a6]">$1,502</p>
                </div>
                <div className="flex justify-center">
                  <Image
                    className="h-5 w-5 mt-5"
                    src={Icons.Stack}
                    alt="stack"
                  />
                </div>
                <div className="flex items-center mt-5 space-x-3">
                  <Image
                    className="h-5 w-5"
                    src={Icons.UpArrow}
                    alt="uparrow2"
                  />
                  <p>All time high:</p>
                  <p>$64,804</p>
                </div>
                <p className="text-[#3c3c7e] dark:text-secondary">
                  {new Date().toUTCString()}
                </p>
                <div className="flex items-center mt-5 space-x-3">
                  <Image
                    className="h-5 w-5"
                    src={Icons.DownArrow}
                    alt="downarrow2"
                  />
                  <p>All time low:</p>
                  <p>$32,805</p>
                </div>
                <p className="text-[#3c3c7e] dark:text-secondary">
                  {new Date().toUTCString()}
                </p>
              </div>
            </div>
          </div>
          <div>
            <p>Description</p>
            <p>
              Bitcoin is the first successful internet money based on
              peer-to-peer technology; whereby no central bank or authority is
              involved in the transaction and production of the Bitcoin
              currency. It was created by an anonymous individual/group under
              the name, Satoshi Nakamoto. The source code is available publicly
              as an open source project, anybody can look at it and be part of
              the developmental process. Bitcoin is changing the way we see
              money as we speak. The idea was to produce a means of exchange,
              independent of any central authority, that could be transferred
              electronically in a secure, verifiable and immutable way. It is a
              decentralized peer-to-peer internet currency making mobile payment
              easy, very low transaction fees, protects your identity, and it
              works anywhere all the time with no central authority and banks.
              Bitcoin is designed to have only 21 million BC ever ... read more
            </p>
          </div>
        </div>
        <div className="w-[45%] space-y-44">
          <DataStats/>
          <div className="space-y-6">
            <div className="flex items-center justify-center bg-white dark:bg-[#1e1932] p-4 rounded-[20px] text-black dark:text-white space-x-3">
              <Image
                className="h-5 w-5"
                src={Icons.WhiteLink}
                alt="whitelink"
              />
              <p>www.blockchain.com/bitcoin</p>
              <Image className="h-5 w-5" src={Icons.WhiteTab} alt="whitetab" />
            </div>
            <div className="flex items-center justify-center bg-white dark:bg-[#1e1932] p-4 rounded-[20px] text-black dark:text-white space-x-3">
              <Image
                className="h-5 w-5"
                src={Icons.WhiteLink}
                alt="whitelink"
              />
              <p>www.btc.com</p>
              <Image className="h-5 w-5" src={Icons.WhiteTab} alt="whitetab" />
            </div>
            <div className="flex items-center justify-center bg-white dark:bg-[#1e1932] p-4 rounded-[20px] text-black dark:text-white space-x-3">
              <Image
                className="h-5 w-5"
                src={Icons.WhiteLink}
                alt="whitelink"
              />
              <p>www.btc.tokenview.com</p>
              <Image className="h-5 w-5" src={Icons.WhiteTab} alt="whitetab" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoinSummary;
