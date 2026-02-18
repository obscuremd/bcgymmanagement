import { ReactNode } from "react";

interface InfoSectionProps {
  icon: ReactNode;
  title: string;
  children: ReactNode;
}

export function InfoSection({ icon, title, children }: InfoSectionProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-sm font-semibold text-[#e6c76a]">
        {icon}
        <span>{title}</span>
      </div>
      <div className="grid grid-cols-2 gap-4 bg-zinc-950 rounded-lg p-4">
        {children}
      </div>
    </div>
  );
}

interface InfoFieldProps {
  label: string;
  value: string;
  className?: string;
}

export function InfoField({ label, value, className = "" }: InfoFieldProps) {
  return (
    <div>
      <p className="text-xs text-zinc-500">{label}</p>
      <p className={`text-sm mt-1 ${className || "text-white"}`}>{value}</p>
    </div>
  );
}
