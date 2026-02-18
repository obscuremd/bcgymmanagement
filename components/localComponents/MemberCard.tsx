import Image from "next/image";

interface MemberCardProps {
  member: {
    id: number;
    name: string;
    surname: string;
    email: string;
    phone: string;
    image: string;
    membershipType: string;
    expiryDate: string;
    status: "Active" | "Expired";
  };
  onClick: () => void;
}

export function MemberCard({ member, onClick }: MemberCardProps) {
  return (
    <div
      onClick={onClick}
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
            className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-zinc-950 ${
              member.status === "Active" ? "bg-green-500" : "bg-red-500"
            }`}
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-white truncate group-hover:text-[#e6c76a] transition-colors">
            {member.name} {member.surname}
          </h3>
          <p className="text-xs text-zinc-400 truncate">{member.email}</p>
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
  );
}
