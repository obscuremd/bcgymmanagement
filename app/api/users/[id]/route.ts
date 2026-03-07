/* eslint-disable @typescript-eslint/no-explicit-any */
import { deleteUser, getUserById, updateUser } from "@/utils/User";
import { NextRequest, NextResponse } from "next/server";

// GET single user
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await context.params;

    const user = await getUserById(id);

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: user,
      },
      { status: 200 },
    );
  } catch (error: any) {
    console.error("Error fetching user:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch user",
        error: error.message,
      },
      { status: 500 },
    );
  }
}

// UPDATE user
export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await context.params;
    const body = await request.json();

    const result = await updateUser(id, body);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          message: result.message,
        },
        { status: result.message === "User not found" ? 404 : 400 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "User updated successfully",
        data: result.data,
      },
      { status: 200 },
    );
  } catch (error: any) {
    console.error("Error updating user:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update user",
        error: error.message,
      },
      { status: 500 },
    );
  }
}

// DELETE user
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await context.params;

    const result = await deleteUser(id);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          message: result.message,
        },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "User deleted successfully",
      },
      { status: 200 },
    );
  } catch (error: any) {
    console.error("Error deleting user:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete user",
        error: error.message,
      },
      { status: 500 },
    );
  }
}
