"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

import { Search, Heart, User, Menu, X, ShoppingCart } from "lucide-react";

import useAuth from "@/auth/useAuth";
import CartSidebar from "../Cart/CartSidebar";
import AccountSidebar from "../Cart/AccountSidebar";
import SearchSidebar from "../Search/SearchSidebar";

export const Header = () => {
  const [isMobileMenu, setIsMobileMenu] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);

  const [cartLength, setCartLength] = useState(0);

  const selector = useSelector((state) => state.cart);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    setCartLength(selector.cart.length);
  }, [selector.cart]);

  return (
    <>
      <div className="bg-[#0F1E2F] text-white text-xs text-center py-2 tracking-wide">
        Free shipping on orders above{" "}
        <span className="text-[#C8A96A] font-semibold">₹1,999</span> | Use code{" "}
        <span className="text-[#C8A96A] font-semibold">ARTISAN15</span> for 15%
        off
      </div>

      <nav className="sticky top-0 z-50 bg-[#ECE6DC] border-b border-neutral-300">
        <div className="w-full px-6 lg:px-12 py-4">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <Link href="/" className="flex items-center">
                <img src="/BYDLogo.webp" className="h-10" />
              </Link>
            </div>

            <div className="hidden lg:flex flex-1 justify-center">
              <div className="flex items-center gap-10 text-[14px] font-medium text-[#1E2A38] whitespace-nowrap">
                <Link
                  href="/collections"
                  className="hover:opacity-70 transition"
                >
                  Collections
                </Link>
                {/* <Link href="/artisans" className="hover:opacity-70 transition">
                  Artisans
                </Link> */}
                <Link
                  href="/new-arrivals"
                  className="hover:opacity-70 transition"
                >
                  New arrivals
                </Link>
                <Link href="/blogs" className="hover:opacity-70 transition">
                  Blogs
                </Link>
                <Link href="/about-us" className="hover:opacity-70 transition">
                  About Us
                </Link>
              </div>
            </div>

            <div className="flex-1 flex items-center justify-end gap-6 text-[#1E2A38]">
              <button onClick={() => setIsSearchOpen(true)}>
                <Search size={20} />
              </button>
{/* 
              <button
                className="hidden lg:block"
                onClick={() => router.push("/my-wishlist")}
              >
                <Heart size={20} />
              </button> */}

              <button  onClick={() => router.push("/cart")} className="relative">
                <ShoppingCart size={20} />
                {cartLength > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#C8A96A] text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center">
                    {cartLength}
                  </span>
                )}
              </button>

              <button
                onClick={() =>
                  user ? router.push("/account") : setIsAccountOpen(true)
                }
              >
                <User size={20} />
              </button>

              <button
                className="lg:hidden"
                onClick={() => setIsMobileMenu(true)}
              >
                <Menu size={24} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {isMobileMenu && (
        <div className="fixed inset-0 z-50 bg-white flex flex-col">
          <div className="flex items-center justify-between p-5 border-b">
            <img src="/BYDLogo.webp" className="h-10" />

            <X
              size={26}
              className="cursor-pointer"
              onClick={() => setIsMobileMenu(false)}
            />
          </div>

          <div className="flex-1 p-6 space-y-6 text-lg font-medium text-[#1E2A38]">
            <Link href="/collections" onClick={() => setIsMobileMenu(false)}>
              Collections
            </Link>
            {/* <Link href="/artisans" onClick={() => setIsMobileMenu(false)}>
              Artisans
            </Link> */}
            <Link href="/new-arrivals" onClick={() => setIsMobileMenu(false)}>
              New arrivals
            </Link>
            <Link href="/our-story" onClick={() => setIsMobileMenu(false)}>
              Our story
            </Link>
            <Link href="/gifting" onClick={() => setIsMobileMenu(false)}>
              Gifting
            </Link>
          </div>
        </div>
      )}

      <CartSidebar isOpen={isCartOpen} setIsOpen={setIsCartOpen} />
      <AccountSidebar isOpen={isAccountOpen} setIsOpen={setIsAccountOpen} />
      <SearchSidebar isOpen={isSearchOpen} setIsOpen={setIsSearchOpen} />
    </>
  );
};
