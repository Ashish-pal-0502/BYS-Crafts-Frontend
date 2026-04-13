"use client";

import { Facebook, Instagram, Youtube } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-[#0F1E2F] text-white">
      <div className="max-w-6xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <h3 className="text-xl font-semibold flex items-center gap-2">
              BYS CRAFTS
            </h3>

            {/* <div className="flex-1">
              <Link href="/" className="flex items-center">
                <img src="/BYDLogo.webp" className="h-10" />
              </Link>
            </div> */}

            <p className="text-sm text-gray-300 mt-4 leading-relaxed max-w-xs">
              Connecting India's finest artisans with conscious customers
              worldwide. Every craft has a story. Every purchase has an impact.
            </p>

            <div className="flex gap-3 mt-5">
              {[Facebook, Instagram, Youtube].map((Icon, i) => (
                <div
                  key={i}
                  className="w-9 h-9 flex items-center justify-center rounded-full border border-white/20 hover:bg-white/10 transition cursor-pointer"
                >
                  <Icon size={16} />
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4 text-gray-200">Shop</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="hover:text-white cursor-pointer">New arrivals</li>
              <li className="hover:text-white cursor-pointer">Bestsellers</li>
              <li className="hover:text-white cursor-pointer">Textiles</li>
              <li className="hover:text-white cursor-pointer">Pottery</li>
              <li className="hover:text-white cursor-pointer">Jewelry</li>
              <li className="hover:text-white cursor-pointer">Home decor</li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4 text-gray-200">
              Company
            </h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="hover:text-white cursor-pointer">Our story</li>
              <li className="hover:text-white cursor-pointer">
                Artisan partners
              </li>
              <li className="hover:text-white cursor-pointer">Impact report</li>
              <li className="hover:text-white cursor-pointer">Careers</li>
              <li className="hover:text-white cursor-pointer">Press</li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4 text-gray-200">
              Support
            </h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="hover:text-white cursor-pointer">Contact us</li>
              <li className="hover:text-white cursor-pointer">Shipping info</li>
              <li className="hover:text-white cursor-pointer">
                Returns & exchange
              </li>
              <li className="hover:text-white cursor-pointer">FAQs</li>
              <li className="hover:text-white cursor-pointer">Track order</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-400 text-center md:text-left">
            © {new Date().getFullYear()} BYS Crafts. Crafted with care in India.
          </p>

          <div className="flex gap-2 flex-wrap justify-center">
            {["UPI", "Visa", "Mastercard", "RuPay", "COD"].map((item, i) => (
              <span
                key={i}
                className="text-xs px-3 py-1 border border-white/20 rounded-md text-gray-300"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
