"use client";

import React from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
} from "@/components/ui/table";
import { EllipsisVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

/* ----------------------------------------
 * Mock Data
 * -------------------------------------- */
const vehicles = [
  {
    id: "1",
    model: "BMW X5",
    colorHex: "#1f2937",
    colorName: "Carbon Black",
    chasis: "482193",
    dateIn: "2024-11-12",
    dateOut: "2025-01-18",
    dealer: "AutoLux Nairobi",
    status: "sold",
  },
  {
    id: "2",
    model: "Mercedes C200",
    colorHex: "#9ca3af",
    colorName: "Iridium Silver",
    chasis: "590284",
    dateIn: "2024-10-03",
    dateOut: null,
    dealer: "Prestige Motors",
    status: "unsold",
  },
  {
    id: "3",
    model: "Toyota Land Cruiser",
    colorHex: "#78350f",
    colorName: "Bronze Oxide",
    chasis: "771203",
    dateIn: "2024-09-21",
    dateOut: "2025-02-01",
    dealer: "Desert Auto",
    status: "sold",
  },
  {
    id: "4",
    model: "Audi A4",
    colorHex: "#111827",
    colorName: "Mythos Black",
    chasis: "330912",
    dateIn: "2024-12-01",
    dateOut: null,
    dealer: "EuroHaus",
    status: "unsold",
  },
  {
    id: "5",
    model: "Range Rover Sport",
    colorHex: "#065f46",
    colorName: "British Racing Green",
    chasis: "618402",
    dateIn: "2024-08-15",
    dateOut: "2024-12-22",
    dealer: "Summit Autos",
    status: "sold",
  },
  {
    id: "6",
    model: "Porsche Cayenne",
    colorHex: "#7c2d12",
    colorName: "Mahogany Metallic",
    chasis: "204981",
    dateIn: "2024-11-04",
    dateOut: null,
    dealer: "Elite Drive",
    status: "withdrawn",
  },
  {
    id: "7",
    model: "Volkswagen Tiguan",
    colorHex: "#374151",
    colorName: "Indium Grey",
    chasis: "849102",
    dateIn: "2024-10-19",
    dateOut: null,
    dealer: "Urban Motors",
    status: "unsold",
  },
  {
    id: "8",
    model: "Lexus RX 350",
    colorHex: "#f5f5f4",
    colorName: "Pearl White",
    chasis: "561009",
    dateIn: "2024-09-09",
    dateOut: "2024-12-03",
    dealer: "Prime Auto",
    status: "sold",
  },
  {
    id: "9",
    model: "Mazda CX-5",
    colorHex: "#7f1d1d",
    colorName: "Soul Red",
    chasis: "712330",
    dateIn: "2024-11-27",
    dateOut: null,
    dealer: "Redline Cars",
    status: "unsold",
  },
  {
    id: "10",
    model: "Ford Everest",
    colorHex: "#1e3a8a",
    colorName: "Deep Navy",
    chasis: "904112",
    dateIn: "2024-08-02",
    dateOut: "2024-10-30",
    dealer: "Frontier Autos",
    status: "sold",
  },
];

/* ----------------------------------------
 * Component
 * -------------------------------------- */
export default function VehicleTable() {
  return (
    <div className="rounded-xl border border-neutral-800 bg-neutral-950/60 backdrop-blur">
      <Table>
        <TableHeader>
          <TableRow className="border-neutral-800 text-xs text-neutral-500">
            <TableHead className="py-4 px-5">Vehicle & Dates</TableHead>
            <TableHead>Color & Chasis</TableHead>
            <TableHead>Dealer</TableHead>
            <TableHead className="w-10 text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {vehicles.map((v) => (
            <TableRow
              key={v.id}
              className="border-neutral-800 hover:bg-neutral-900/50 transition-colors"
            >
              {/* Vehicle & Dates */}
              <TableCell className="px-5 py-4 space-y-1">
                <p className="font-medium text-white">{v.model}</p>
                <p className="text-xs text-neutral-500">
                  {formatDate(v.dateIn)} —{" "}
                  {v.dateOut ? formatDate(v.dateOut) : "—"}
                </p>
              </TableCell>

              {/* Color & Chasis */}
              <TableCell className="px-4 py-4 space-y-1">
                <div className="flex items-center gap-2">
                  <span
                    className="h-4 w-4 rounded-sm border border-neutral-700"
                    style={{ backgroundColor: v.colorHex }}
                  />
                  <span className="text-sm text-neutral-300">
                    {v.colorName}
                  </span>
                </div>
                <p className="text-xs text-neutral-400 font-mono">{v.chasis}</p>
              </TableCell>

              {/* Dealer */}
              <TableCell className="px-4 py-4 text-sm text-neutral-300">
                {v.dealer}
              </TableCell>

              {/* Actions & Status */}
              <TableCell className="px-4 py-4 text-right flex justify-end items-center gap-3">
                <StatusBadge status={v.status} />
                <DropdownMenu>
                  <DropdownMenuTrigger className="text-neutral-400 hover:text-white">
                    <EllipsisVertical className="h-4 w-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>View</DropdownMenuItem>
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem className="text-red-500">
                      Remove
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

/* ----------------------------------------
 * Helpers
 * -------------------------------------- */
function StatusBadge({ status }: { status: string }) {
  const styles = {
    sold: "bg-[#26ba81]/10 text-[#26ba81]",
    unsold: "bg-neutral-500/10 text-neutral-300",
    withdrawn: "bg-red-500/10 text-red-400",
  };

  return (
    <span
      className={cn(
        "rounded-md px-2 py-1 text-xs font-medium capitalize",
        styles[status as keyof typeof styles],
      )}
    >
      {status}
    </span>
  );
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
