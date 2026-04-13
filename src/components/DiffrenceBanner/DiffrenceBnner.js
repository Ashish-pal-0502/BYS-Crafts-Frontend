import Link from "next/link";
import React from "react";
import Image from "next/image";

const DiffrenceBnner = () => {
  return (
    <>
      <div className="container py-16 relative bg-gray-100 rounded-2xl">
        <div className="">
          <p className=" text-2xl  font-semibold text-center md:text-4xl mb-11 mt-11">
            Artwork of Bundelkhand
          </p>
        </div>
        <div>
          <div className="space-y-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-10">
              <div>
                <p>
                  Known among discerning travelers for its colorful culture,
                  rich history, beautiful landscapes, and breathtaking
                  architecture. Enriched with various Bundela and Chandela
                  tourist attractions like UNESCO World Heritage Site- the
                  temples of Khajuraho, the fort and temples of Orchha, Panna
                  National Park, etc.
                </p>
              </div>
              <div></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-10">
              <div></div>
              <div>
                <p>
                  In Bundelkhand, painting is usually done by a caste of
                  professional painters called Chiteras. In the paintings, mud
                  plaster base is used, over which linear patterns are etched
                  with fingers: the process is called 'Lipai'.
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* <Link href="/best-sellers"> */}
        <div className="flex justify-center mt-10 sm:mt-14">
          {/* <button className="bg-red-400 px-10 py-3 text-white font-medium z-10 sm:z-0 rounded-lg mx-auto mt-8 ">
            See all
          </button> */}
        </div>
        {/* </Link> */}
        <div className=" absolute top-10 -left-12 sm:bottom-0 sm:left-0 opacity-50 sm:opacity-100 ">
          {/* <Image
            src="/logo.png"
            alt="Logo"
            width={100}
            height={100}
            className="mb-4"
          /> */}

          <img src="/wt2.png" className="max-w-[160px] h-48 w-48  " />
        </div>
        <div className=" absolute -bottom-20 -left-16 sm:bottom-0 sm:left-0   ">
          <img src="/wt4.png" className="max-w-[280px] " />
        </div>
        <div className=" absolute top-32 -right-10  sm:right-20   opacity-50  sm:opacity-100">
          <img src="/wt3.png" className="max-w-[300px] " />
        </div>
        <div className=" hidden sm:block absolute -bottom-16 -right-10">
          <img src="/wt5.png" className="max-w-[200px] " />
        </div>
        <div className="   absolute top-1/2 -translate-y-1/2 left-1/3 -translate-x-1/2 ">
          <img src="/wt1.png" className="max-w-[200px] " />
        </div>
      </div>
    </>
  );
};

export default DiffrenceBnner;

// import Link from "next/link";
// import React from "react";
// import Image from "next/image";

// const DiffrenceBnner = () => {
//   return (
//     <>
//       <div className="container py-16 relative">
//         {/* Title */}
//         <div className="">
//           <p className="font-semibold text-center text-2xl sm:text-4xl mb-11 mt-11">
//             Artwork of Bundelkhand
//           </p>
//         </div>

//         {/* Text Content */}
//         <div className="space-y-10">
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-10">
//             <div>
//               <p>
//                 Known among discerning travelers for its colorful culture, rich
//                 history, beautiful landscapes, and breathtaking architecture.
//                 Enriched with various Bundela and Chandela tourist attractions
//                 like UNESCO World Heritage Site- the temples of Khajuraho, the
//                 fort and temples of Orchha, Panna National Park, etc.
//               </p>
//             </div>
//             <div></div>
//           </div>
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-10">
//             <div></div>
//             <div>
//               <p>
//                 In Bundelkhand, painting is usually done by a caste of
//                 professional painters called Chiteras. In the paintings, a mud
//                 plaster base is used, over which linear patterns are etched with
//                 fingers: the process is called 'Lipai'.
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Center Button */}
//         <div className="flex justify-center mt-10 sm:mt-14">
//           {/* <button className="bg-red-400 px-10 py-3 text-white font-medium rounded-lg mx-auto mt-8">
//       See all
//     </button> */}
//         </div>

//         {/* Images */}
//         <div className="absolute top-2 sm:top-1/4 left-4 sm:left-8 opacity-60 sm:opacity-80 transform sm:scale-75 lg:scale-100">
//           <Image
//             src="/home2.jpg"
//             alt="Home"
//             width={140}
//             height={140}
//             className="max-w-[160px]"
//           />
//         </div>

//         <div className="absolute -bottom-10 left-6 sm:bottom-0 sm:left-0 transform sm:scale-90 lg:scale-100 opacity-80">
//           <Image
//             src="/Hamirpur.png"
//             alt="Hamirpur"
//             width={160}
//             height={160}
//             className="max-w-[280px]"
//           />
//         </div>

//         <div className="absolute top-6 right-6 sm:right-20 opacity-60 sm:opacity-80 transform sm:scale-75 lg:scale-100">
//           <Image
//             src="/Chitrakoot.png"
//             alt="Chitrakoot"
//             width={140}
//             height={140}
//             className="max-w-[200px]"
//           />
//         </div>

//         <div className="hidden sm:block absolute bottom-0 right-0 transform sm:scale-75 lg:scale-100 opacity-80">
//           <Image
//             src="/logo.png"
//             alt="Logo"
//             width={160}
//             height={160}
//             className="max-w-[260px]"
//           />
//         </div>

//         <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 sm:scale-75 lg:scale-90 opacity-80">
//           <Image
//             src="/potter.png"
//             alt="Potter"
//             width={320}
//             height={320}
//             className="max-w-[300px]"
//           />
//         </div>
//       </div>
//     </>
//   );
// };

// export default DiffrenceBnner;
