/* eslint-disable @typescript-eslint/no-explicit-any */
import { connectMongoDb } from "@/lib/mongoDb";
import Member from "@/models/Memeber";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }, // Changed
) {
  try {
    const { id } = await context.params;
    await connectMongoDb();

    const member = await Member.findById(id);

    if (!member) {
      return NextResponse.json(
        {
          success: false,
          message: "Member not found",
        },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: member,
      },
      { status: 200 },
    );
  } catch (error: any) {
    console.error("Error fetching member:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch member",
        error: error.message,
      },
      { status: 500 },
    );
  }
}

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await context.params;
    await connectMongoDb();

    const body = await request.json();

    // Update member
    const member = await Member.findByIdAndUpdate(id, body, {
      new: true, // Return updated document
      runValidators: true, // Run model validators
    });

    if (!member) {
      return NextResponse.json(
        {
          success: false,
          message: "Member not found",
        },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Member updated successfully",
        data: member,
      },
      { status: 200 },
    );
  } catch (error: any) {
    console.error("Error updating member:", error);

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
        message: "Failed to update member",
        error: error.message,
      },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await context.params;
    await connectMongoDb();

    const member = await Member.findByIdAndDelete(id);

    if (!member) {
      return NextResponse.json(
        {
          success: false,
          message: "Member not found",
        },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Member deleted successfully",
        data: member,
      },
      { status: 200 },
    );
  } catch (error: any) {
    console.error("Error deleting member:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete member",
        error: error.message,
      },
      { status: 500 },
    );
  }
}
