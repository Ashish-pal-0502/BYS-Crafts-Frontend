import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useState } from "react";
import LoginForm from "../Account/LoginForm";

import OTPVerificationModal from './../Account/OtpVerificationModal';

const AccountSidebar = ({ isOpen, setIsOpen }) => {
  const [isVerificationModalOpen, setIsVerificationModalOpen] = useState(false);
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [isEmailMode, setIsEmailMode] = useState(true);

  // Close the main sidebar when OTP modal opens
  const handleOpenOTPModal = () => {
    setIsOpen(false);
    setIsVerificationModalOpen(true);
  };

  return (
    <>
      {/* Main Login Sheet */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent className="bg-bg-dark w-full lg:max-w-[500px] h-full flex flex-col z-[100]">
          <SheetHeader>
            <SheetTitle className="text-left">My Account</SheetTitle>
          </SheetHeader>
          <div className="flex-1 overflow-y-auto pr-2">
            <LoginForm
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              setIsVerificationModalOpen={handleOpenOTPModal}
              mobile={mobile}
              setMobile={setMobile}
              email={email}
              setEmail={setEmail}
              isEmailMode={isEmailMode}
              setIsEmailMode={setIsEmailMode}
            />
          </div>
        </SheetContent>
      </Sheet>

      {/* OTP Verification Sheet */}
      <Sheet open={isVerificationModalOpen} onOpenChange={setIsVerificationModalOpen}>
        <SheetContent className="bg-bg-dark w-full lg:max-w-[500px] h-full flex flex-col z-[101]">
          <SheetHeader>
            <SheetTitle className="text-left">
              {isEmailMode ? "Email Verification" : "Mobile Verification"}
            </SheetTitle>
          </SheetHeader>
          <div className="flex-1 overflow-y-auto pr-2">
            <OTPVerificationModal
              email={email}
              setEmail={setEmail}
              mobile={mobile}
              setMobile={setMobile}
              isEmailMode={isEmailMode}
              setIsEmailMode={setIsEmailMode}
              setIsVerificationModalOpen={setIsVerificationModalOpen}
              setIsOpen={setIsOpen}
            />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default AccountSidebar;