import  ChartOverview from "../components/ChartOverview"

export default function Home() {
  return (
    <div className="bg-[#1f2128] flex justify-center">
      <div className="w-[80%]">
        <ChartOverview/>
        <div>
          Table
        </div>
      </div>
    </div>
  );
}