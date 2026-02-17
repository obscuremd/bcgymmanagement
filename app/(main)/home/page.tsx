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
  Home,
  Search,
  Filter,
  Plus,
  X,
  Calendar,
  CreditCard,
  User,
  Mail,
  Phone,
  MapPin,
  Clock,
  DollarSign,
} from "lucide-react";
import Image from "next/image";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import VehicleTable from "@/components/localComponents/FileTable";
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
import { useState } from "react";

interface Member {
  id: number;
  surname: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  image: string;
  membershipType: string;
  registrationDate: string;
  cardReceivedDate: string;
  duration: string;
  amount: string;
  cardIssueDate: string;
  regCardType: string;
  paymentMethod: string;
  expiryDate: string;
  status: "Active" | "Expired";
}

export default function Page() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState<boolean>(false);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] =
    useState<boolean>(false);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filterMembership, setFilterMembership] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 8;

  const members: Member[] = [
    {
      id: 1,
      surname: "Okonkwo",
      name: "Chinedu",
      email: "chinedu.okonkwo@gmail.com",
      phone: "+234 803 456 7890",
      address: "15 Admiralty Way, Lekki Phase 1, Lagos",
      image:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=600",
      membershipType: "VIP MEMBERSHIP",
      registrationDate: "2024-01-15",
      cardReceivedDate: "2024-01-20",
      duration: "12 Months",
      amount: "₦250,000",
      cardIssueDate: "2024-01-20",
      regCardType: "Gold Card",
      paymentMethod: "Bank Transfer",
      expiryDate: "2025-01-15",
      status: "Active",
    },
    {
      id: 2,
      surname: "Adeyemi",
      name: "Folake",
      email: "folake.adeyemi@yahoo.com",
      phone: "+234 810 234 5678",
      address: "42 Ozumba Mbadiwe, Victoria Island, Lagos",
      image:
        "https://plus.unsplash.com/premium_photo-1683121366070-5ceb7e007a97?w=600",
      membershipType: "REGULAR MEMBERSHIP",
      registrationDate: "2024-02-01",
      cardReceivedDate: "2024-02-05",
      duration: "6 Months",
      amount: "₦120,000",
      cardIssueDate: "2024-02-05",
      regCardType: "Standard Card",
      paymentMethod: "Cash",
      expiryDate: "2024-08-01",
      status: "Active",
    },
    {
      id: 3,
      surname: "Bello",
      name: "Ibrahim",
      email: "ibrahim.bello@outlook.com",
      phone: "+234 705 678 9012",
      address: "8 Glover Road, Ikoyi, Lagos",
      image:
        "https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?w=600",
      membershipType: "PERSONAL TRAINING REGISTERING",
      registrationDate: "2023-11-10",
      cardReceivedDate: "2023-11-15",
      duration: "3 Months",
      amount: "₦180,000",
      cardIssueDate: "2023-11-15",
      regCardType: "Platinum Card",
      paymentMethod: "POS",
      expiryDate: "2024-02-10",
      status: "Expired",
    },
    {
      id: 4,
      surname: "Nwosu",
      name: "Amara",
      email: "amara.nwosu@gmail.com",
      phone: "+234 816 345 6789",
      address: "23 Adeola Odeku Street, VI, Lagos",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600",
      membershipType: "ZUMBA MEMBERSHIP",
      registrationDate: "2024-01-20",
      cardReceivedDate: "2024-01-22",
      duration: "6 Months",
      amount: "₦95,000",
      cardIssueDate: "2024-01-22",
      regCardType: "Standard Card",
      paymentMethod: "Bank Transfer",
      expiryDate: "2024-07-20",
      status: "Active",
    },
    {
      id: 5,
      surname: "Williams",
      name: "Tunde",
      email: "tunde.williams@email.com",
      phone: "+234 803 987 6543",
      address: "56 Akin Adesola, VI, Lagos",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600",
      membershipType: "BOXING MEMBERSHIP",
      registrationDate: "2024-02-10",
      cardReceivedDate: "2024-02-12",
      duration: "12 Months",
      amount: "₦200,000",
      cardIssueDate: "2024-02-12",
      regCardType: "Gold Card",
      paymentMethod: "Card",
      expiryDate: "2025-02-10",
      status: "Active",
    },
    {
      id: 6,
      surname: "Okafor",
      name: "Blessing",
      email: "blessing.okafor@gmail.com",
      phone: "+234 809 123 4567",
      address: "12 Awolowo Road, Ikoyi, Lagos",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600",
      membershipType: "GROUP MEMBERSHIP",
      registrationDate: "2024-01-05",
      cardReceivedDate: "2024-01-08",
      duration: "12 Months",
      amount: "₦150,000",
      cardIssueDate: "2024-01-08",
      regCardType: "Standard Card",
      paymentMethod: "Bank Transfer",
      expiryDate: "2025-01-05",
      status: "Active",
    },
    {
      id: 7,
      surname: "Eze",
      name: "Chisom",
      email: "chisom.eze@yahoo.com",
      phone: "+234 817 234 5678",
      address: "34 Bourdillon Road, Ikoyi, Lagos",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600",
      membershipType: "ONLINE REGISTERING",
      registrationDate: "2024-02-15",
      cardReceivedDate: "2024-02-16",
      duration: "3 Months",
      amount: "₦75,000",
      cardIssueDate: "2024-02-16",
      regCardType: "Digital Card",
      paymentMethod: "Online Payment",
      expiryDate: "2024-05-15",
      status: "Active",
    },
    {
      id: 8,
      surname: "Ahmed",
      name: "Fatima",
      email: "fatima.ahmed@email.com",
      phone: "+234 708 456 7890",
      address: "67 Adetokunbo Ademola, VI, Lagos",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600",
      membershipType: "VIP MEMBERSHIP",
      registrationDate: "2023-12-01",
      cardReceivedDate: "2023-12-05",
      duration: "12 Months",
      amount: "₦250,000",
      cardIssueDate: "2023-12-05",
      regCardType: "Platinum Card",
      paymentMethod: "Bank Transfer",
      expiryDate: "2024-12-01",
      status: "Active",
    },
    {
      id: 9,
      surname: "Johnson",
      name: "Emmanuel",
      email: "emma.johnson@gmail.com",
      phone: "+234 815 678 9012",
      address: "19 Admiralty Way, Lekki, Lagos",
      image:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600",
      membershipType: "KIDS REGISTRATION",
      registrationDate: "2024-01-25",
      cardReceivedDate: "2024-01-27",
      duration: "6 Months",
      amount: "₦85,000",
      cardIssueDate: "2024-01-27",
      regCardType: "Junior Card",
      paymentMethod: "Cash",
      expiryDate: "2024-07-25",
      status: "Active",
    },
    {
      id: 10,
      surname: "Musa",
      name: "Zainab",
      email: "zainab.musa@outlook.com",
      phone: "+234 802 345 6789",
      address: "90 Ajose Adeogun, VI, Lagos",
      image:
        "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=600",
      membershipType: "SEASON PERSONAL TRAINING",
      registrationDate: "2024-02-05",
      cardReceivedDate: "2024-02-08",
      duration: "3 Months",
      amount: "₦165,000",
      cardIssueDate: "2024-02-08",
      regCardType: "Gold Card",
      paymentMethod: "POS",
      expiryDate: "2024-05-05",
      status: "Active",
    },
  ];

  // Filter and search logic
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

  // Pagination logic
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
    "PERSONAL TRAINING REGISTERING",
    "SEASON PERSONAL TRAINING",
    "ONLINE REGISTERING",
    "ZUMBA MEMBERSHIP",
    "BOXING MEMBERSHIP",
    "KIDS REGISTRATION",
  ];

  const paymentMethods: string[] = [
    "Cash",
    "Bank Transfer",
    "POS",
    "Card",
    "Online Payment",
  ];

  const cardTypes: string[] = [
    "Standard Card",
    "Gold Card",
    "Platinum Card",
    "Digital Card",
    "Junior Card",
  ];

  return (
    <div className="min-h-screen space-y-6 w-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row gap-5 items-center justify-between ">
        <div className="flex items-center gap-4">
          <div className="p-1 bg-gradient-to-br from-[#d4af37]/20 to-[#e6c76a]/20 rounded-full border border-[#d4af37]/30">
            <Logo />
          </div>

          <div>
            <p className="text-xl font-semibold text-white">
              BC Gym Management``
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
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-zinc-900 border-zinc-800">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-[#d4af37] to-[#e6c76a] bg-clip-text text-transparent">
                  New Member Registration
                </DialogTitle>
              </DialogHeader>

              <form className="space-y-6 mt-4">
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
                        placeholder="Enter surname"
                        className="bg-zinc-950 border-zinc-700 focus:border-[#d4af37]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-zinc-300">
                        Name
                      </Label>
                      <Input
                        id="name"
                        placeholder="Enter name"
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
                        placeholder="+234 XXX XXX XXXX"
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
                        placeholder="email@example.com"
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
                      placeholder="Enter full address"
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
                      <Label
                        htmlFor="membership-type"
                        className="text-zinc-300"
                      >
                        Type of Registration
                      </Label>
                      <Select>
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
                      <Select>
                        <SelectTrigger
                          id="duration"
                          className="bg-zinc-950 border-zinc-700"
                        >
                          <SelectValue placeholder="Select duration" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 Month</SelectItem>
                          <SelectItem value="3">3 Months</SelectItem>
                          <SelectItem value="6">6 Months</SelectItem>
                          <SelectItem value="12">12 Months</SelectItem>
                        </SelectContent>
                      </Select>
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
                        className="bg-zinc-950 border-zinc-700 focus:border-[#d4af37]"
                      />
                    </div>
                  </div>
                </div>

                {/* Payment Information */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-[#e6c76a]">
                    <DollarSign className="w-4 h-4" />
                    <span>Payment Information</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="amount" className="text-zinc-300">
                        Amount
                      </Label>
                      <Input
                        id="amount"
                        placeholder="₦0.00"
                        className="bg-zinc-950 border-zinc-700 focus:border-[#d4af37]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="payment-method" className="text-zinc-300">
                        Method of Payment
                      </Label>
                      <Select>
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
                      <Label htmlFor="card-type" className="text-zinc-300">
                        Types of Reg Card
                      </Label>
                      <Select>
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
                    onClick={() => setIsAddDialogOpen(false)}
                    className="border-zinc-700"
                  >
                    Cancel
                  </Button>
                  <Button type="submit" variant={"accent"}>
                    Register Member
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
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

        {paginatedMembers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {paginatedMembers.map((member) => (
              <div
                key={member.id}
                onClick={() => handleMemberClick(member)}
                className="group cursor-pointer bg-zinc-950 border border-zinc-800 rounded-xl p-4 hover:border-[#d4af37]/60 hover:shadow-lg hover:shadow-[#d4af37]/10 transition-all duration-300"
              >
                <div className="flex items-start gap-3">
                  <div className="relative">
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={50}
                      height={50}
                      className="rounded-full object-cover ring-2 ring-zinc-800 group-hover:ring-[#d4af37]/30 transition-all"
                    />
                    <div
                      className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-zinc-950 ${member.status === "Active" ? "bg-green-500" : "bg-red-500"}`}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-white truncate group-hover:text-[#e6c76a] transition-colors">
                      {member.name} {member.surname}
                    </h3>
                    <p className="text-xs text-zinc-400 truncate">
                      {member.email}
                    </p>
                    <p className="text-xs text-zinc-500 mt-1">{member.phone}</p>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-zinc-800 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-zinc-500">Membership</span>
                    <span
                      className="text-[#e6c76a] font-medium truncate ml-2 max-w-[140px]"
                      title={member.membershipType}
                    >
                      {member.membershipType.split(" ")[0]}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-zinc-500">Expires</span>
                    <span className="text-zinc-300">
                      {new Date(member.expiryDate).toLocaleDateString("en-GB")}
                    </span>
                  </div>
                </div>
              </div>
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
        {totalPages > 1 && (
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
        <DialogContent className="h-[70vh] overflow-y-scroll max-w-2xl bg-zinc-900 border-zinc-800">
          {selectedMember && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-4">
                  <Image
                    src={selectedMember.image}
                    alt={selectedMember.name}
                    width={60}
                    height={60}
                    className="rounded-full object-cover ring-2 ring-[#d4af37]/30"
                  />
                  <div>
                    <DialogTitle className="text-2xl font-bold text-white">
                      {selectedMember.name} {selectedMember.surname}
                    </DialogTitle>
                    <p className="text-sm text-zinc-400">
                      {selectedMember.membershipType}
                    </p>
                  </div>
                  <div
                    className={`ml-auto px-3 py-1 rounded-full text-xs font-semibold ${
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
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm font-semibold text-[#e6c76a]">
                    <User className="w-4 h-4" />
                    <span>Personal Information</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 bg-zinc-950 rounded-lg p-4">
                    <div>
                      <p className="text-xs text-zinc-500">Full Name</p>
                      <p className="text-sm text-white mt-1">
                        {selectedMember.name} {selectedMember.surname}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-zinc-500">Email</p>
                      <p className="text-sm text-white mt-1 truncate">
                        {selectedMember.email}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-zinc-500">Phone</p>
                      <p className="text-sm text-white mt-1">
                        {selectedMember.phone}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-zinc-500">Address</p>
                      <p className="text-sm text-white mt-1 truncate ">
                        {selectedMember.address}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Membership Details */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm font-semibold text-[#e6c76a]">
                    <CreditCard className="w-4 h-4" />
                    <span>Membership Details</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 bg-zinc-950 rounded-lg p-4">
                    <div>
                      <p className="text-xs text-zinc-500">Membership Type</p>
                      <p className="text-sm text-white mt-1">
                        {selectedMember.membershipType}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-zinc-500">Duration</p>
                      <p className="text-sm text-white mt-1">
                        {selectedMember.duration}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-zinc-500">Card Type</p>
                      <p className="text-sm text-white mt-1">
                        {selectedMember.regCardType}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-zinc-500">Amount Paid</p>
                      <p className="text-sm text-[#d4af37] font-semibold mt-1">
                        {selectedMember.amount}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Important Dates */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm font-semibold text-[#e6c76a]">
                    <Calendar className="w-4 h-4" />
                    <span>Important Dates</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 bg-zinc-950 rounded-lg p-4">
                    <div>
                      <p className="text-xs text-zinc-500">Registration Date</p>
                      <p className="text-sm text-white mt-1">
                        {new Date(
                          selectedMember.registrationDate,
                        ).toLocaleDateString("en-GB")}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-zinc-500">Card Received</p>
                      <p className="text-sm text-white mt-1">
                        {new Date(
                          selectedMember.cardReceivedDate,
                        ).toLocaleDateString("en-GB")}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-zinc-500">Card Issue Date</p>
                      <p className="text-sm text-white mt-1">
                        {new Date(
                          selectedMember.cardIssueDate,
                        ).toLocaleDateString("en-GB")}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-zinc-500">Expiry Date</p>
                      <p
                        className={`text-sm font-semibold mt-1 ${
                          selectedMember.status === "Active"
                            ? "text-green-400"
                            : "text-red-400"
                        }`}
                      >
                        {new Date(selectedMember.expiryDate).toLocaleDateString(
                          "en-GB",
                        )}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Payment Information */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm font-semibold text-[#e6c76a]">
                    <DollarSign className="w-4 h-4" />
                    <span>Payment Information</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 bg-zinc-950 rounded-lg p-4">
                    <div>
                      <p className="text-xs text-zinc-500">Payment Method</p>
                      <p className="text-sm text-white mt-1">
                        {selectedMember.paymentMethod}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-zinc-500">Amount</p>
                      <p className="text-sm text-[#d4af37] font-semibold mt-1">
                        {selectedMember.amount}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <DialogFooter className="mt-6">
                <Button
                  variant="outline"
                  onClick={() => setIsDetailsDialogOpen(false)}
                  className="border-zinc-700"
                >
                  Close
                </Button>
                <Button variant={"accent"}>Edit Member</Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
