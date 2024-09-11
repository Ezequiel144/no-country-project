import { Services } from "@/interfaces/Services";
import { IconBaseProps } from "react-icons";
import { BsFillHospitalFill } from "react-icons/bs";
import { FaHouseChimney } from "react-icons/fa6";
import { GiDogHouse } from "react-icons/gi";

const listServices: Services[] = [
  {
    icon: `<FaHouseChimney className="w-[60px] h-[60px]" fill="white" />`,
    title: "Refugio",
    description: "Contamos con una larga lista de refugios",
    bgIcon: "bg-[#8ECBDE]",
  },
  {
    icon: `<BsFillHospitalFill className="w-[60px] h-[60px]" fill="white" />`,
    title: "Veterinarias",
    description: "Contamos con una larga lista de veterinarias 24hs",
    bgIcon: "bg-secondary-v3",
  },
  {
    icon: `<GiDogHouse className="w-[60px] h-[60px]" fill="white" />`,
    title: "Adopciones",
    description: "Tenemos una lista de mascotas listas para ser adoptadas.",
    bgIcon: "bg-secondary-v1",
  },
];
