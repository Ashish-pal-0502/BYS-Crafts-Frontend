"use client";

import Link from "next/link";
import React from "react";
import Image from "next/image";

const SellPartener = () => {
  return (
    <div className="w-full max-w-screen-xl mx-auto h-[700px] lg:h-[650px]  py-2 lg:py-12 rounded-2xl flex flex-col md:flex-row gap-8">
      <div className="w-full lg:w-3/4 px-6 flex flex-col justify-between">
        <div className="w-full lg:w-[90%] flex flex-col gap-2">
          <h4 className=" text-lg md:text-2xl font-medium text-primary normal-case ">
            Bundelkhand Domain
          </h4>

          <h2 className="text-3xl md:text-4xl font-bold text-black normal-case">
            The BNDL Experience !
          </h2>

          <p className="text-black mt-4 text-justify">
            Empowering Bundelkhand artisans through innovative programs that
            preserve traditional crafts while fostering modern market
            opportunities. Revitalizing regional heritage, we connect skilled
            artisans to global platforms for sustainable growth.
          </p>

          <h5 className="text-xl md:text-3xl font-semibold text-black normal-case mt-4">
            Boosting Artisan Sales
          </h5>
        </div>

        <div className="flex items-center mt-4 lg:mt-1 gap-5  md:gap-8 flex-wrap justify-center md:justify-start">
          <Image
            src="/image11.png"
            alt="Brand 1"
            width={100}
            height={170}
            className="object-contain"
          />
          <Image
            src="/image12.png"
            alt="Brand 2"
            width={100}
            height={70}
            className="object-contain rounded-md"
          />
          <Image
            src="/image17.png"
            alt="Brand 3"
            width={100}
            height={70}
            className="object-contain"
          />
          <Image
            src="/image13.png"
            alt="Brand 3"
            width={100}
            height={70}
            className="object-contain"
          />
          <Image
            src="/image14.png"
            alt="Brand 3"
            width={100}
            height={70}
            className="object-contain"
          />
          <Image
            src="/image16.png"
            alt="Brand 3"
            width={100}
            height={70}
            className="object-contain"
          />
          {/* <Image
            src="/image15.png"
            alt="Brand 3"
            width={100}
            height={70}
            className="object-contain"
          /> */}
        </div>

        <div className="flex justify-center lg:justify-start mt-6 lg:mt-2">
          <Link href="">
            <button className="bg-primary text-white  py-3 px-6 rounded-lg hover:bg-primary-hover transition-all">
              Talk to us for great deals
            </button>
          </Link>
        </div>
      </div>

      <div className="w-full hidden  md:w-1/3 lg:flex items-center justify-center mr-4">
        <div className="h-full w-[90%] rounded-3xl shadow-md overflow-hidden">
          <video
            src="/PotteryV2.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          ></video>
        </div>
      </div>
    </div>
  );
};

export default SellPartener;
