"use client";
import { MenuDashboard } from "@/interfaces/Dashboard";
import Link from "next/link";
//import { IconBaseProps } from "react-icons";
import { usePathname } from "next/navigation";
import { AiOutlineUser } from "react-icons/ai";
import { BsFillHouseDoorFill } from "react-icons/bs";
import { FaQuestion } from "react-icons/fa6";
import { MdOutlineReport } from "react-icons/md";
import { TbDogBowl } from "react-icons/tb";

const listMenuDashboard: MenuDashboard[] = [
  {
    href: "/profile",
    name: "Perfil",
    icon: <AiOutlineUser />,
  },
  {
    href: "/reportpets",
    name: "Mis Reportes",
    icon: <MdOutlineReport />,
  },
  {
    href: "/adoptionpets",
    name: "Mis Adopciones",
    icon: <TbDogBowl />,
  },
  {
    href: "/shelteruser",
    name: "Ser Refugio",
    icon: <BsFillHouseDoorFill />,
  },
  {
    href: "/frequentlyquestions",
    name: "Faqs",
    icon: <FaQuestion />,
  },
];

export default function AsideDashboard() {
  const path = usePathname();
  //console.log(path);
  return (
    <aside className="bg-[#232323] w-full max-w-24 md:max-w-96 h-screen text-white flex flex-col items-end justify-between">
      <ul className=" w-full md:max-w-60 pt-20 flex flex-col items-center md:items-start gap-y-6">
        {listMenuDashboard.map((menu, index) => (
          <li key={index}>
            <Link
              href={menu.href}
              className={`flex items-center gap-x-2 text-2xl md:text-xl font-normal ${
                menu.href === path ? "text-primary" : ""
              }`}
            >
              {menu.icon}
              <span className="hidden md:block">{menu.name}</span>
            </Link>
          </li>
        ))}
      </ul>
      <button className=" py-4 md:py-12 border-t-1 border-gray-400 px-1 md:px-12 text-base md:text-xl font-normal">
        Cerrar Sesion
      </button>
    </aside>
  );
}
