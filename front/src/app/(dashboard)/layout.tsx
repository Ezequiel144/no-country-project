import AsideDashboard from "@/components/UI/AsideDashboard/AsideDashboard";
import Header from "@/components/UI/Header";

export default function Layoutlogin({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Header />
      <main className={`relative pt-24 flex`}>
        <AsideDashboard />
        <section className=" p-3">{children}</section>
      </main>
    </div>
  );
}
