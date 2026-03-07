"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Search,
  MoreVertical,
  Trash2,
  ShieldAlert,
  ShieldCheck,
  UserCog,
} from "lucide-react";
import { toast } from "sonner";

interface User {
  _id: string;
  username: string;
  email: string;
  role: "admin" | "staff" | "visitor";
  createdAt: string;
  updatedAt: string;
}

interface UsersTableProps {
  users: User[];
  onRoleChange: (userId: string, newRole: string) => Promise<void>;
  onDeleteUser: (userId: string) => Promise<void>;
}

export default function UsersTable({
  users,
  onRoleChange,
  onDeleteUser,
}: UsersTableProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");

  // Filter users
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRole = roleFilter === "all" || user.role === roleFilter;

    return matchesSearch && matchesRole;
  });

  const getRoleBadge = (role: string) => {
    const styles = {
      admin: "bg-red-500/10 text-red-400 border-red-500/30",
      staff: "bg-blue-500/10 text-blue-400 border-blue-500/30",
      visitor: "bg-zinc-500/10 text-zinc-400 border-zinc-500/30",
    };

    const icons = {
      admin: <ShieldAlert className="w-3 h-3" />,
      staff: <ShieldCheck className="w-3 h-3" />,
      visitor: <UserCog className="w-3 h-3" />,
    };

    return (
      <Badge
        variant="outline"
        className={`${styles[role as keyof typeof styles]} flex items-center gap-1.5`}
      >
        {icons[role as keyof typeof icons]}
        <span className="capitalize">{role}</span>
      </Badge>
    );
  };

  const handleRoleChange = async (userId: string, newRole: string) => {
    try {
      await onRoleChange(userId, newRole);
      toast.success("Role Updated", {
        description: `User role changed to ${newRole}`,
      });
    } catch (error) {
      toast.error("Failed to update role");
    }
  };

  const handleDelete = async (userId: string, username: string) => {
    if (window.confirm(`Are you sure you want to delete ${username}?`)) {
      try {
        await onDeleteUser(userId);
        toast.success("User Deleted", {
          description: `${username} has been removed`,
        });
      } catch (error) {
        toast.error("Failed to delete user");
      }
    }
  };

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <Input
            placeholder="Search by username or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 bg-zinc-900 border-zinc-800 focus:border-[#d4af37]"
          />
        </div>

        {/* Role Filter */}
        <Select value={roleFilter} onValueChange={setRoleFilter}>
          <SelectTrigger className="w-full sm:w-[180px] bg-zinc-900 border-zinc-800">
            <SelectValue placeholder="Filter by role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="staff">Staff</SelectItem>
            <SelectItem value="visitor">Visitor</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Results Count */}
      <div className="text-sm text-zinc-400">
        Showing {filteredUsers.length} of {users.length} users
      </div>

      {/* Table */}
      <div className="border border-zinc-800 rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-zinc-900/50 hover:bg-zinc-900/50 border-zinc-800">
              <TableHead className="text-zinc-300 font-semibold">
                Username
              </TableHead>
              <TableHead className="text-zinc-300 font-semibold">
                Email
              </TableHead>
              <TableHead className="text-zinc-300 font-semibold">
                Role
              </TableHead>
              <TableHead className="text-zinc-300 font-semibold">
                Created
              </TableHead>
              <TableHead className="text-zinc-300 font-semibold text-right">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center py-8 text-zinc-500"
                >
                  No users found
                </TableCell>
              </TableRow>
            ) : (
              filteredUsers.map((user) => (
                <TableRow
                  key={user._id}
                  className="border-zinc-800 hover:bg-zinc-900/30"
                >
                  <TableCell className="font-medium text-white">
                    {user.username}
                  </TableCell>
                  <TableCell className="text-zinc-400">{user.email}</TableCell>
                  <TableCell>
                    <Select
                      value={user.role}
                      onValueChange={(value) =>
                        handleRoleChange(user._id, value)
                      }
                    >
                      <SelectTrigger className="w-[140px] h-8 bg-zinc-900 border-zinc-700">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">
                          <div className="flex items-center gap-2">
                            <ShieldAlert className="w-3 h-3 text-red-400" />
                            <span>Admin</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="staff">
                          <div className="flex items-center gap-2">
                            <ShieldCheck className="w-3 h-3 text-blue-400" />
                            <span>Staff</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="visitor">
                          <div className="flex items-center gap-2">
                            <UserCog className="w-3 h-3 text-zinc-400" />
                            <span>Visitor</span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="text-zinc-400 text-xs">
                    {new Date(user.createdAt).toLocaleDateString("en-GB")}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuItem
                          onClick={() => handleDelete(user._id, user.username)}
                          className="text-red-400 focus:text-red-400"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete User
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
