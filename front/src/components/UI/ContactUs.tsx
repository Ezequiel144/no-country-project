import { Button, Input, Textarea } from "@nextui-org/react";
import { BiLogoInstagramAlt } from "react-icons/bi";
import { FaFacebook } from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import { IconType } from "react-icons";
import Link from "next/link";

interface ISocial {
  Icon: IconType;
  text: string;
  link: string;
}

const socials: ISocial[] = [
  {
    Icon: FaFacebook,
    text: "Facebook",
    link: "facebook.com",
  },
  {
    Icon: BiLogoInstagramAlt,
    text: "Instagram",
    link: "instagram.com",
  },
  {
    Icon: IoMail,
    text: "Mail",
    link: "mailto:prueba@mail.com",
  },
];

export default function ContactUs() {
  return (
    <section className="flex flex-col gap-8 px-4 py-24 md:justify-center md:flex-row-reverse">
      <article className="flex flex-col gap-4">
        <h3 className="text-3xl text-primary font-semibold">
          Contáctate con nosotros
        </h3>
        <div className="flex flex-col gap-1">
          {socials.map(({ Icon, text, link }) => (
            <Link href={link} key={link} className="flex items-center gap-2">
              <Icon className="size-8" />
              <span>{text}</span>
            </Link>
          ))}
        </div>
      </article>
      <form className="flex flex-col gap-4">
        <Input variant="flat" label="Nombre" className="w-80 md:w-[450px] " />
        <Input variant="flat" label="Email" className="w-80 md:w-[450px]" />
        <Textarea
          variant="flat"
          label="Mensaje"
          className="w-80 md:w-[450px]"
        />
        <Button type="submit" color="primary" className="max-w-28">
          Enviar
        </Button>
      </form>
    </section>
  );
}
