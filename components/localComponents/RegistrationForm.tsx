"use client";
import {
  Calendar,
  CreditCard,
  DollarSign,
  Mail,
  User,
  Camera,
  Upload,
  X,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { DurationInput } from "./DurationInput";
import { Button } from "../ui/button";
import { useState, FormEvent, useRef, ChangeEvent } from "react";
import { createMember } from "@/lib/api";
import { toast } from "sonner";
import Image from "next/image";
import { uploadImages } from "@/lib/UtilServices";

interface RegistrationFormProps {
  onClose: () => void;
  onSuccess: () => void;
}

export default function RegistrationForm({
  onClose,
  onSuccess,
}: RegistrationFormProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isUploadingImage, setIsUploadingImage] = useState<boolean>(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    surname: "",
    name: "",
    phone: "",
    email: "",
    address: "",
    membershipType: "",
    duration: "",
    registrationDate: "",
    cardReceivedDate: "",
    cardIssueDate: "",
    expiryDate: "",
    amount: "",
    paymentDate: "",
    paymentMethod: "",
    paymentByInstallment: "",
    regCardType: "",
  });

  const paymentMethods: string[] = [
    "Cash",
    "Instant Bank Transfer",
    "POS Debit",
    "Installment Monthly Bank Debit",
    "Payment on Website",
    "Crypto Payment",
    "USD Payment",
  ];

  const cardTypes: string[] = [
    "REGULAR CARD",
    "VIP CARD",
    "GROUP CARD",
    "PERSONAL TRAINING CARD",
    "SEASON PERSONAL CARD",
    "ONLINE CARD",
    "ZUMBA CARD",
    "BOXING CARD",
    "KIDS CARD",
  ];

  const membershipTypes: string[] = [
    "REGULAR MEMBERSHIP",
    "VIP MEMBERSHIP",
    "GROUP MEMBERSHIP",
    "PERSONAL TRAINING REGISTRATION",
    "SEASON PERSONAL TRAINING",
    "ONLINE REGISTRATION",
    "ZUMBA MEMBERSHIP",
    "BOXING MEMBERSHIP",
    "KIDS REGISTRATION",
  ];

  const handleImageSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        toast.error("Invalid File Type", {
          description: "Please select an image file (JPG, PNG, GIF, etc.)",
        });
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File Too Large", {
          description: "Please select an image smaller than 5MB",
        });
        return;
      }

      setImageFile(file);

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let imageUrl = "";

      // Upload image to Firebase if selected
      if (imageFile) {
        setIsUploadingImage(true);
        toast.loading("Uploading image...", { id: "image-upload" });

        const uploadResult = await uploadImages([imageFile]);

        if (
          uploadResult.message === "success" &&
          uploadResult.data.length > 0
        ) {
          imageUrl = uploadResult.data[0];
          toast.success("Image uploaded successfully!", { id: "image-upload" });
        } else {
          toast.error("Image upload failed", { id: "image-upload" });
          setIsLoading(false);
          setIsUploadingImage(false);
          return;
        }
        setIsUploadingImage(false);
      }

      // Create member with image URL
      const result = await createMember({
        ...formData,
        image: imageUrl,
        status: "Active",
      });

      if (result.success) {
        toast.success("Member Registered Successfully!", {
          description: `${formData.name} ${formData.surname} has been added to the system.`,
        });

        // Close dialog and refresh page after a short delay
        setTimeout(() => {
          onSuccess();
          onClose();
        }, 1500);
      } else {
        toast.error("Registration Failed", {
          description:
            result.message || "Failed to register member. Please try again.",
        });
      }
    } catch (error) {
      toast.error("Registration Failed", {
        description: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-zinc-900 border-zinc-800">
      <DialogHeader>
        <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-[#d4af37] to-[#e6c76a] bg-clip-text text-transparent">
          New Member Registration
        </DialogTitle>
      </DialogHeader>

      <form onSubmit={handleSubmit} className="space-y-6 mt-4">
        {/* Profile Image Upload */}
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <div className="w-32 h-32 rounded-full border-4 border-[#d4af37]/30 bg-zinc-950 overflow-hidden flex items-center justify-center group cursor-pointer hover:border-[#d4af37]/60 transition-all">
              {imagePreview ? (
                <>
                  <Image
                    src={imagePreview}
                    alt="Profile preview"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Camera className="w-8 h-8 text-white" />
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center text-zinc-500 group-hover:text-[#d4af37] transition-colors">
                  <Upload className="w-10 h-10 mb-2" />
                  <span className="text-xs">Upload Photo</span>
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageSelect}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </div>

            {imagePreview && (
              <button
                type="button"
                onClick={handleRemoveImage}
                className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors shadow-lg"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            )}
          </div>

          <p className="text-xs text-zinc-400 text-center">
            {imageFile
              ? imageFile.name
              : "Click to upload member photo (Max 5MB)"}
          </p>
        </div>

        {/* Personal Information */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-[#e6c76a]">
            <User className="w-4 h-4" />
            <span>Personal Information</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="surname" className="text-zinc-300">
                Surname
              </Label>
              <Input
                id="surname"
                required
                placeholder="Enter surname"
                value={formData.surname}
                onChange={(e) => handleInputChange("surname", e.target.value)}
                className="bg-zinc-950 border-zinc-700 focus:border-[#d4af37]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="name" className="text-zinc-300">
                Name
              </Label>
              <Input
                id="name"
                required
                placeholder="Enter name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="bg-zinc-950 border-zinc-700 focus:border-[#d4af37]"
              />
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-[#e6c76a]">
            <Mail className="w-4 h-4" />
            <span>Contact Information</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-zinc-300">
                Phone Number
              </Label>
              <Input
                id="phone"
                required
                placeholder="+234 XXX XXX XXXX"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                className="bg-zinc-950 border-zinc-700 focus:border-[#d4af37]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-zinc-300">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                required
                placeholder="email@example.com"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="bg-zinc-950 border-zinc-700 focus:border-[#d4af37]"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="address" className="text-zinc-300">
              Home Address
            </Label>
            <Input
              id="address"
              required
              placeholder="Enter full address"
              value={formData.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
              className="bg-zinc-950 border-zinc-700 focus:border-[#d4af37]"
            />
          </div>
        </div>

        {/* Membership Details */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-[#e6c76a]">
            <CreditCard className="w-4 h-4" />
            <span>Membership Details</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="membership-type" className="text-zinc-300">
                Type of Registration
              </Label>
              <Select
                required
                value={formData.membershipType}
                onValueChange={(value) =>
                  handleInputChange("membershipType", value)
                }
              >
                <SelectTrigger
                  id="membership-type"
                  className="bg-zinc-950 border-zinc-700"
                >
                  <SelectValue placeholder="Select membership type" />
                </SelectTrigger>
                <SelectContent>
                  {membershipTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="duration" className="text-zinc-300">
                Duration of Registration
              </Label>
              <DurationInput
                value={formData.duration}
                onChange={(value) => handleInputChange("duration", value)}
                placeholder="Enter or select duration"
                className="bg-zinc-950 border-zinc-700 focus:border-[#d4af37]"
              />
            </div>
          </div>
        </div>

        {/* Dates */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-[#e6c76a]">
            <Calendar className="w-4 h-4" />
            <span>Important Dates</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="reg-date" className="text-zinc-300">
                Date of Registration
              </Label>
              <Input
                id="reg-date"
                type="date"
                required
                value={formData.registrationDate}
                onChange={(e) =>
                  handleInputChange("registrationDate", e.target.value)
                }
                className="bg-zinc-950 border-zinc-700 focus:border-[#d4af37]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="card-received" className="text-zinc-300">
                Card Received Date
              </Label>
              <Input
                id="card-received"
                type="date"
                value={formData.cardReceivedDate}
                onChange={(e) =>
                  handleInputChange("cardReceivedDate", e.target.value)
                }
                className="bg-zinc-950 border-zinc-700 focus:border-[#d4af37]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="card-issue" className="text-zinc-300">
                Card Issue Date
              </Label>
              <Input
                id="card-issue"
                type="date"
                value={formData.cardIssueDate}
                onChange={(e) =>
                  handleInputChange("cardIssueDate", e.target.value)
                }
                className="bg-zinc-950 border-zinc-700 focus:border-[#d4af37]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="expiry" className="text-zinc-300">
                Expiry Date
              </Label>
              <Input
                id="expiry"
                type="date"
                required
                value={formData.expiryDate}
                onChange={(e) =>
                  handleInputChange("expiryDate", e.target.value)
                }
                className="bg-zinc-950 border-zinc-700 focus:border-[#d4af37]"
              />
            </div>
          </div>
        </div>

        {/* Payment Information */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-[#e6c76a]">
            <CreditCard className="w-4 h-4" />
            <span>Payment Information</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="amount" className="text-zinc-300">
                Amount
              </Label>
              <Input
                id="amount"
                required
                placeholder="$0.00"
                value={formData.amount}
                onChange={(e) => handleInputChange("amount", e.target.value)}
                className="bg-zinc-950 border-zinc-700 focus:border-[#d4af37]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="payment-date" className="text-zinc-300">
                Payment Date
              </Label>
              <Input
                id="payment-date"
                type="date"
                required
                value={formData.paymentDate}
                onChange={(e) =>
                  handleInputChange("paymentDate", e.target.value)
                }
                className="bg-zinc-950 border-zinc-700 focus:border-[#d4af37]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="payment-method" className="text-zinc-300">
                Method of Payment
              </Label>
              <Select
                required
                value={formData.paymentMethod}
                onValueChange={(value) =>
                  handleInputChange("paymentMethod", value)
                }
              >
                <SelectTrigger
                  id="payment-method"
                  className="bg-zinc-950 border-zinc-700"
                >
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent>
                  {paymentMethods.map((method) => (
                    <SelectItem key={method} value={method}>
                      {method}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="installment" className="text-zinc-300">
                Payment by Installment
              </Label>
              <Input
                id="installment"
                placeholder="e.g., Yes - 12 months or No"
                value={formData.paymentByInstallment}
                onChange={(e) =>
                  handleInputChange("paymentByInstallment", e.target.value)
                }
                className="bg-zinc-950 border-zinc-700 focus:border-[#d4af37]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="card-type" className="text-zinc-300">
                Types of Reg Card
              </Label>
              <Select
                value={formData.regCardType}
                onValueChange={(value) =>
                  handleInputChange("regCardType", value)
                }
              >
                <SelectTrigger
                  id="card-type"
                  className="bg-zinc-950 border-zinc-700"
                >
                  <SelectValue placeholder="Select card type" />
                </SelectTrigger>
                <SelectContent>
                  {cardTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={isLoading || isUploadingImage}
            className="border-zinc-700"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant={"accent"}
            disabled={isLoading || isUploadingImage}
          >
            {isUploadingImage
              ? "Uploading Image..."
              : isLoading
                ? "Registering..."
                : "Register Member"}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
