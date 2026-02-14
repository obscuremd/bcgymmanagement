"use client";

import { CarFront } from "lucide-react";
import VehicleTable from "@/components/localComponents/FileTable";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Page() {
  return (
    <div className="w-full space-y-8">
      {/* ================= Header ================= */}

      <div className="flex items-center justify-between">
        <div className="flex items-start gap-4">
          <div className="p-2.5 rounded-lg bg-zinc-900 border border-[#26ba81]/20">
            <CarFront className="w-5 h-5 text-[#26ba81]" />
          </div>

          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-zinc-100">
              Vehicles
            </h1>
            <div className="mt-1 h-[2px] w-24 bg-gradient-to-r from-[#26ba81] to-transparent" />
            <p className="mt-2 text-sm text-zinc-400 max-w-lg">
              View and manage all vehicles currently registered in this park,
              including their status and transaction history.
            </p>
          </div>
        </div>

        <Select>
          <SelectTrigger className="w-[200px] bg-zinc-900 border-zinc-800">
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

      {/* ================= Stats ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Vehicles" value="120" />
        <StatCard label="Sold" value="68" variant="success" />
        <StatCard label="Unsold" value="39" variant="warning" />
        <StatCard label="Withdrawn" value="13" variant="danger" />
      </div>

      {/* ================= Table ================= */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-950/60 backdrop-blur p-6">
        <VehicleTable />
      </div>
    </div>
  );
}

/* ================= Small Components ================= */

function StatCard({
  label,
  value,
  variant = "default",
}: {
  label: string;
  value: string;
  variant?: "default" | "success" | "warning" | "danger";
}) {
  const styles = {
    default: {
      bar: "bg-zinc-600",
      text: "text-zinc-100",
      tint: "bg-zinc-900/60",
    },
    success: {
      bar: "bg-emerald-400",
      text: "text-emerald-300",
      tint: "bg-emerald-500/5",
    },
    warning: {
      bar: "bg-amber-400",
      text: "text-amber-300",
      tint: "bg-amber-500/5",
    },
    danger: {
      bar: "bg-red-400",
      text: "text-red-300",
      tint: "bg-red-500/5",
    },
  };

  const s = styles[variant];

  return (
    <div
      className={`
        relative rounded-xl border border-zinc-800 p-4
        bg-zinc-900/70 backdrop-blur
        ${s.tint}
      `}
    >
      {/* Accent bar */}
      <span
        className={`absolute left-0 top-3 bottom-3 w-[3px] rounded-full ${s.bar}`}
      />

      <span className="text-xs text-zinc-500">{label}</span>
      <div className={`mt-1 text-xl font-semibold ${s.text}`}>{value}</div>
    </div>
  );
}
