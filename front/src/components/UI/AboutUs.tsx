/* eslint-disable @next/next/no-img-element */
import { FaRegHeart } from "react-icons/fa";
import { BsChatHeart } from "react-icons/bs";
import { AiOutlineUser } from "react-icons/ai";
import { AiOutlineCloud } from "react-icons/ai";

export default function AboutUs() {
  return (
    <section className="flex flex-col items-center gap-4 px-6 py-16 mt-4 w-full h-min bg-[url('/images/background-about-us.png')] bg-cover bg-center bg-no-repeat text-white">
      <article className="flex gap-4 items-center">
        <div className="p-6 top-0 right-0 size-min bg-secondary-v3 rounded-full md:p-6">
          <BsChatHeart className=" text-4xl" />
        </div>
        <div>
          <h4 className="font-semibold">Visión</h4>
          <p className="text-sm">
            Dar hogar a animalitos en situacion de calle, y que encuentren
            personas que los amen.
          </p>
        </div>
      </article>
      <article className="flex flex-row-reverse gap-4 items-center">
        <div className="p-6 top-0 right-0 size-min bg-secondary-v3 rounded-full md:p-6">
          <AiOutlineUser className=" text-4xl" />
        </div>
        <div>
          <h4 className="font-semibold">Nuestro propósito</h4>
          <p className="text-sm">
            Dar hogar a animalitos en situacion de calle, y que encuentren
            personas que los amen.
          </p>
        </div>
      </article>
      <img
        src="/images/picture-about-us.png"
        alt="AboutUs Image"
        className="size-60 md:size-80"
      />
      <article className="flex gap-4 items-center">
        <div className="p-6 top-0 right-0 size-min bg-secondary-v3 rounded-full md:p-6">
          <AiOutlineCloud className=" text-4xl" />
        </div>
        <div>
          <h4 className="font-semibold">Nuestro sueño</h4>
          <p className="text-sm">
            Dar hogar a animalitos en situacion de calle, y que encuentren
            personas que los amen.
          </p>
        </div>
      </article>
      <article className="flex flex-row-reverse gap-4 items-center">
        <div className="p-6 top-0 right-0 size-min bg-secondary-v3 rounded-full md:p-6">
          <FaRegHeart className=" text-4xl" />
        </div>
        <div>
          <h4 className="font-semibold">Misión</h4>
          <p className="text-sm">
            Dar hogar a animalitos en situacion de calle, y que encuentren
            personas que los amen.
          </p>
        </div>
      </article>
    </section>
  );
}

// export default function AboutUs () {
//   return (
//     <section className="relative flex justify-center items-center mt-12 w-full h-[600px] bg-[url('/images/background-about-us.png')] bg-cover bg-no-repeat">
//       <div className="relative size-[300px] bg-[url('/images/picture-about-us.png')] bg-cover bg-center md:size-[400px]">
//         <div className="absolute p-3 top-0 left-0 bg-secondary-v3 rounded-full md:p-6">
//           <FaRegHeart className="text-4xl text-white" />
//         </div>
//         <div className="absolute p-3 top-0 right-0 bg-secondary-v3 rounded-full md:p-6">
//           <BsChatHeart className=" text-4xl text-white" />
//         </div>
//         <div className="absolute p-3 bottom-0 left-0 bg-secondary-v3 rounded-full md:p-6">
//           <AiOutlineUser className=" text-4xl text-white" />
//         </div>
//         <div className="absolute p-3 bottom-0 right-0 bg-secondary-v3 rounded-full md:p-6">
//           <AiOutlineCloud className=" text-4xl text-white" />
//         </div>
//       </div>
//     </section>
//   );
// }
