/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { setAuthCookie } from "@/lib/jwt";
import { getUserByEmail } from "@/utils/User";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, otp } = body;

    if (!email || !otp) {
      return NextResponse.json(
        {
          success: false,
          message: "Email and OTP are required",
        },
        { status: 400 },
      );
    }

    // Find user with OTP
    const user = await getUserByEmail(email);

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid credentials",
        },
        { status: 401 },
      );
    }

    // Verify OTP
    const isValidOTP = user.verifyOTP(otp);

    if (!isValidOTP) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid or expired OTP",
        },
        { status: 401 },
      );
    }

    // Clear OTP
    user.clearOTP();
    await user.save();

    // Generate JWT token and set cookie
    await setAuthCookie(user._id.toString(), user.email);

    return NextResponse.json(
      {
        success: true,
        message: "Login successful",
        data: {
          user: {
            id: user._id.toString(),
            username: user.username,
            email: user.email,
            role: user.role,
          },
        },
      },
      { status: 200 },
    );
  } catch (error: any) {
    console.error("OTP verification error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to verify OTP",
        error: error.message,
      },
      { status: 500 },
    );
  }
}
