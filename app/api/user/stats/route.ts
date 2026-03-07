/* eslint-disable @typescript-eslint/no-explicit-any */
import { getUserStats } from "@/utils/User";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const stats = await getUserStats();

    return NextResponse.json(
      {
        success: true,
        data: stats,
      },
      { status: 200 },
    );
  } catch (error: any) {
    console.error("Error fetching stats:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch statistics",
        error: error.message,
      },
      { status: 500 },
    );
  }
}
