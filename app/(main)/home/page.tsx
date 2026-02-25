"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  Filter,
  Plus,
  X,
  Calendar,
  CreditCard,
  User,
  Mail,
  DollarSign,
} from "lucide-react";
import Image from "next/image";
import Logo from "@/components/localComponents/Logo";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { MemberCard } from "@/components/localComponents/MemberCard";
import {
  InfoSection,
  InfoField,
} from "@/components/localComponents/InfoSection";
import { DurationInput } from "@/components/localComponents/DurationInput";
import { getMembers, updateMember } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

export default function Page() {
  const { toast } = useToast();

  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(false);

  const [isDetailsDialogOpen, setIsDetailsDialogOpen] =
    useState<boolean>(false);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [filterMembership, setFilterMembership] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  const itemsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);

  // ================= FETCH MEMBERS =================
  useEffect(() => {
    const fetchMembers = async () => {
      setLoading(true);
      const response = await getMembers();

      if (response.success) {
        setMembers(response.data ?? []);
      } else {
        toast({
          title: "Error",
          description: response.message,
          variant: "destructive",
        });
      }

      setLoading(false);
    };

    fetchMembers();
  }, []);

  // ================= FILTERING =================
  const filteredMembers = members.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.surname.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.phone.includes(searchQuery);

    const matchesMembership =
      filterMembership === "all" || member.membershipType === filterMembership;

    const matchesStatus =
      filterStatus === "all" || member.status === filterStatus;

    return matchesSearch && matchesMembership && matchesStatus;
  });

  const totalPages = Math.ceil(filteredMembers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedMembers = filteredMembers.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const handleMemberClick = (member: Member) => {
    setSelectedMember(member);
    setIsDetailsDialogOpen(true);
  };

  // ================= EDIT MEMBER (OPTIMISTIC) =================
  const handleStatusToggle = async () => {
    if (!selectedMember) return;

    const updatedStatus =
      selectedMember.status === "Active" ? "Expired" : "Active";

    const previousMembers = [...members];

    // optimistic update
    setMembers((prev) =>
      prev.map((m) =>
        m._id === selectedMember._id ? { ...m, status: updatedStatus } : m,
      ),
    );

    try {
      const response = await updateMember(selectedMember._id, {
        status: updatedStatus,
      });

      if (!response.success) throw new Error();

      toast({
        title: "Member updated",
        description: "Status updated successfully.",
      });

      setSelectedMember({
        ...selectedMember,
        status: updatedStatus,
      });
    } catch (err) {
      setMembers(previousMembers);

      toast({
        title: "Update failed",
        description: "Could not update member.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen space-y-6 w-full">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Logo />
        <div>
          <p className="text-xl font-semibold text-white">BC Gym Management</p>
          <p className="text-sm text-neutral-400">
            Gym Membership & Trainer Management Portal
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Input
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <Select value={filterMembership} onValueChange={setFilterMembership}>
            <SelectTrigger>
              <SelectValue placeholder="Membership Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Memberships</SelectItem>
              <SelectItem value="VIP MEMBERSHIP">VIP MEMBERSHIP</SelectItem>
              <SelectItem value="REGULAR MEMBERSHIP">
                REGULAR MEMBERSHIP
              </SelectItem>
            </SelectContent>
          </Select>

          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger>
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Expired">Expired</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Members Grid */}
      <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="h-40 rounded-lg bg-zinc-800 animate-pulse"
              />
            ))}
          </div>
        ) : paginatedMembers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {paginatedMembers.map((member) => (
              <MemberCard
                key={member._id}
                member={member}
                onClick={() => handleMemberClick(member)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-zinc-400">
            No members found
          </div>
        )}
      </div>

      {/* Details Dialog */}
      <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
        <DialogContent className="max-w-2xl bg-zinc-900 border-zinc-800">
          {selectedMember && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl text-white">
                  {selectedMember.name} {selectedMember.surname}
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-6 mt-6">
                <InfoSection
                  icon={<User className="w-4 h-4" />}
                  title="Personal Information"
                >
                  <InfoField label="Email" value={selectedMember.email} />
                  <InfoField label="Phone" value={selectedMember.phone} />
                  <InfoField label="Status" value={selectedMember.status} />
                </InfoSection>
              </div>

              <DialogFooter className="mt-6">
                <Button
                  variant="outline"
                  onClick={() => setIsDetailsDialogOpen(false)}
                >
                  Close
                </Button>
                <Button variant="accent" onClick={handleStatusToggle}>
                  Toggle Status
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
