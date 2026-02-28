"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter, Plus, X } from "lucide-react";
import Logo from "@/components/localComponents/Logo";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { MemberCard } from "@/components/localComponents/MemberCard";
import RegistrationForm from "@/components/localComponents/RegistrationForm";
import MemberDetails from "@/components/localComponents/MemberDetails";
import { getMembers } from "@/lib/api";
import { toast } from "sonner";

export default function Page() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState<boolean>(false);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] =
    useState<boolean>(false);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filterMembership, setFilterMembership] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [members, setMembers] = useState<Member[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const itemsPerPage = 8;

  // Fetch members on component mount
  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    setIsLoading(true);
    try {
      const result = await getMembers();

      if (result.success && result.data) {
        setMembers(result.data);
      } else {
        toast.error("Failed to Load Members", {
          description:
            result.message || "Could not fetch members from the server.",
        });
      }
    } catch (error) {
      toast.error("Error Loading Members", {
        description: "An unexpected error occurred while loading members.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleMemberCreated = () => {
    fetchMembers(); // Refresh the members list
  };

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

  return (
    <div className="min-h-screen space-y-6 w-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row gap-5 items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-1 bg-gradient-to-br from-[#d4af37]/20 to-[#e6c76a]/20 rounded-full border border-[#d4af37]/30">
            <Logo />
          </div>

          <div>
            <p className="text-xl font-semibold text-white">
              BC Gym Management
            </p>
            <div className="h-[2px] w-40 bg-gradient-to-r from-[#d4af37] via-[#e6c76a] to-transparent mt-1.5" />
            <p className="text-sm text-neutral-400 mt-1">
              Gym Membership & Trainer Management Portal
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Select>
            <SelectTrigger className="w-[200px] bg-zinc-900 border-zinc-700 hover:border-[#d4af37]/50 transition-colors">
              <SelectValue placeholder="Select Location" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="main">Main Facility</SelectItem>
                <SelectItem value="lekki">Lekki Branch</SelectItem>
                <SelectItem value="vi">Victoria Island</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button variant={"accent"}>
                <Plus className="w-4 h-4 mr-2" />
                Add Member
              </Button>
            </DialogTrigger>
            <RegistrationForm
              onClose={() => setIsAddDialogOpen(false)}
              onSuccess={handleMemberCreated}
            />
          </Dialog>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6 shadow-xl space-y-4">
        <div className="flex items-center gap-2 text-sm font-semibold text-white mb-4">
          <Filter className="w-4 h-4 text-[#d4af37]" />
          <span>Filters & Search</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative md:col-span-2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <Input
              placeholder="Search by name, email, or phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-zinc-950 border-zinc-700 focus:border-[#d4af37]"
            />
          </div>

          <Select value={filterMembership} onValueChange={setFilterMembership}>
            <SelectTrigger className="bg-zinc-950 border-zinc-700">
              <SelectValue placeholder="Membership Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Memberships</SelectItem>
              {membershipTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="bg-zinc-950 border-zinc-700">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Expired">Expired</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center justify-between text-sm text-zinc-400">
          <span>
            Showing {paginatedMembers.length} of {filteredMembers.length}{" "}
            members
          </span>
          {(searchQuery ||
            filterMembership !== "all" ||
            filterStatus !== "all") && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSearchQuery("");
                setFilterMembership("all");
                setFilterStatus("all");
              }}
              className="text-[#d4af37] hover:text-[#b8962e]"
            >
              <X className="w-3 h-3 mr-1" />
              Clear Filters
            </Button>
          )}
        </div>
      </div>

      {/* Members Grid */}
      <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6 shadow-xl">
        <div className="relative text-lg font-semibold pl-4 mb-6">
          <span className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-[3px] rounded-full bg-gradient-to-b from-[#d4af37] to-[#e6c76a]" />
          Members Directory
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-zinc-800/50 mb-4">
              <div className="w-8 h-8 border-4 border-[#d4af37] border-t-transparent rounded-full animate-spin"></div>
            </div>
            <p className="text-zinc-400">Loading members...</p>
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
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-zinc-800/50 mb-4">
              <Search className="w-8 h-8 text-zinc-600" />
            </div>
            <p className="text-zinc-400">
              No members found matching your criteria
            </p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && !isLoading && (
          <div className="flex items-center justify-between mt-6 pt-6 border-t border-zinc-800">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="border-zinc-700 disabled:opacity-50"
            >
              Previous
            </Button>

            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(page)}
                    className={
                      currentPage === page
                        ? "bg-gradient-to-r from-[#d4af37] to-[#e6c76a] text-[#0f1a14] font-semibold border-0"
                        : "border-zinc-700"
                    }
                  >
                    {page}
                  </Button>
                ),
              )}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="border-zinc-700 disabled:opacity-50"
            >
              Next
            </Button>
          </div>
        )}
      </div>

      {/* Member Details Dialog */}
      <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
        {selectedMember !== null && (
          <MemberDetails
            onSuccess={() => setIsDetailsDialogOpen(false)}
            onClose={() => setIsDetailsDialogOpen(false)}
            selectedMember={selectedMember}
          />
        )}
      </Dialog>
    </div>
  );
}
