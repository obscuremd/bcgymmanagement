/* eslint-disable @typescript-eslint/no-explicit-any */
import { createUser, getAllUsers } from "@/utils/User";
import { NextRequest, NextResponse } from "next/server";

// GET all users
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const role = searchParams.get("role");

    const filters = role ? { role } : undefined;
    const users = await getAllUsers(filters);

    return NextResponse.json(
      {
        success: true,
        count: users.length,
        data: users,
      },
      { status: 200 },
    );
  } catch (error: any) {
    console.error("Error fetching users:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch users",
        error: error.message,
      },
      { status: 500 },
    );
  }
}

// POST create new user
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, email, role } = body;

    if (!username || !email) {
      return NextResponse.json(
        {
          success: false,
          message: "Username and email are required",
        },
        { status: 400 },
      );
    }

    const result = await createUser({
      username,
      email,
      role: role || "visitor",
    });

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          message: result.message,
        },
        { status: 400 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "User created successfully",
        data: result.data,
      },
      { status: 201 },
    );
  } catch (error: any) {
    console.error("Error creating user:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create user",
        error: error.message,
      },
      { status: 500 },
    );
  }
}
