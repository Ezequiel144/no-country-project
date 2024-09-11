"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/autoplay";
//import "swiper/modules/autoplay.scss";
//import "./styles.css";

export default function Carousel() {
  return (
    <div className="h-[595px] w-full">
      <Swiper className="h-full" modules={[Autoplay]} autoplay={{delay: 3000}}>
        <SwiperSlide className="">
          <article className="flex items-center justify-around gap-5 w-full h-full bg-[url('/images/background-hero-carousel.png')] bg-bottom bg-no-repeat bg-cover overflow-hidden">
            <div className="max-w-[584px] w-full fled flex-col">
              <h1 className="text-6xl font-semibold text-primary pb-5">
                ¡ Adopta !
              </h1>
              <p className=" text-white pb-5 text-lg font-normal">
                Cuando decides adoptar, estás haciendo una diferencia doblemente
                significativa. No solo le das una nueva vida llena de amor y
                cuidados al animal que llevas a tu hogar, sino que también abres
                un espacio para que otro animal en situación de calle pueda
                encontrar refugio en nuestro Centro de Adopción. Tu adopción
                salva a dos vidas: la del animal que acoges y la del que podrá
                ocupar su lugar en nuestro refugio. Únete a este ciclo de
                esperanza y salvación.
              </p>
              <button className="bg-primary py-3 px-4 rounded-full font-medium text-lg text-white">
                Ver refugios
              </button>
            </div>
            <div className="max-w-[660px] w-full h-fit abolute top-0 left-0">
              <img
                src="/images/background-hero-carousel-slide-1-recortado.png"
                className="w-full h-full"
                alt="hero-slide-1"
              />
            </div>
          </article>
        </SwiperSlide>
        <SwiperSlide>
          <article className="flex items-center justify-around w-full h-full bg-[url('/images/background-hero-carousel.png')] bg-bottom bg-no-repeat bg-cover overflow-hidden">
            <div className="max-w-[584px] w-full fled flex-col">
              <h1 className="text-6xl font-semibold text-primary pb-5">
                ¡ Adopta !
              </h1>
              <p className=" text-white pb-5 text-xl font-normal">
                Cuando decides adoptar, estás haciendo una diferencia doblemente
                significativa. No solo le das una nueva vida llena de amor y
                cuidados al animal que llevas a tu hogar, sino que también abres
                un espacio para que otro animal en situación de calle pueda
                encontrar refugio en nuestro Centro de Adopción. Tu adopción
                salva a dos vidas: la del animal que acoges y la del que podrá
                ocupar su lugar en nuestro refugio. Únete a este ciclo de
                esperanza y salvación.
              </p>
              <button className="bg-primary py-3 px-4 rounded-full font-medium text-lg text-white">
                Ver refugios
              </button>
            </div>
            <div className="max-w-[660px] w-full h-fit abolute top-0 left-0">
              <img
                src="/images/background-hero-carousel-slide-1-recortado.png"
                className="w-full h-full"
                alt="hero-slide-1"
              />
            </div>
          </article>
        </SwiperSlide>
        <SwiperSlide>
          <article className="flex items-center justify-around w-full h-full bg-[url('/images/background-hero-carousel.png')] bg-bottom bg-no-repeat bg-cover overflow-hidden">
            <div className="max-w-[584px] w-full fled flex-col">
              <h1 className="text-6xl font-semibold text-primary pb-5">
                ¡ Adopta !
              </h1>
              <p className=" text-white pb-5 text-xl font-normal">
                Cuando decides adoptar, estás haciendo una diferencia doblemente
                significativa. No solo le das una nueva vida llena de amor y
                cuidados al animal que llevas a tu hogar, sino que también abres
                un espacio para que otro animal en situación de calle pueda
                encontrar refugio en nuestro Centro de Adopción. Tu adopción
                salva a dos vidas: la del animal que acoges y la del que podrá
                ocupar su lugar en nuestro refugio. Únete a este ciclo de
                esperanza y salvación.
              </p>
              <button className="bg-primary py-3 px-4 rounded-full font-medium text-lg text-white">
                Ver refugios
              </button>
            </div>
            <div className="max-w-[660px] w-full h-fit abolute top-0 left-0">
              <img
                src="/images/background-hero-carousel-slide-1-recortado.png"
                className="w-full h-full"
                alt="hero-slide-1"
              />
            </div>
          </article>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
