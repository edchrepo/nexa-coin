import Image from "next/image";
import * as Icons from "@/app/icons";
import ProgressBar from "../ProgressBar";

const stats = [
  "Market Cap",
  "Fully Diluted Valuation",
  "Volume 24h",
  "Volume/Market",
  "Total Volume",
  "Circulating Supply",
  "Max Supply",
];

const DataStats = () => {
  return (
    <div className="flex flex-col justify-center items-center bg-white dark:bg-[#1e1932] p-7 rounded-[20px] text-black dark:text-white">
      <div className="w-[80%] flex justify-between">
        <div className="w-[60%] space-y-3">
          {stats.map((stat) => (
            <div className="flex items-center space-x-2">
              <div className="h-5 w-5 rounded-full shadow-whiteShadow">
                <Image
                  className="h-5 w-5"
                  src={Icons.PlusCircle}
                  alt="pluscircle"
                />
              </div>
              <p className="text-secondary">{stat}</p>
            </div>
          ))}
        </div>
        <div className="w-[40%] space-y-3">
          <p>$749,864,345,056</p>
          <p>$840,523,040,085</p>
          <p>$47,714,337,481</p>
          <p>0.06363</p>
          <p>1,192,352 BTC</p>
          <p>18,734,943 BTC</p>
          <p>21,000,000 BTC</p>
        </div>
      </div>
      <div className="w-[80%] mt-10">
          <ProgressBar
            progress={Math.min(6, 100)}
            color={`#cd730e`}
            secondaryColor={`#f8d2a6`}
          />
        </div>
    </div>
  );
};

export default DataStats;
