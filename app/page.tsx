import ChartOverview from "../components/ChartOverview";

import CoinsTable from "@/components/CoinsTable";

export default function Home() {
  return (
    <div className="bg-[#13121a] flex justify-center">
      <div className="w-[80%]">
        <ChartOverview />
        <CoinsTable />
      </div>
    </div>
  );
}
