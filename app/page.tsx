import ChartOverview from "../components/ChartOverview";

import CoinsTable from "@/components/CoinsTable";

export default function Home() {
  return (
    <div className="bg-[#13121a] flex-col justify-center w-[90%]">
      <ChartOverview />
      <CoinsTable />
    </div>
  );
}
