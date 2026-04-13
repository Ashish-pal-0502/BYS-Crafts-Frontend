"use client";

import React, { useState } from "react";
import Price from "../shopPage/shopBy/Price";
import Category from "../shopPage/shopBy/Category";
import SubCategory from "../shopPage/shopBy/SubCategory";
import MobNavItems from "./MobNavItems";
import AccountSidebar from "../Cart/AccountSidebar";
import { useRouter } from "next/navigation";
import useAuth from "@/auth/useAuth";
import Link from "next/link";

const MobNavbarItems = ({ setIsOpen }) => {
  const closeModal = () => {
    setIsOpen(false);
  };
  return (
    <div className="w-full flex flex-col  ">
      {/* <p className="text-2xl font-medium">Filters </p> */}
      <div>
        <MobNavItems setIsOpen={setIsOpen} />
      </div>
      <div>
        <div>
          <ul className="mt-3 text-[15px]">
            {/* <li className=" pt-[6px]">
              <div className="flex w-full items-center">
                <div className="flex-1">
                  <Link
                    href="#"
                    onClick={closeModal}
                    className="block  transition ease-in-out duration-300 text-black font-semibold hover:text-black"
                  >
                    Makeup
                    <hr className="mt-4 border-gray-300" />
                  </Link>
                </div>
              </div>
            </li>
            <li className=" pt-[6px]">
              <div className="flex w-full items-center">
                <div className="flex-1">
                  <Link
                    href="#"
                    onClick={closeModal}
                    className="block py-2       transition ease-in-out duration-300 text-black font-semibold hover:text-black"
                  >
                    Skin Care
                    <hr className="mt-4 border-gray-300" />
                  </Link>
                </div>
              </div>
            </li>
            <li className=" pt-[6px]">
              <div className="flex w-full items-center">
                <div className="flex-1">
                  <Link
                    href="#"
                    onClick={closeModal}
                    className="block py-2       transition ease-in-out duration-300 text-black font-semibold hover:text-black"
                  >
                    Hair Care
                    <hr className="mt-4 border-gray-300" />
                  </Link>
                </div>
              </div>
            </li> */}
            <li className=" pt-[6px]">
              <div className="flex w-full items-center">
                <div className="flex-1">
                  <Link
                    href="/best-sellers"
                    onClick={closeModal}
                    className="block py-2       transition ease-in-out duration-300 text-black font-semibold hover:text-black"
                  >
                    Best sellers
                    <hr className="mt-4 border-gray-300" />
                  </Link>
                </div>
              </div>
            </li>
            <li className=" pt-[6px]">
              <div className="flex w-full items-center">
                <div className="flex-1">
                  <Link
                    href="/new-arrivals"
                    onClick={closeModal}
                    className="block py-2       transition ease-in-out duration-300 text-black font-semibold hover:text-black"
                  >
                    New Arrivals
                    <hr className="mt-4 border-gray-300" />
                  </Link>
                </div>
              </div>
            </li>
            <li className=" pt-[6px]">
              <div className="flex w-full items-center">
                <div className="flex-1">
                  <Link
                    href="/blogs"
                    onClick={closeModal}
                    className="block py-2  hover:text-black     transition ease-in-out duration-300 text-black font-semibold  "
                  >
                    Blogs
                    <hr className="mt-4 border-gray-300" />
                  </Link>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MobNavbarItems;
