import Link from "next/link";
import Image from "next/image";
import * as Icons from "../../icons";
import { TabsProps } from "./Tabs";

const MobileTabs: React.FC<TabsProps> = ({ activeTab, setActiveTab }) => {
  const tabItems = [
    {
      id: "coins",
      icon: Icons.Home,
      label: "Overview",
      link: "/",
    },
    {
      id: "converter",
      icon: Icons.ExchangeIcon,
      label: "Converter",
      link: "/",
    },
    {
      id: "portfolio",
      icon: Icons.Stack,
      label: "Portfolio",
      link: "/portfolio",
    },
  ];

  return (
    <div className="md:hidden fixed inset-x-0 bottom-0 bg-[#181825] text-white bg-opacity-50 backdrop-blur-sm h-[10%] z-50 p-4 text-center">
      <div className="flex h-full w-full">
        {tabItems.map((tab) => (
          <div
            key={tab.id}
            className={`flex justify-center items-center ${
              activeTab === tab.id
                ? "bg-[#aaabe8] dark:bg-[#3c3c7e] border-2 border-[#6161cb] shadow-whiteShadow"
                : "text-[#6161cb] dark:text-white"
            } p-4 rounded-lg w-[50%]`}
            onClick={() => setActiveTab(tab.id)}
          >
            <Link href={tab.link}>
              <div className="flex flex-col items-center">
                <Image className="h-7 w-7" src={tab.icon} alt={tab.label} />
                {tab.label}
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MobileTabs;
