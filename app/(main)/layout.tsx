export default function MainLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="md:px-10 md:py-5 w-full">
      <div className="md:p-6 px-2 pt-10 backdrop-blur-2xl bg-[#00000073] rounded-2xl">
        {children}
      </div>
    </div>
  );
}
