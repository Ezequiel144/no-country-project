import { IconBaseProps } from "react-icons";
import { BsFillHospitalFill } from "react-icons/bs";
import { FaHouseChimney } from "react-icons/fa6";
import { GiDogHouse } from "react-icons/gi";

interface Services {
  icon: IconBaseProps | any;
  title: string;
  description: string;
  bgIcon: string;
}

const listServices: Services[] = [
  {
    icon: <FaHouseChimney className="w-[60px] h-[60px]" fill="white" />,
    title: "Refugio",
    description: "Contamos con una larga lista de refugios",
    bgIcon: "bg-[#8ECBDE]",
  },
  {
    icon: <BsFillHospitalFill className="w-[60px] h-[60px]" fill="white" />,
    title: "Veterinarias",
    description: "Contamos con una larga lista de veterinarias 24hs",
    bgIcon: "bg-secondary-v3",
  },
  {
    icon: <GiDogHouse className="w-[60px] h-[60px]" fill="white" />,
    title: "Adopciones",
    description: "Tenemos una lista de mascotas listas para ser adoptadas.",
    bgIcon: "bg-secondary-v1",
  },
];

export default function Services() {
  return (
    <section className="flex flex-col gap-11 pt-12">
      <h2 className="text-4xl text-primary font-medium text-center ">
        Que encontraras?{" "}
      </h2>
      <ul className="flex items-center justify-around">
        {listServices.map((item,index) => (
          <li className=" flex gap-x-5" key={index}>
            <div
              className={`rounded-2xl ${item.bgIcon} w-[144px] h-[115px] flex items-center justify-center`}
            >
              {item.icon}
            </div>
            <div className="flex flex-col justify-between max-w-[160px]">
              <h4 className=" font-semibold text-2xl">{item.title} </h4>
              <p className=" font-normal text-base">{item.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
