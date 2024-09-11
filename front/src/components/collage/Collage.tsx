"use client";
import { Collage as CollageList } from "@/interfaces/Collage";
import CardCollage from "../UI/CardCollage/CardCollage";

const listCollage: CollageList[] = [
  {
    hoverBgColor: "bg-accent/70",
    href: "/reports",
    title: "Reportes",
    src: "/svg/cat-family/cuate.svg",
    alt: "imagen-Reportes",
    subClass: "bg-secondary-v1/40",
  },
  {
    hoverBgColor: "bg-secondary-v1/70",
    href: "/donations",
    title: "Donaciones",
    src: "/svg/cat-and-dog/amico.svg",
    alt: "imagen-Donaciones",
    subClass: "bg-secondary-v2/40",
  },
  {
    hoverBgColor: "bg-secondary-v3/70",
    href: "/adoption",
    title: "Adopcion",
    src: "/svg/pet-food/amico.svg",
    alt: "imagen-Adopcion",
    subClass: "bg-[#8439CD]/40",
  },
  {
    hoverBgColor: "bg-[#8ECBDE]/70",
    href: "/shelters",
    title: "Refugios",
    src: "/svg/animal-shelter/pana.svg",
    alt: "imagen-Refugios",
    subClass: "md:col-span-2 bg-secondary-v3/40",
  },
  {
    hoverBgColor: "bg-secondary-v2/70",
    href: "/veterinary",
    title: "Veterniarias",
    src: "/svg/veterinary/amico.svg",
    alt: "imagen-Veterniarias",
    subClass: "bg-[#8ECBDE]/40",
  },
];

export default function Collage() {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 grid-rows-2	gap-5 items-center pt-12 w-full max-w-[1440px] mx-auto">
      {listCollage.map((item, index) => (
        <CardCollage
          key={index}
          index={index}
          subClass={item.subClass}
          href={item.href}
          hoverBgColor={item.hoverBgColor}
          title={item.title}
          src={item.src}
          alt={item.alt}
        />
      ))}
    </ul>
  );
}
