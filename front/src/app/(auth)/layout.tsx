import Header from "@/components/UI/Header";

export default function LayoutRegisterLogin({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Header />
      <div className={`relative px-3`}>{children}</div>
    </div>
  );
}
