import React from "react";
import { ReportCard } from "@/components/report/ReportCard";
import Footer from "@/components/UI/Footer";
import Header from "@/components/UI/Header";
import { FaSearch } from "react-icons/fa";
import ReportButton from "@/components/report/ReportButton";
import ReportFilterBtn from "@/components/report/ReportFilterBtn";

const ReportPage: React.FC = () => {
  const reports = [
    // EJEMPLO
    {
      title: "Perro perdido en Junín",
      description:
        "Este perro estuvo afuera de mi casa llorando toda la noche, parece que sí tiene dueño porque se lo ve cuidado. No tiene collar.",
      location: "Junín",
      animalType: "Perro",
      imageUrl: "./images/image-collage-5.png",
    },
    {
      title: "Perro perdido en La Plata",
      description:
        "Este perro estuvo afuera de mi casa llorando toda la noche, parece que sí tiene dueño porque se lo ve cuidado. No tiene collar.",
      location: "La Plata",
      animalType: "Perro",
      imageUrl: "./images/image-collage-5.png",
    },
    {
      title: "Perro perdido en Junín",
      description:
        "En la noche este perro entró asustado y sucio a mi garaje, es pequeño. No sé si tendrá dueño.",
      location: "Junín",
      animalType: "Perro",
      imageUrl: "./images/image-collage-5.png",
    },
    {
      title: "Perro perdido en Junín",
      description:
        "Este perro estuvo afuera de mi casa llorando toda la noche, parece que sí tiene dueño porque se lo ve cuidado. No tiene collar.",
      location: "Junín",
      animalType: "Perro",
      imageUrl: "./images/image-collage-5.png",
    },
    {
      title: "Perro perdido en La Plata",
      description:
        "Este perro estuvo afuera de mi casa llorando toda la noche, parece que sí tiene dueño porque se lo ve cuidado. No tiene collar.",
      location: "La Plata",
      animalType: "Perro",
      imageUrl: "./images/image-collage-5.png",
    },
    {
      title: "Perro perdido en Junín",
      description:
        "En la noche este perro entró asustado y sucio a mi garaje, es pequeño. No sé si tendrá dueño.",
      location: "Junín",
      animalType: "Perro",
      imageUrl: "./images/image-collage-5.png",
    },
    {
      title: "Perro perdido en Junín",
      description:
        "Este perro estuvo afuera de mi casa llorando toda la noche, parece que sí tiene dueño porque se lo ve cuidado. No tiene collar.",
      location: "Junín",
      animalType: "Perro",
      imageUrl: "./images/image-collage-5.png",
    },
    {
      title: "Perro perdido en La Plata",
      description:
        "Este perro estuvo afuera de mi casa llorando toda la noche, parece que sí tiene dueño porque se lo ve cuidado. No tiene collar.",
      location: "La Plata",
      animalType: "Perro",
      imageUrl: "./images/image-collage-5.png",
    },
    {
      title: "Perro perdido en Junín",
      description:
        "En la noche este perro entró asustado y sucio a mi garaje, es pequeño. No sé si tendrá dueño.",
      location: "Junín",
      animalType: "Perro",
      imageUrl: "./images/image-collage-5.png",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen text-white">
      <div className="pt-[2rem] flex-grow bg-[url('/images/background-report.png')] bg-bottom bg-no-repeat bg-cover overflow-hidden">
        <div className="container mx-auto px-4 my-32 md:px-6 lg:px-8">
          <h1 className="text-4xl text-primary font-bold my-8 w-full md:w-3/4 lg:w-2/6">
            Reporte de mascotas
          </h1>
          <div className="flex flex-col items-start gap-4 mb-8">
            <div className="relative w-full md:w-3/4 lg:w-2/6">
              <input
                type="text"
                placeholder="Buscar mascota..."
                className="p-2 pr-10 rounded-full text-black w-full"
              />
              <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-secondary-black text-2xl" />
            </div>
            <ReportFilterBtn />
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8 md:px-6 lg:px-8 grid items-center justify-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-8">
        {reports.map((report, index) => (
          <ReportCard
            key={index}
            title={report.title}
            description={report.description}
            location={report.location}
            animalType={report.animalType}
            imageUrl={report.imageUrl}
          />
        ))}
      </div>
      <ReportButton />
    </div>
  );
};

export default ReportPage;
