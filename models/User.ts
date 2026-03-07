import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      trim: true,
      minlength: [3, "Username must be at least 3 characters"],
      maxlength: [30, "Username cannot exceed 30 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email",
      ],
    },
    role: {
      type: String,
      enum: ["admin", "staff", "visitor"],
      default: "visitor",
      required: true,
    },
    otp: {
      code: {
        type: String,
        select: false, // Don't return in queries
      },
      expiresAt: {
        type: Date,
        select: false,
      },
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

// Method to generate OTP
UserSchema.methods.generateOTP = function (): string {
  // Generate 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  this.otp = {
    code: otp,
    expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes
  };

  return otp;
};

// Method to verify OTP
UserSchema.methods.verifyOTP = function (candidateOTP: string): boolean {
  if (!this.otp || !this.otp.code || !this.otp.expiresAt) {
    return false;
  }

  const now = new Date();
  const expiryDate = new Date(this.otp.expiresAt);

  // Check if OTP is expired
  if (now > expiryDate) {
    return false;
  }

  // Check if OTP matches (compare as strings)
  return this.otp.code.toString() === candidateOTP.toString();
};

// Method to clear OTP after successful verification
UserSchema.methods.clearOTP = function () {
  this.otp = {
    code: undefined,
    expiresAt: undefined,
  };
};

// Prevent model recompilation in Next.js hot reload
const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
