
"use client";
import React from "react";
import Image from "next/image";

const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#faf6ed] to-[#F5EFE0]">
      <div className="animate-pulseScale">
        <Image
          src="/BYDLogo.webp"
          alt="Logo"
          width={120}
          
          height={120}
          className="mb-6 object-contain"
        />
      </div>

      <div className="relative w-28 h-[3px] bg-[#e6dfd2] overflow-hidden rounded-full">
        <div className="absolute top-0 left-0 h-full w-1/2 bg-[#C8A96A] animate-slide"></div>
      </div>

      <p className="mt-4 text-xs text-gray-500 tracking-wide">
        Loading craftsmanship...
      </p>
    </div>
  );
};

export default Loader;
