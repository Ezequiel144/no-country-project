"use client";
import { CollageItem } from "@/interfaces/CardCollage";
import Link from "next/link";
import { useState } from "react";

export default function CardCollage({
  index,
  subClass,
  href,
  hoverBgColor,
  title,
  src,
  alt,
}: CollageItem) {
  const [isHover, setIsHover] = useState<boolean>(false);
  const [isIndex, setIsIndex] = useState<number>();
  return (
    <li
      className={`w-full h-[305px] rounded-2xl shadow-collageImage overflow-hidden relative ${subClass}`}
      onMouseEnter={() => {
        setIsHover(true), setIsIndex(index);
      }}
      onMouseLeave={() => setIsHover(false)}
    >
      <Link
        href={href}
        className={`w-full h-full ${hoverBgColor} absolute ${
          isHover && isIndex === index ? "top-0" : "-top-[100%]"
        }  transition-all duration-300 flex items-center justify-center`}
      >
        <h4 className=" text-5xl text-white font-normal">{title}</h4>
      </Link>
      <img
        src={src}
        className="w-full h-full object-cover sm:object-contain object-center"
        alt={alt}
      />
    </li>
  );
}
