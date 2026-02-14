import Image from "next/image";

export default function Logo() {
  return (
    <div className="p-[2px] rounded-full bg-gradient-to-br from-[#B8962E] via-[#D4AF37] to-[#E6C76A] text-tertiary-c flex items-center justify-center font-bold text-lg">
      <Image
        src={"/logo.jpg"}
        alt="logo"
        width={60}
        height={60}
        className="rounded-full"
      />{" "}
    </div>
  );
}
