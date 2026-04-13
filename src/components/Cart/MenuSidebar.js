"use client";
import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import MobNavbarItems from "../Navbar/MobNavbarItems";
import AccountSidebar from "./AccountSidebar";
import { useRouter } from "next/navigation";
import useAuth from "@/auth/useAuth";
import { FaUserCheck } from "react-icons/fa6";

const MenuSidebar = ({ isOpen, setIsOpen }) => {
  const [isOpenAccount, setIsOpenAccount] = useState(false);
  const router = useRouter();
  const { user } = useAuth();
  const handleRedirect = () => {
    router.push("/account/");
    setIsOpen(false);
  };
  const handleShipping = () => {
    router.push("/track-order/");
    setIsOpen(false);
  };
  return (
    <div>
      <Sheet open={isOpen} onOpenChange={setIsOpen} side="left">
        <SheetContent className="bg-white lg:max-w-[500px]">
          <SheetHeader>
            <SheetTitle className="text-left mb-8">
              {!user ? (
                <div className=" flex justify-between pt-4 relative  text-xs sm:text-sm md:text-lg lg:text-xl cursor-pointer">
                  <div onClick={() => setIsOpenAccount(true)}>
                    <div className="flex items-center gap-x-2 text-xs">
                      <img
                        src="/user.svg"
                        alt="user icon"
                        priority="true"
                        fill="true"
                        className="w-3 h-3"
                      />
                      <span>Account</span>
                    </div>
                  </div>

                  {/* </div> */}
                </div>
              ) : (
                <div className=" flex justify-between pt-4 relative  text-xs sm:text-sm md:text-lg lg:text-xl cursor-pointer">
                  <div onClick={handleRedirect}>
                    <div className="flex items-center gap-x-2 text-xs">
                      <FaUserCheck />
                      <span>Account</span>
                    </div>
                  </div>
                </div>
              )}
            </SheetTitle>
          </SheetHeader>
          <MobNavbarItems setIsOpen={setIsOpen} />
          <AccountSidebar isOpen={isOpenAccount} setIsOpen={setIsOpenAccount} />
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MenuSidebar;
