"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Home, Users, Shield, UserCog, Search } from "lucide-react";
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
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useParams } from "next/navigation";
import { cn } from "@/lib/utils";

const categoryConfig = {
  dealers: {
    label: "Dealers",
    description:
      "Manage dealers associated with this park and review their activity",
    icon: Users,
    accent: "#26ba81",
  },
  boys: {
    label: "Boys",
    description: "View and manage boys assigned to dealers and vehicles",
    icon: UserCog,
    accent: "#3b82f6",
  },
  admin: {
    label: "Administrators",
    description: "System administrators with full access and privileges",
    icon: Shield,
    accent: "#a855f7",
  },
  accountant: {
    label: "Accountants",
    description: "Responsible for managing financial entries and records",
    icon: Home,
    accent: "#f59e0b",
  },
};

export default function Page() {
  const params = useParams();
  const category = params.category as keyof typeof categoryConfig;

  const config = categoryConfig[category] ?? categoryConfig.dealers;
  const Icon = config.icon;

  const data = [
    {
      name: "Gbagadi Gbugembi",
      email: "gbagadi@gmail.com",
      image:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=600",
    },
    {
      name: "Ayo Martins",
      email: "ayo@gmail.com",
      image:
        "https://plus.unsplash.com/premium_photo-1683121366070-5ceb7e007a97?w=600",
    },
    {
      name: "Kola Ade",
      email: "kola@gmail.com",
      image:
        "https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?w=600",
    },
    {
      name: "Sarah Johnson",
      email: "sarah@gmail.com",
      image: "https://images.unsplash.com/photo-1544725176-7c40e5a2c9f9?w=600",
    },
    {
      name: "Michael Obi",
      email: "michael@gmail.com",
      image:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600",
    },
  ];

  return (
    <div className="w-full space-y-10">
      {/* ================= Header ================= */}
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-start gap-4">
          <div
            className="p-2.5 rounded-lg bg-zinc-900 border"
            style={{ borderColor: `${config.accent}33` }}
          >
            <Icon className="w-5 h-5" style={{ color: config.accent }} />
          </div>

          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-zinc-100">
              {config.label}
            </h1>
            <div
              className="mt-1 h-[2px] w-24"
              style={{
                background: `linear-gradient(to right, ${config.accent}, transparent)`,
              }}
            />
            <p className="mt-2 text-sm text-zinc-400 max-w-md">
              {config.description}
            </p>
          </div>
        </div>

        <Select>
          <SelectTrigger className="w-[220px] bg-zinc-900 border-zinc-800">
            <SelectValue placeholder="Select Park" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="euro65">Euro 65</SelectItem>
              <SelectItem value="corolla1">Corolla 1</SelectItem>
              <SelectItem value="corolla2">Corolla 2</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* ================= Content ================= */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-950/60 backdrop-blur p-6 space-y-6">
        {/* Toolbar */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-zinc-800 pb-4">
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 text-zinc-500" />
            <input
              placeholder={`Search ${config.label.toLowerCase()}...`}
              className="bg-transparent text-sm text-zinc-300 placeholder:text-zinc-500 outline-none"
            />
          </div>
          <div className="">
            <Pagination className="w-fit">
              <PaginationContent className="gap-0.5">
                <PaginationItem>
                  <PaginationPrevious className="h-7 px-2 text-xs text-zinc-400 hover:bg-zinc-900" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink
                    isActive
                    className="h-7 w-7 text-xs bg-zinc-900 border"
                    style={{
                      color: config.accent,
                      borderColor: `${config.accent}4d`,
                    }}
                  >
                    1
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext className="h-7 px-2 text-xs text-zinc-400 hover:bg-zinc-900" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>

        {/* Grid */}
        <ItemGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[65vh] overflow-y-auto pr-1">
          {data.map((user) => (
            <Item
              key={user.email}
              variant="outline"
              className={cn(
                "bg-zinc-900/80 border-zinc-800 rounded-xl",
                "hover:border-opacity-60 hover:translate-y-[-1px] transition-all",
              )}
              style={{
                borderColor: `${config.accent}26`,
              }}
            >
              <ItemMedia variant="image">
                <Image
                  src={user.image}
                  alt={user.name}
                  width={44}
                  height={44}
                  className="rounded-full object-cover"
                />
              </ItemMedia>

              <ItemContent>
                <ItemTitle className="text-sm font-medium text-zinc-100">
                  {user.name}
                </ItemTitle>
                <ItemDescription className="text-xs text-zinc-400">
                  {user.email}
                </ItemDescription>
              </ItemContent>
            </Item>
          ))}
        </ItemGroup>
      </div>
    </div>
  );
}
