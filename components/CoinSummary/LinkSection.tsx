import Image from "next/image";
import * as Icons from "@/icons";
import { CoinSummary } from "@/store/slices/coinSummarySlice";

export type LinkSectionProps = {
  data: CoinSummary;
  handleCopy: (link: string) => void;
  copiedLink: string | null;
};

const LinkSection: React.FC<LinkSectionProps> = ({
  data,
  handleCopy,
  copiedLink,
}) => {
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
              <Image
                className="h-5 w-5 cursor-pointer"
                src={Icons.WhiteLink}
                alt="whitelink"
              />
            </a>
            <p>{site.substring(0, 50)}</p>
            <div className="relative">
              <Image
                className="h-5 w-5 cursor-pointer"
                src={copiedLink === site ? Icons.Copied : Icons.WhiteCopy}
                alt={copiedLink === site ? "Copied" : "Copy"}
                onClick={() => handleCopy(site)}
              />
              {copiedLink === site && (
                <div className="absolute -mt-14 p-2 bg-black text-white text-xs rounded-lg">
                  Copied!
                </div>
              )}
            </div>
          </div>
        ))}
    </div>
  );
};

export default LinkSection;
