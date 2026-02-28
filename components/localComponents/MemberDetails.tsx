"use client";
import {
  Calendar,
  CreditCard,
  DollarSign,
  User,
  Trash2,
  Edit,
} from "lucide-react";
import { InfoField, InfoSection } from "./InfoSection";
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Dialog,
} from "../ui/dialog";
import { Button } from "../ui/button";
import Image from "next/image";
import { useState } from "react";
import { deleteMember } from "@/lib/api";
import { toast } from "sonner";
import EditMemberDialog from "./EditMemberDialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";

interface MemberDetailsProps {
  selectedMember: Member;
  onClose: () => void;
  onSuccess: () => void;
}

export default function MemberDetails({
  selectedMember,
  onClose,
  onSuccess,
}: MemberDetailsProps) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const handleDelete = async () => {
    if (!selectedMember) return;

    const memberId = selectedMember._id;
    if (!memberId) {
      toast.error("Error", {
        description: "Member ID not found",
      });
      return;
    }

    setIsDeleting(true);
    toast.loading("Deleting member...", { id: "delete-member" });

    try {
      const result = await deleteMember(memberId);

      if (result.success) {
        toast.success("Member Deleted Successfully!", {
          id: "delete-member",
          description: `${selectedMember.name} ${selectedMember.surname} has been removed from the system.`,
        });

        // Close dialogs and refresh after short delay
        setTimeout(() => {
          setIsDeleteDialogOpen(false);
          onClose();
          onSuccess();
        }, 1500);
      } else {
        toast.error("Delete Failed", {
          id: "delete-member",
          description:
            result.message || "Failed to delete member. Please try again.",
        });
      }
    } catch (error) {
      toast.error("Delete Failed", {
        id: "delete-member",
        description: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const handleEditSuccess = () => {
    setIsEditDialogOpen(false);
    onSuccess();
  };

  return (
    <>
      <DialogContent className="h-[70vh] overflow-y-scroll max-w-2xl bg-zinc-900 border-zinc-800">
        {selectedMember && (
          <>
            <DialogHeader>
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 rounded-full overflow-hidden ring-2 ring-[#d4af37]/30">
                  {selectedMember.image ? (
                    <Image
                      src={selectedMember.image}
                      alt={selectedMember.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-zinc-800 flex items-center justify-center">
                      <User className="w-8 h-8 text-zinc-600" />
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <DialogTitle className="text-2xl font-bold text-white">
                    {selectedMember.name} {selectedMember.surname}
                  </DialogTitle>
                  <p className="text-sm text-zinc-400">
                    {selectedMember.membershipType}
                  </p>
                </div>
                <div
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    selectedMember.status === "Active"
                      ? "bg-green-500/20 text-green-400"
                      : "bg-red-500/20 text-red-400"
                  }`}
                >
                  {selectedMember.status}
                </div>
              </div>
            </DialogHeader>

            <div className="space-y-6 mt-6">
              {/* Personal Information */}
              <InfoSection
                icon={<User className="w-4 h-4" />}
                title="Personal Information"
              >
                <InfoField
                  label="Full Name"
                  value={`${selectedMember.name} ${selectedMember.surname}`}
                />
                <InfoField
                  label="Email"
                  value={selectedMember.email}
                  className="truncate"
                />
                <InfoField label="Phone" value={selectedMember.phone} />
                <InfoField
                  label="Address"
                  value={selectedMember.address}
                  className="truncate"
                />
              </InfoSection>

              {/* Membership Details */}
              <InfoSection
                icon={<CreditCard className="w-4 h-4" />}
                title="Membership Details"
              >
                <InfoField
                  label="Membership Type"
                  value={selectedMember.membershipType}
                />
                <InfoField label="Duration" value={selectedMember.duration} />
                <InfoField
                  label="Card Type"
                  value={selectedMember.regCardType || "N/A"}
                />
                <InfoField
                  label="Amount Paid"
                  value={selectedMember.amount}
                  className="text-[#d4af37] font-semibold"
                />
              </InfoSection>

              {/* Important Dates */}
              <InfoSection
                icon={<Calendar className="w-4 h-4" />}
                title="Important Dates"
              >
                <InfoField
                  label="Registration Date"
                  value={new Date(
                    selectedMember.registrationDate,
                  ).toLocaleDateString("en-GB")}
                />
                <InfoField
                  label="Card Received"
                  value={
                    selectedMember.cardReceivedDate
                      ? new Date(
                          selectedMember.cardReceivedDate,
                        ).toLocaleDateString("en-GB")
                      : "N/A"
                  }
                />
                <InfoField
                  label="Card Issue Date"
                  value={
                    selectedMember.cardIssueDate
                      ? new Date(
                          selectedMember.cardIssueDate,
                        ).toLocaleDateString("en-GB")
                      : "N/A"
                  }
                />
                <InfoField
                  label="Expiry Date"
                  value={new Date(selectedMember.expiryDate).toLocaleDateString(
                    "en-GB",
                  )}
                  className={
                    selectedMember.status === "Active"
                      ? "text-green-400 font-semibold"
                      : "text-red-400 font-semibold"
                  }
                />
              </InfoSection>

              {/* Payment Information */}
              <InfoSection
                icon={<DollarSign className="w-4 h-4" />}
                title="Payment Information"
              >
                <InfoField
                  label="Payment Method"
                  value={selectedMember.paymentMethod}
                />
                <InfoField
                  label="Payment Date"
                  value={new Date(
                    selectedMember.paymentDate,
                  ).toLocaleDateString("en-GB")}
                />
                <InfoField
                  label="Payment by Installment"
                  value={selectedMember.paymentByInstallment || "No"}
                />
                <InfoField
                  label="Amount"
                  value={selectedMember.amount}
                  className="text-[#d4af37] font-semibold"
                />
              </InfoSection>
            </div>

            <DialogFooter className="mt-6 gap-2">
              <Button
                variant="outline"
                onClick={() => setIsDeleteDialogOpen(true)}
                className="border-red-500/50 text-red-400 hover:bg-red-500/10 hover:text-red-300"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Member
              </Button>
              <Button
                variant={"accent"}
                onClick={() => setIsEditDialogOpen(true)}
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit Member
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>

      {/* Edit Dialog */}
      {selectedMember && (
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <EditMemberDialog
            member={selectedMember}
            onClose={() => setIsEditDialogOpen(false)}
            onSuccess={handleEditSuccess}
          />
        </Dialog>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent className="bg-zinc-900 border-zinc-800">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">
              Delete Member
            </AlertDialogTitle>
            <AlertDialogDescription className="text-zinc-400">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-white">
                {selectedMember?.name} {selectedMember?.surname}
              </span>
              ? This action cannot be undone and will permanently remove all
              their information from the system.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              disabled={isDeleting}
              className="border-zinc-700"
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              {isDeleting ? "Deleting..." : "Delete Member"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
