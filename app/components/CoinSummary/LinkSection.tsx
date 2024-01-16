import Image from "next/image";
import * as Icons from "@/app/icons";
import { CoinStatsProps } from "./CoinStats";

const LinkSection: React.FC<CoinStatsProps> = ({ data, handleCopy }) => {
  return (
    <div className="space-y-6">
      {data.links.blockchain_site
        .filter((site) => site.length > 0)
        .slice(0, 3) // Get only the first 3 links
        .map((site, index) => (
          <div
            key={index}
            className="flex items-center justify-center bg-[#7272ab] dark:bg-[#1e1932] p-4 rounded-[20px] text-black dark:text-white space-x-3"
          >
            <a href={site} target="_blank" rel="noopener noreferrer">
              <Image className="h-5 w-5 cursor-pointer" src={Icons.WhiteLink} alt="whitelink" />
            </a>
            <p>{site.substring(0, 50)}</p>
            <Image className="h-5 w-5 cursor-pointer" src={Icons.WhiteCopy} alt="whitetab" onClick={() => handleCopy(site)} />
          </div>
        ))}
    </div>
  );
};

export default LinkSection;
