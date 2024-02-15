import MobileTabs from "./MobileTabs";

export interface TabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Tabs: React.FC<TabsProps> = ({ activeTab, setActiveTab }) => {
  return (
    <>
      {/* Desktop View */}
      <div className="hidden md:flex bg-white dark:bg-[#181825] w-[25%] py-2 px-5 rounded-[15px] mt-5">
        <div
          className={`flex justify-center items-center cursor-pointer 
            ${
              activeTab === "coins"
                ? "bg-[#aaabe8] dark:bg-[#3c3c7e] border-2 border-[#6161cb] shadow-whiteShadow"
                : "bg-white dark:bg-[#232336] text-[#6161cb] dark:text-white"
            } p-4 rounded-lg w-[50%]`}
          onClick={() => setActiveTab("coins")}
        >
          Coins
        </div>
        <div
          className={`flex justify-center items-center cursor-pointer 
            ${
              activeTab === "converter"
                ? "bg-[#aaabe8] dark:bg-[#3c3c7e] border-2 border-[#6161cb] shadow-whiteShadow"
                : "bg-white dark:bg-[#232336] text-[#6161cb] dark:text-white"
            } p-4 rounded-lg w-[50%]`}
          onClick={() => setActiveTab("converter")}
        >
          Converter
        </div>
      </div>
      {/* Mobile View */}
      <MobileTabs activeTab={activeTab} setActiveTab={setActiveTab}/>
    </>
  );
};

export default Tabs;
