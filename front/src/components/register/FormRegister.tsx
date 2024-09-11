"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button, Input } from "@nextui-org/react";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

const formSchema = z
  .object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(3).max(30),
    passwordConfirm: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Las contraseñas no son iguales",
    path: ["passwordConfirm"],
  });

export default function FormRegister() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordConfirm: "",
    },
  });

  const [isVisible, setIsVisible] = useState(false);

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <form
      onSubmit={form.handleSubmit(handleSubmit)}
      className="flex flex-col gap-4 max-w-md w-full"
    >
      <Input
        {...form.register("name")}
        type="text"
        label="Nombre completo"
        variant="flat"
        className="max-w-md"
      />
      <Input
        {...form.register("email")}
        label="Email"
        variant="flat"
        className="max-w-md"
        isInvalid={!!form.formState.errors.email}
        errorMessage={form.formState.errors.email?.message}
      />
      <Input
        {...form.register("password")}
        type={isVisible ? "text" : "password"}
        label="Contraseña"
        variant="flat"
        className="max-w-md"
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
      />
      <Input
        {...form.register("passwordConfirm")}
        type="password"
        label="Confirmar contraseña"
        variant="flat"
        className="max-w-md"
        isInvalid={!!form.formState.errors.passwordConfirm}
        errorMessage={form.formState.errors.passwordConfirm?.message}
      />
      <p className="font-normal text-base text-[#232323]">
        La contraseña debe incluir una{" "}
        <span className="font-semibold">mayuscula</span> y un{" "}
        <span className="font-semibold ">numero</span>.
      </p>
      <button
        type="submit"
        className="bg-primary py-2 rounded-2xl text-white font-medium text-xl md:w-[215px] w-full mx-auto"
        /*  color="primary" */
      >
        Crear cuenta
      </button>
    </form>
  );
}
