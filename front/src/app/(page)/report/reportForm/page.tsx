"use client";
import FormReport from "@/components/reportForm/FormReport";
import ImgLoader from "@/components/reportForm/ImgLoader";
import React, { useState } from "react";

const ReportFormPage: React.FC = () => {
  const [images, setImages] = useState<File[]>([]);

  const handleImageUpload = (uploadedImages: File[]) => {
    setImages(uploadedImages);
  };

  const handleSubmit = (formData: FormData) => {
    console.log("Enviando datos del formulario...", formData);

    // Para conexion back
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="w-full mx-auto pt-32 flex justify-center items-center">
        <div className="w-9/12 flex flex-col md:flex-row justify-center items-center space-y-6 md:space-y-0">
          <div className="md:w-2/6">
            <h1 className="text-4xl text-primary font-bold mb-8">
              Reportar Mascota
            </h1>
            <FormReport images={images} onSubmit={handleSubmit} />
          </div>
          <div className="w-full min-h-screen flex justify-center items-center md:w-4/6 ">
            <ImgLoader onImageUpload={handleImageUpload} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportFormPage;
