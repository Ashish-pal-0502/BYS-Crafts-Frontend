import React from "react";
import { SheetHeader, SheetTitle } from "../ui/sheet";
import Image from "next/image";
const LogoInformation = () => {
  return (
    <>
      <SheetHeader className="mb-8">
        <SheetTitle className="flex justify-center  items-center ">
          <Image
            src="/BYDLogo.webp"
            alt="logo"
            width={100}
            height={49}
            className="h-[90px] md:h-auto"
          />
        </SheetTitle>
        <SheetTitle className="flex justify-center items-center mb-8">
          Explore Handmade Crafts with BYS
        </SheetTitle>
        {/* <SheetTitle className="text-left mb-8">My Account</SheetTitle> */}
      </SheetHeader>
    </>
  );
};

export default LogoInformation;
