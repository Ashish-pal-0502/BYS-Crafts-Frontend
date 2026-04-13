import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import AddressForm from "../Account/AddressForm";
import { ScrollArea } from "@radix-ui/react-scroll-area";

const AddressSidebar = ({ isOpen, setIsOpen, existingAddress, refreshAddresses }) => {
    const isEditMode = !!existingAddress?._id;
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      {/* <SheetHeader> */}
      <SheetContent className="bg-white lg:max-w-[500px]">
        <SheetHeader>
          <SheetTitle className="text-left mb-8">{ isEditMode ? "Update address" : "Add a new address"}</SheetTitle>
        </SheetHeader>
        {/* Wrap the content in a div with a fixed height and overflow-y:auto */}
        <div style={{ maxHeight: "calc(100vh - 200px)", overflowY: "auto" }}>
          <AddressForm
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            existingAddress={existingAddress}
              refreshAddresses={refreshAddresses}
          />
        </div>
      </SheetContent>
      {/* </SheetHeader> */}
    </Sheet>
  );
};

export default AddressSidebar;
