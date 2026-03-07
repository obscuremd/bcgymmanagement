"use client";

import { useState, FormEvent } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { User, Mail, ShieldAlert, ShieldCheck, UserCog } from "lucide-react";

interface CreateUserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export default function CreateUserDialog({
  open,
  onOpenChange,
  onSuccess,
}: CreateUserDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    role: "visitor",
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        toast.success("User Created Successfully!", {
          description: `${formData.username} has been added to the system`,
        });

        // Reset form
        setFormData({
          username: "",
          email: "",
          role: "visitor",
        });

        setTimeout(() => {
          onSuccess();
          onOpenChange(false);
        }, 1000);
      } else {
        toast.error("Failed to Create User", {
          description: data.message || "An error occurred",
        });
      }
    } catch (error) {
      toast.error("Failed to Create User", {
        description: "An unexpected error occurred",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md bg-zinc-900 border-zinc-800">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-[#d4af37] to-[#e6c76a] bg-clip-text text-transparent">
            Create New User
          </DialogTitle>
          <DialogDescription className="text-zinc-400">
            User will receive an OTP via email when they login
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 mt-4">
          {/* Username */}
          <div className="space-y-2">
            <Label
              htmlFor="username"
              className="text-zinc-300 flex items-center gap-2"
            >
              <User className="w-4 h-4" />
              Username
            </Label>
            <Input
              id="username"
              required
              placeholder="Enter username"
              value={formData.username}
              onChange={(e) => handleInputChange("username", e.target.value)}
              className="bg-zinc-950 border-zinc-700 focus:border-[#d4af37]"
              minLength={3}
              maxLength={30}
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="text-zinc-300 flex items-center gap-2"
            >
              <Mail className="w-4 h-4" />
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              required
              placeholder="user@example.com"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className="bg-zinc-950 border-zinc-700 focus:border-[#d4af37]"
            />
          </div>

          {/* Role */}
          <div className="space-y-2">
            <Label htmlFor="role" className="text-zinc-300">
              User Role
            </Label>
            <Select
              value={formData.role}
              onValueChange={(value) => handleInputChange("role", value)}
            >
              <SelectTrigger id="role" className="bg-zinc-950 border-zinc-700">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">
                  <div className="flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 text-red-400" />
                    <div>
                      <p className="font-medium">Admin</p>
                      <p className="text-xs text-zinc-500">
                        Full system access
                      </p>
                    </div>
                  </div>
                </SelectItem>
                <SelectItem value="staff">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-blue-400" />
                    <div>
                      <p className="font-medium">Staff</p>
                      <p className="text-xs text-zinc-500">
                        Manage members & operations
                      </p>
                    </div>
                  </div>
                </SelectItem>
                <SelectItem value="visitor">
                  <div className="flex items-center gap-2">
                    <UserCog className="w-4 h-4 text-zinc-400" />
                    <div>
                      <p className="font-medium">Visitor</p>
                      <p className="text-xs text-zinc-500">View-only access</p>
                    </div>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
              className="border-zinc-700"
            >
              Cancel
            </Button>
            <Button type="submit" variant="accent" disabled={isLoading}>
              {isLoading ? "Creating..." : "Create User"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
