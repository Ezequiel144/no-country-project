import AboutUs from "@/components/UI/AboutUs";
import ContactUs from "@/components/UI/ContactUs";
import Collage from "@/components/collage/Collage";
import Hero from "@/components/hero/Hero";
import Services from "@/components/services/Services";

export default function Home() {
  return (
    <main className="w-full">
      <Hero />
      <Services />
      <Collage />
      <AboutUs />
      <ContactUs />
    </main>
  );
}
