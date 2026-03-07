/* eslint-disable @typescript-eslint/no-explicit-any */
import { connectMongoDb } from "@/lib/mongoDb";
import User from "@/models/User";

interface CreateUserData {
  username: string;
  email: string;
  role: "admin" | "staff" | "visitor";
}

interface UpdateUserData {
  role?: "admin" | "staff" | "visitor";
  username?: string;
  email?: string;
}

export interface UserData {
  _id: string;
  username: string;
  email: string;
  role: "admin" | "staff" | "visitor";
  createdAt: string;
  updatedAt: string;
}

/**
 * Get all users with optional filters
 */
export async function getAllUsers(filters?: {
  role?: string;
}): Promise<UserData[]> {
  await connectMongoDb();

  const filter: any = {};

  if (filters?.role) {
    filter.role = filters.role;
  }

  const users = await User.find(filter).sort({ createdAt: -1 }).lean();

  return users.map((user) => ({
    _id: user._id.toString(),
    username: user.username,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt.toISOString(),
    updatedAt: user.updatedAt.toISOString(),
  }));
}

/**
 * Get user by ID
 */
export async function getUserById(id: string): Promise<UserData | null> {
  await connectMongoDb();

  const user = await User.findById(id).lean();

  if (!user) {
    return null;
  }

  return {
    _id: user._id.toString(),
    username: user.username,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt.toISOString(),
    updatedAt: user.updatedAt.toISOString(),
  };
}

/**
 * Get user by email
 */
export async function getUserByEmail(email: string): Promise<any | null> {
  await connectMongoDb();

  const user = await User.findOne({ email }).select("+otp.code +otp.expiresAt");

  return user;
}

/**
 * Create new user
 */
export async function createUser(
  data: CreateUserData,
): Promise<{ success: boolean; message?: string; data?: UserData }> {
  try {
    await connectMongoDb();

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email: data.email }, { username: data.username }],
    });

    if (existingUser) {
      return {
        success: false,
        message:
          existingUser.email === data.email
            ? "Email already registered"
            : "Username already taken",
      };
    }

    // Create new user
    const user = await User.create({
      username: data.username,
      email: data.email,
      role: data.role || "visitor",
    });

    return {
      success: true,
      message: "User created successfully",
      data: {
        _id: user._id.toString(),
        username: user.username,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt.toISOString(),
        updatedAt: user.updatedAt.toISOString(),
      },
    };
  } catch (error: any) {
    console.error("Error creating user:", error);

    return {
      success: false,
      message: error.message || "Failed to create user",
    };
  }
}

/**
 * Update user
 */
export async function updateUser(
  id: string,
  data: UpdateUserData,
): Promise<{ success: boolean; message?: string; data?: UserData }> {
  try {
    await connectMongoDb();

    const user = await User.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    }).lean();

    if (!user) {
      return {
        success: false,
        message: "User not found",
      };
    }

    return {
      success: true,
      message: "User updated successfully",
      data: {
        _id: user._id.toString(),
        username: user.username,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt.toISOString(),
        updatedAt: user.updatedAt.toISOString(),
      },
    };
  } catch (error: any) {
    console.error("Error updating user:", error);

    // Handle duplicate email/username
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      return {
        success: false,
        message: `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`,
      };
    }

    return {
      success: false,
      message: error.message || "Failed to update user",
    };
  }
}

/**
 * Delete user
 */
export async function deleteUser(
  id: string,
): Promise<{ success: boolean; message?: string }> {
  try {
    await connectMongoDb();

    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return {
        success: false,
        message: "User not found",
      };
    }

    return {
      success: true,
      message: "User deleted successfully",
    };
  } catch (error: any) {
    console.error("Error deleting user:", error);

    return {
      success: false,
      message: error.message || "Failed to delete user",
    };
  }
}

/**
 * Get user statistics
 */
export async function getUserStats(): Promise<{
  total: number;
  admins: number;
  staff: number;
  visitors: number;
}> {
  await connectMongoDb();

  const [total, admins, staff, visitors] = await Promise.all([
    User.countDocuments(),
    User.countDocuments({ role: "admin" }),
    User.countDocuments({ role: "staff" }),
    User.countDocuments({ role: "visitor" }),
  ]);

  return {
    total,
    admins,
    staff,
    visitors,
  };
}
