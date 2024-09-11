"use client";

import React, { useEffect, useRef, useState } from "react";
import { FaFacebook, FaInstagram, FaEnvelope } from "react-icons/fa";
import Image from "next/image";
import LogoFooter from "@/assets/global/logofooter.svg";
import Link from "next/link";

export interface NavLink {
  label: string;
  href: string;
}

const highlightStyle: React.CSSProperties = {
  fontWeight: 'bold',
  fontSize: '1.2rem',
  padding: '0 0.2rem',
};

const Footer: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const menuLinks: NavLink[] = [
    { label: "Reporte", href: "/report" },
    { label: "Donación", href: "/donation" },
    { label: "Adopción", href: "/adoption" },
    { label: "Veterinarias", href: "/veterinaries" },
    { label: "Refugios", href: "/shelters" },
  ];

  const sessionLinks: NavLink[] = [
    { label: "Iniciar sesión", href: "/login" },
    { label: "Registrarse", href: "/register" },
  ];

  useEffect(() => {
    const handleTouchStart = (event: TouchEvent) => {
      if (scrollRef.current) {
        setIsScrolling(true);
        setStartX(event.touches[0].pageX - scrollRef.current.offsetLeft);
        setScrollLeft(scrollRef.current.scrollLeft);
      }
    };
    const handleTouchMove = (event: TouchEvent) => {
      if (!isScrolling || !scrollRef.current) return;
      const x = event.touches[0].pageX - scrollRef.current.offsetLeft;
      const walk = x - startX;
      scrollRef.current.scrollLeft = scrollLeft - walk;
    };
    const handleTouchEnd = () => {
      setIsScrolling(false);
    };
    if (scrollRef.current) {
      scrollRef.current.addEventListener("touchstart", handleTouchStart);
      scrollRef.current.addEventListener("touchmove", handleTouchMove);
      scrollRef.current.addEventListener("touchend", handleTouchEnd);
    }
    return () => {
      if (scrollRef.current) {
        scrollRef.current.removeEventListener("touchstart", handleTouchStart);
        scrollRef.current.removeEventListener("touchmove", handleTouchMove);
        scrollRef.current.removeEventListener("touchend", handleTouchEnd);
      }
    };
  }, [isScrolling, startX, scrollLeft]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (scrollRef.current) {
        if (event.key === 'ArrowRight') {
          scrollRef.current.scrollLeft += 10;
        } else if (event.key === 'ArrowLeft') {
          scrollRef.current.scrollLeft -= 10;
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <footer className="bg-primary text-white pt-8 flex flex-col justify-between">
      <div className="container mx-auto flex justify-center items-center flex-wrap">
        <div className="w-full lg:w-1/4 mb-4 lg:mb-0 flex justify-center">
          <Image src={LogoFooter} alt="Logo" width={250} height={250} />
        </div>
        <div className="w-full lg:w-1/4 mb-4 lg:mb-0 text-center">
          <h3 className="text-2xl font-semibold pb-2">Menú</h3>
          <ul>
            {menuLinks.map((link) => (
              <li key={`menu-${link.href}`}>
                <Link className="hover:text-secondary-black hover:duration-300" href={link.href}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="w-full lg:w-1/4 mb-4 lg:mb-0 text-center">
          <h3 className="text-2xl font-semibold pb-2">Sesión</h3>
          <ul>
            {sessionLinks.map((link) => (
              <li key={`session-${link.href}`}>
                <Link className="hover:text-secondary-black hover:duration-300" href={link.href}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="w-full lg:w-1/4 mb-4 lg:mb-0 text-center">
          <h3 className="text-xl font-semibold">Contact</h3>
          <div className="flex justify-center space-x-4">
            <FaFacebook aria-label="Facebook" className="hover:text-secondary-black hover:duration-300 cursor-pointer" size={32} />
            <FaInstagram aria-label="Instagram" className="hover:text-secondary-black hover:duration-300 cursor-pointer" size={32} />
            <FaEnvelope aria-label="Email" className="hover:text-secondary-black hover:duration-300 cursor-pointer" size={32} />
          </div>
        </div>
      </div>

      <div className="bg-secondary-v3 py-2 mt-4">
        <div
          ref={scrollRef}
          className="overflow-hidden whitespace-nowrap"
          style={{ whiteSpace: "nowrap" }}
        >
          <div className="inline-block animate-marquee">
            <span>UX/UI DESIGN:</span>
            <Link href="https://www.linkedin.com/in/sofia-dolcemascolo" target="_blank" rel="noopener noreferrer" style={highlightStyle} className="hover:text-secondary-black hover:duration-300">
              Sofía
            </Link>
            <span> | </span>
            <Link href="https://www.linkedin.com/in/ezequiel-ulises-garcia-b23585266" target="_blank" rel="noopener noreferrer" style={highlightStyle} className="hover:text-secondary-black hover:duration-300">
              Ezequiel
            </Link>
            <span> FRONTEND DEVELOPMENT: </span>
            <Link href="https://www.linkedin.com/in/ezequiel-ulises-garcia-b23585266" target="_blank" rel="noopener noreferrer" style={highlightStyle} className="hover:text-secondary-black hover:duration-300">
              Ezequiel
            </Link>
            <span> | </span>
            <Link href="https://www.linkedin.com/in/samudev" target="_blank" rel="noopener noreferrer" style={highlightStyle} className="hover:text-secondary-black hover:duration-300">
              Samuel Figueroa
            </Link>
            <span> | </span>
            <Link href="https://linkedin.com/in/martin-bejarano" target="_blank" rel="noopener noreferrer" style={highlightStyle} className="hover:text-secondary-black hover:duration-300">
              Martin Bejarano
            </Link>
            <span> BACKEND DEVELOPMENT: </span>
            <Link href="https://www.linkedin.com/in/dacazabat" target="_blank" rel="noopener noreferrer" style={highlightStyle} className="hover:text-secondary-black hover:duration-300">
              Daniel Cazabat
            </Link>
            <span> | </span>
            <Link href="https://www.linkedin.com/in/ornella-ferrario-988223169" target="_blank" rel="noopener noreferrer" style={highlightStyle} className="hover:text-secondary-black hover:duration-300">
              Ornella Ferrario
            </Link>
            <span> | </span>
            <Link href="https://" target="_blank" rel="noopener noreferrer" style={highlightStyle}>
              Luca Consiglio
            </Link>
            <span> | </span>
            <Link href="https://github.com/DieCau" target="_blank" rel="noopener noreferrer" style={highlightStyle} className="hover:text-secondary-black hover:duration-300">
              Diego Caucota
            </Link>
            <span> TESTER: </span>
            <Link href="https://www.linkedin.com/in/agustinmahona" target="_blank" rel="noopener noreferrer" style={highlightStyle} className="hover:text-secondary-black hover:duration-300">
              Agustin Mahona
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
