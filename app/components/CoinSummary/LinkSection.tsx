import Image from "next/image";
import * as Icons from "@/app/icons";
import { DataProps } from "./DataStats";

const LinkSection: React.FC<DataProps> = ({ data }) => {
  return (
    <div className="space-y-6">
      {data.links.blockchain_site
        .filter((site) => site.length > 0)
        .slice(0, 3) // Get only the first 3 links
        .map((site, index) => (
          <div
            key={index}
            className="flex items-center justify-center bg-white dark:bg-[#1e1932] p-4 rounded-[20px] text-black dark:text-white space-x-3"
          >
            <Image className="h-5 w-5" src={Icons.WhiteLink} alt="whitelink" />
            <p>{site.substring(0, 50)}</p>
            <Image className="h-5 w-5" src={Icons.WhiteCopy} alt="whitetab" />
          </div>
        ))}
    </div>
  );
};

export default LinkSection;
