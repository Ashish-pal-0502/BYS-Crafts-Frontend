"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import OrderCardHeader from "./OrderCardHeader";

const OrderSummaryCard = () => {
  const router = useRouter();
  const id = "abc";
  const handleClick = () => {
    router.push(`/account/${id}`);
  };
  return (
    <div className="bg-white  flex justify-center mb-5 items-center">
      <div className="bg-white rounded-black shadow-md rounded-xl border border-gray-500 w-full md:w-3/4">
        <OrderCardHeader />
        <div className="space-y-24 p-4">
          <div className="grid grid-cols-1 text-sm sm:grid-cols-12 sm:gap-x-6 md:gap-x-8 lg:gap-x-8">
            <div className="sm:col-span-2 col-span-2  aspect-h-1 aspect-w-1 overflow-hidden rounded-lg p-3">
              <Image
                src="https://tailwindui.com/img/ecommerce-images/confirmation-page-04-product-01.jpg"
                width={400}
                height={400}
                alt="Picture of the author"
                className="object-cover object-center w-full h-full"
              />
            </div>
            <div className=" sm:col-span-7 md:col-span-8 lg:col-span-7">
              <p className="text-gray-700">
                boAt Rockerz 255 Pro+ Bluetooth in Ear Earphones with Upto 60
                Hours Playback, ASAP Charge, IPX7, Dual Pairing and Bluetooth
                v5.0(Active Black)
              </p>
              <p className="mt-3 text-gray-700">
                Return window closed on 06-feb-2024
              </p>
              <p className="mt-3 text-gray-700">
                dummy data is benign information that does not contain any
                useful data, but serves to reserve space where real data is
                nominally present.
              </p>
            </div>
            <div className=" sm:col-span-3 md:col-span-3 lg:col-span-3">
              <div className="flex-shrink-0 m-3">
                <button className="bg-[#ed1d24] rounded-xl text-white font-medium text-xs py-2 px-6 sm:px-12 w-full">
                  Track Order
                </button>
              </div>
              <div className="flex-shrink-0 m-3">
                <button
                  className="bg-[#ed1d24] rounded-xl text-white font-medium text-xs py-2 px-4 sm:px-8 w-full"
                  onClick={handleClick}
                >
                  View Order Detail
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2  p-4 border-t border-gray-500   rounded-b-xl  justify-between">
          <div>Archive order</div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummaryCard;
