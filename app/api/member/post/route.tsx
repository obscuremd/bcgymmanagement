/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import Member from "@/models/Memeber";
import { connectMongoDb } from "@/lib/mongoDb";

export async function POST(request: NextRequest) {
  try {
    await connectMongoDb();

    const body = await request.json();

    // Create new member
    const member = await Member.create(body);

    return NextResponse.json(
      {
        success: true,
        message: "Member created successfully",
        data: member,
      },
      { status: 201 },
    );
  } catch (error: any) {
    console.error("Error creating member:", error);

    // Handle duplicate email error
    if (error.code === 11000) {
      return NextResponse.json(
        {
          success: false,
          message: "Email already exists",
        },
        { status: 400 },
      );
    }

    // Handle validation errors
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map(
        (err: any) => err.message,
      );
      return NextResponse.json(
        {
          success: false,
          message: messages.join(", "),
        },
        { status: 400 },
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create member",
        error: error.message,
      },
      { status: 500 },
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    await connectMongoDb();

    // Get query parameters for filtering
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const membershipType = searchParams.get("membershipType");
    const search = searchParams.get("search");

    // Build filter object
    const filter: any = {};

    if (status) {
      filter.status = status;
    }

    if (membershipType) {
      filter.membershipType = membershipType;
    }

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { surname: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } },
      ];
    }

    // Get all members with filter
    const members = await Member.find(filter).sort({ createdAt: -1 });

    return NextResponse.json(
      {
        success: true,
        count: members.length,
        data: members,
      },
      { status: 200 },
    );
  } catch (error: any) {
    console.error("Error fetching members:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch members",
        error: error.message,
      },
      { status: 500 },
    );
  }
}
