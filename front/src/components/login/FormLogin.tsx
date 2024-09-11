"use client";
import { FromInputs } from "@/interfaces/FormInputs";
import { Input } from "@nextui-org/react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

export default function FormLogin() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FromInputs>();
  const [isVisible, setIsVisible] = useState(false);
  //console.log(errors.email);
  return (
    <form
      className="w-full flex flex-col gap-y-3"
      onSubmit={handleSubmit((data) => {
        reset(), console.log(data);
      })}
    >
      <Input
        {...register("email", { required: true })}
        type="email"
        label="Usuario o email"
        variant="flat"
        className="max-w-full"
        radius="lg"
        isInvalid={errors.email ? true : false}
        errorMessage="Email incorrecto"
      />
      <Input
        {...register("password", { required: true })}
        key={"inside"}
        label="Password"
        variant="flat"
        className="max-w-full "
        radius="lg"
        isInvalid={errors.password ? true : false}
        errorMessage="Contraseña incorrecto"
        endContent={
          <button
            className="focus:outline-none"
            type="button"
            onClick={() => setIsVisible(!isVisible)}
            aria-label="toggle password visibility"
          >
            {isVisible ? (
              <FaEye className="text-2xl text-default-400 pointer-events-none" />
            ) : (
              <FaEyeSlash className="text-2xl text-default-400 pointer-events-none" />
            )}
          </button>
        }
        type={isVisible ? "text" : "password"}
      />
      <p className=" text-black">
        No tenes cuenta?{" "}
        <Link href={"/register"} className="font-semibold">
          Registrate
        </Link>
      </p>
      <button
        type="submit"
        className="bg-primary py-2 rounded-2xl text-white font-medium text-xl md:w-[215px] w-full mx-auto"
      >
        Ingresar
      </button>
    </form>
  );
}
