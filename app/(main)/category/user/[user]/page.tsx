"use client";

import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import VehicleTable from "@/components/localComponents/UserTable";

/**
 * change this to come from auth later
 * dealer | boy | secretary | admin
 */
const role: "dealer" | "boy" | "secretary" | "admin" = "dealer";

export default function Page() {
  const user = {
    name: "Gbagadi Gbugembi",
    email: "gbagadi@gmail.com",
    phone: "+234 812 345 6789",
    park: "Euro 65",
    joined: "Jan 12, 2024",
    branchAccess: ["Euro 65", "Corolla 1"],
    ip: "192.168.1.34",
    image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=600",
  };

  const boys = [
    {
      name: "Samuel Okorie",
      email: "samuel@gmail.com",
      image: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=600",
    },
    {
      name: "Ibrahim Musa",
      email: "ibrahim@gmail.com",
      image:
        "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=600",
    },
  ];

  return (
    <div className="w-full space-y-8">
      {/* ================= Overview ================= */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-950/60 backdrop-blur p-6">
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          <Image
            src={user.image}
            alt={user.name}
            width={72}
            height={72}
            className="rounded-full object-cover border border-zinc-800"
          />

          <div className="flex-1">
            <h1 className="text-xl font-semibold text-zinc-100">{user.name}</h1>
            <p className="text-sm text-zinc-400">{user.email}</p>

            <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
              <Meta label="Role" value={role} />
              <Meta label="Phone" value={user.phone} />
              <Meta label="Park" value={user.park} />
              <Meta label="Joined" value={user.joined} />
            </div>
          </div>
        </div>
      </div>

      {/* ================= Role-based Content ================= */}
      {(role === "dealer" || role === "admin" || role === "secretary") && (
        <Accordion
          type="multiple"
          defaultValue={role === "dealer" ? ["boys", "cars"] : ["system"]}
          className="space-y-6"
        >
          {/* Dealer: Boys */}
          {role === "dealer" && (
            <AccordionItem
              value="boys"
              className="border border-zinc-800 rounded-xl px-4"
            >
              <AccordionTrigger className="relative text-base font-medium pl-3">
                <span className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-[3px] rounded-full bg-[#26ba81]/60" />
                Boys under this dealer
              </AccordionTrigger>

              <AccordionContent>
                <ItemGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-4">
                  {boys.map((boy) => (
                    <Item
                      key={boy.email}
                      variant="outline"
                      className="bg-zinc-900 border-zinc-800 rounded-xl"
                    >
                      <ItemMedia variant="image">
                        <Image
                          src={boy.image}
                          alt={boy.name}
                          width={40}
                          height={40}
                          className="rounded-full object-cover"
                        />
                      </ItemMedia>

                      <ItemContent>
                        <ItemTitle className="text-sm text-zinc-100">
                          {boy.name}
                        </ItemTitle>
                        <ItemDescription className="text-xs text-zinc-400">
                          {boy.email}
                        </ItemDescription>
                      </ItemContent>
                    </Item>
                  ))}
                </ItemGroup>
              </AccordionContent>
            </AccordionItem>
          )}

          {/* Dealer: Vehicles */}
          {role === "dealer" && (
            <AccordionItem
              value="cars"
              className="border border-zinc-800 rounded-xl px-4"
            >
              <AccordionTrigger className="relative text-base font-medium pl-3">
                <span className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-[3px] rounded-full bg-[#26ba81]/60" />
                Vehicles under this dealer
              </AccordionTrigger>

              <AccordionContent className="pt-4">
                <VehicleTable />
              </AccordionContent>
            </AccordionItem>
          )}

          {/* Secretary / Admin: System Info */}
          {(role === "secretary" || role === "admin") && (
            <AccordionItem
              value="system"
              className="border border-zinc-800 rounded-xl px-4"
            >
              <AccordionTrigger className="relative text-base font-medium pl-3">
                <span className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-[3px] rounded-full bg-[#26ba81]/60" />
                System Access
              </AccordionTrigger>

              <AccordionContent className="pt-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-xs text-zinc-500 block">
                      Branch Access
                    </span>
                    <div className="mt-1 flex flex-wrap gap-2">
                      {user.branchAccess.map((branch) => (
                        <span
                          key={branch}
                          className="rounded-md bg-zinc-900 border border-zinc-800 px-2 py-0.5 text-xs text-zinc-300"
                        >
                          {branch}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="text-xs text-zinc-500 block">
                      Last Known IP
                    </span>
                    <span className="text-zinc-300">{user.ip}</span>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          )}
        </Accordion>
      )}

      {/* Boy: simple profile only */}
      {role === "boy" && (
        <div className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-6">
          <h2 className="text-sm font-medium text-zinc-200">
            Profile Description
          </h2>
          <p className="mt-2 text-sm text-zinc-400 max-w-xl">
            This user is a registered boy assigned to a dealer. Boys are
            responsible for handling assigned vehicles and assisting with daily
            operations within the park.
          </p>
        </div>
      )}
    </div>
  );
}

/* ---------- Helper ---------- */
function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span className="block text-xs text-zinc-500">{label}</span>
      <span className="text-zinc-300 capitalize">{value}</span>
    </div>
  );
}
