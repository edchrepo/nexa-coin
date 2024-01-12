import Image from "next/image";
import * as Icons from "@/app/icons";
import ProgressBar from "../ProgressBar";
import { CoinSummary } from "@/app/store/slices/coinSummarySlice";

const stats = [
  "Market Cap",
  "Fully Diluted Valuation",
  "Market Cap 24h",
  "Volume/Market",
  "Total Volume",
  "Circulating Supply",
  "Max Supply",
];

interface DataProps {
  data: CoinSummary 
}

const DataStats: React.FC<DataProps> = ({ data }) => {
  return (
    <div className="flex flex-col justify-center items-center bg-white dark:bg-[#1e1932] p-7 rounded-[20px] text-black dark:text-white">
      <div className="w-[80%] flex justify-between">
        <div className="w-[60%] space-y-3">
          {stats.map((stat, index) => (
            <div key={index} className="flex items-center space-x-2">
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
          <p>${data.market_data.market_cap.usd}</p>
          <p>${data.market_data.fully_diluted_valuation.usd}</p>
          <p>${data.market_data.market_cap_change_24h}</p>
          <p>{data.market_data.mcap_to_tvl_ratio || "N/A"}</p>
          <p>{data.market_data.total_volume[data.symbol]} {data.symbol.toUpperCase()}</p>
          <p>{data.market_data.circulating_supply} {data.symbol.toUpperCase()}</p>
          <p>{data.market_data.max_supply || "N/A"} {data.symbol.toUpperCase()}</p>
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
