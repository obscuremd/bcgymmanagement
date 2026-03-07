/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { clearAuthCookie } from "@/lib/jwt";

export async function POST(request: NextRequest) {
  try {
    // Clear auth cookie
    await clearAuthCookie();

    return NextResponse.json(
      {
        success: true,
        message: "Logged out successfully",
      },
      { status: 200 },
    );
  } catch (error: any) {
    console.error("Logout error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to logout",
        error: error.message,
      },
      { status: 500 },
    );
  }
}
