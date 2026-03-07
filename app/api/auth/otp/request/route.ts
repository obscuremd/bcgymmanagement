/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { sendOTPEmail } from "@/lib/email";
import { getUserByEmail } from "@/utils/User";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        {
          success: false,
          message: "Email is required",
        },
        { status: 400 },
      );
    }

    // Find user by email
    const user = await getUserByEmail(email);

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "No account found with this email",
        },
        { status: 404 },
      );
    }

    // Generate OTP
    const otp = user.generateOTP();
    await user.save();

    // Send OTP email
    const emailResult = await sendOTPEmail({
      email: user.email,
      otp,
      username: user.username,
    });

    if (!emailResult.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Failed to send OTP email. Please try again.",
        },
        { status: 500 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "OTP sent to your email",
      },
      { status: 200 },
    );
  } catch (error: any) {
    console.error("OTP request error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to send OTP",
        error: error.message,
      },
      { status: 500 },
    );
  }
}
