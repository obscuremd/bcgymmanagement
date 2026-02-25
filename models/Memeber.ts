import mongoose from "mongoose";

const MemberSchema = new mongoose.Schema(
  {
    surname: {
      type: String,
      required: [true, "Surname is required"],
      trim: true,
    },
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
    },
    address: {
      type: String,
      required: [true, "Address is required"],
      trim: true,
    },
    image: {
      type: String,
      default: "",
    },
    membershipType: {
      type: String,
      required: [true, "Membership type is required"],
      enum: [
        "REGULAR MEMBERSHIP",
        "VIP MEMBERSHIP",
        "GROUP MEMBERSHIP",
        "PERSONAL TRAINING REGISTRATION",
        "SEASON PERSONAL TRAINING",
        "ONLINE REGISTRATION",
        "ZUMBA MEMBERSHIP",
        "BOXING MEMBERSHIP",
        "KIDS REGISTRATION",
      ],
    },
    registrationDate: {
      type: Date,
      required: [true, "Registration date is required"],
      default: Date.now,
    },
    cardReceivedDate: {
      type: Date,
    },
    duration: {
      type: String,
      required: [true, "Duration is required"],
    },
    amount: {
      type: String,
      required: [true, "Amount is required"],
    },
    cardIssueDate: {
      type: Date,
    },
    regCardType: {
      type: String,
      enum: [
        "Standard Card",
        "Gold Card",
        "Platinum Card",
        "Digital Card",
        "Junior Card",
      ],
    },
    paymentMethod: {
      type: String,
      required: [true, "Payment method is required"],
      enum: [
        "Cash",
        "Instant Bank Transfer",
        "POS Debit",
        "Installment Monthly Bank Debit",
        "Payment on Website",
        "Crypto Payment",
        "USD Payment",
      ],
    },
    paymentDate: {
      type: Date,
      required: [true, "Payment date is required"],
    },
    paymentByInstallment: {
      type: String,
      default: "No",
    },
    expiryDate: {
      type: Date,
      required: [true, "Expiry date is required"],
    },
    status: {
      type: String,
      enum: ["Active", "Expired"],
      default: "Active",
    },
  },
  {
    timestamps: true,
  },
);

// Prevent model recompilation in Next.js hot reload
const Member = mongoose.models.Member || mongoose.model("Member", MemberSchema);

export default Member;
