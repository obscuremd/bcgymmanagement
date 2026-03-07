/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { UserPlus, Users, Shield } from "lucide-react";
import Logo from "@/components/localComponents/Logo";
import CreateUserDialog from "@/components/localComponents/CreateUserDialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import UsersTable from "@/components/localComponents/UserTable";
import { UserData } from "@/utils/User";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<UserData[]>([]);
  const [stats, setStats] = useState({
    total: 0,
    admins: 0,
    staff: 0,
    visitors: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  // Fetch users and stats
  const fetchData = async () => {
    try {
      const [usersData, statsData] = await Promise.all([
        fetch("/api/users").then((res) => res.json()),
        fetch("/api/users/stats").then((res) => res.json()),
      ]);

      if (usersData.success) {
        setUsers(usersData.data);
      }

      if (statsData.success) {
        setStats(statsData.data);
      }
    } catch (error) {
      toast.error("Failed to load data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Handle role change
  const handleRoleChange = async (userId: string, newRole: string) => {
    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ role: newRole }),
      });

      const data = await response.json();

      if (data.success) {
        // Update local state
        setUsers((prev) =>
          prev.map((user) =>
            user._id === userId ? { ...user, role: newRole as any } : user,
          ),
        );

        // Update stats
        await fetchData();
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      throw error;
    }
  };

  // Handle delete user
  const handleDeleteUser = async (userId: string) => {
    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (data.success) {
        // Remove from local state
        setUsers((prev) => prev.filter((user) => user._id !== userId));

        // Update stats
        await fetchData();
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* ================= Header ================= */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-1 bg-gradient-to-br from-[#d4af37]/20 to-[#e6c76a]/20 rounded-full border border-[#d4af37]/30">
            <Logo />
          </div>

          <div>
            <p className="text-xl font-semibold text-white">User Management</p>
            <div className="h-[2px] w-48 bg-gradient-to-r from-[#d4af37] via-[#e6c76a] to-transparent mt-1.5" />
            <p className="text-sm text-zinc-400 mt-1">
              Manage users & permissions
            </p>
          </div>
        </div>

        <Button
          onClick={() => setIsCreateDialogOpen(true)}
          className="gap-2 bg-gradient-to-r from-[#d4af37] to-[#e6c76a] hover:from-[#b8962e] hover:to-[#d4af37] text-[#0f1a14] font-semibold"
        >
          <UserPlus className="w-4 h-4" />
          Create User
        </Button>
      </div>

      {/* ================= Stats ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Users */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-5">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-sm text-zinc-400 mb-1">Total Users</p>
              <p className="text-3xl font-bold text-white">{stats.total}</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-[#d4af37]/10 flex items-center justify-center flex-shrink-0">
              <Users className="w-5 h-5 text-[#d4af37]" />
            </div>
          </div>
        </div>

        {/* Admins */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-5">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-sm text-zinc-400 mb-1">Administrators</p>
              <p className="text-3xl font-bold text-white">{stats.admins}</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center flex-shrink-0">
              <Shield className="w-5 h-5 text-red-400" />
            </div>
          </div>
        </div>

        {/* Staff */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-5">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-sm text-zinc-400 mb-1">Staff Members</p>
              <p className="text-3xl font-bold text-white">{stats.staff}</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
              <Shield className="w-5 h-5 text-blue-400" />
            </div>
          </div>
        </div>

        {/* Visitors */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-5">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-sm text-zinc-400 mb-1">Visitors</p>
              <p className="text-3xl font-bold text-white">{stats.visitors}</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-zinc-500/10 flex items-center justify-center flex-shrink-0">
              <Users className="w-5 h-5 text-zinc-400" />
            </div>
          </div>
        </div>
      </div>

      {/* ================= Users Table ================= */}
      <div className="border border-zinc-800 rounded-lg bg-zinc-900/30 p-6">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#d4af37]" />
          </div>
        ) : (
          <UsersTable
            users={users}
            onRoleChange={handleRoleChange}
            onDeleteUser={handleDeleteUser}
          />
        )}
      </div>

      {/* ================= Create User Dialog ================= */}
      <CreateUserDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onSuccess={fetchData}
      />
    </div>
  );
}
