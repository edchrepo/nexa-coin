import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  try {
    const {searchParams} = new URL(req.url);
    const timeFrame = searchParams.get("timeFrame");
    if (!process.env.NEXT_PUBLIC_API_CHART_URL) {
      throw new Error("API URL is not defined");
    }

    const apiResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_CHART_URL}${timeFrame}&interval=daily`
    );

    if (!apiResponse.ok) {
      throw new Error("Failed to fetch data from the API");
    }

    const data = await apiResponse.json();

    return NextResponse.json({ data })
  } catch (error) {
    console.error(error);
    return NextResponse.json("Failed to fetch", { status: 500 })
  }
};