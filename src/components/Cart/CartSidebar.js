"use client";
import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ScrollArea } from "../ui/scroll-area";
import CartItem from "./CartItem";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import useAuth from "@/auth/useAuth";
import AccountSidebar from "./AccountSidebar";

const CartSidebar = ({ isOpen, setIsOpen }) => {
  const [isOpenAccount, setIsOpenAccount] = useState(false);
  const products = useSelector((state) => state.cart.cart);
  const cartLength = products?.length || 0;
  const router = useRouter();
  const { user } = useAuth();

  const handleClick = () => {
    if (!user) {
      setIsOpenAccount(true);
    } else {
      router.push(`/checkout`);
      setIsOpen(false);
    }
  };

  const totalValue = products.reduce((total, item) => {
    const productPrice = item?.product?.discount
      ? item?.product.sell_price -
        (item?.product.discount * item?.product.sell_price) / 100
      : item?.product.sell_price;
    return total + (item?.quantity || 0) * (productPrice || 0);
  }, 0);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className="bg-white w-full lg:max-w-[500px] flex flex-col">
        <SheetHeader>
          <SheetTitle className="text-left mb-6">
            My Shopping Cart ({cartLength})
          </SheetTitle>
        </SheetHeader>

        {cartLength === 0 ? (
          <div className="flex flex-1 items-center justify-center">
            <p className="uppercase font-semibold text-gray-700">
              Your cart is empty
            </p>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 pr-2">
              {products.map((item, index) => (
                <CartItem item={item} key={index} />
              ))}
            </ScrollArea>

            {/* Fixed Checkout Section */}
            <div className="border-t border-gray-200 pt-4 mt-4 bg-white sticky bottom-0">
              <div className="flex justify-between items-end font-semibold px-2">
                <span className="text-xl">₹{totalValue}.00</span>
                <button
                  className="bg-primary text-white text-base font-medium py-2 px-6 rounded hover:bg-primary/90 transition"
                  onClick={handleClick}
                >
                  CHECKOUT
                </button>
              </div>
            </div>
          </>
        )}

        {/* Account Sidebar for login prompt */}
        <AccountSidebar isOpen={isOpenAccount} setIsOpen={setIsOpenAccount} />
      </SheetContent>
    </Sheet>
  );
};

export default CartSidebar;
