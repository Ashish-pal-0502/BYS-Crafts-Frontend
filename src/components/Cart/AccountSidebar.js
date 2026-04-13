import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import LoginForm from "../Account/LoginForm";
import Register from "../Account/Register";
import { ScrollArea } from "../ui/scroll-area";

const AccountSidebar = ({ isOpen, setIsOpen }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  const handleToggleForm = () => {
    setIsRegistering(!isRegistering);
    setIsLogin(!isLogin);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className="bg-bg-dark w-full lg:max-w-[500px] h-full flex flex-col">
        <SheetHeader>
          <SheetTitle className="text-left mb-8">My Account</SheetTitle>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto pr-2">
          {isRegistering || isLogin ? (
            <Register
              setIsLogin={setIsLogin}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
            />
          ) : (
            <LoginForm
              setIsRegistering={setIsRegistering}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
            />
          )}
        </div>
       <p className="mt-4 text-center font-bold">
  {isRegistering ? (
    <span className="text-text-secondaryText">Already have an account? </span>
  ) : (
    <span className="text-text-secondaryText">Don't have an account? </span>
  )}
  <button onClick={handleToggleForm} className="text-primaryText underline">
    {isRegistering ? "Login" : "Register"}
  </button>
</p>
      </SheetContent>
    </Sheet>
  );
};

export default AccountSidebar;
