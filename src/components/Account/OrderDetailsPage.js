"use client";
import { useRouter } from "next/navigation";
import React from "react";

const OrderDetailsPage = () => {
  const router = useRouter();
  const id = "abc";
  const handleClick = () => {
    router.push(`/account/${id}`);
  };
  return (
    <>
      <div className="bg-white flex justify-center mb-1 items-center">
        <div className="bg-white w-full md:w-3/4">
          <div
            className="p-4 text-sm flex justify-between
          "
          >
            {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"> */}
            <div className="rounded-lg">
              Ordered On 14 April 2024 | Order# 1234-75444421-7306758
            </div>
            <div className="font-bold">InVoice</div>
            {/* </div> */}
          </div>
        </div>
      </div>

      <div className="bg-white flex justify-center mb-5 items-center">
        <div className="bg-white rounded-black shadow-md rounded-xl border border-gray-500 w-full md:w-3/4">
          <div className="p-4 text-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="rounded-lg">
                <div className="font-bold">Shipping Address</div>
                <p>Lucknow, UTTAR PRADESH 226010 India</p>
              </div>
              <div className="rounded-lg">
                <div className="font-bold">Payment Methods</div>
                <p>BHIM UPI</p>
              </div>
              <div className="rounded-lg">
                <table className="table-auto w-full">
                  <tbody className="text-xs">
                    <tr className="font-bold">
                      <td className="py-1 px-4 col-span-2"> Grand Total : </td>
                    </tr>
                    <tr>
                      <td className="py-1 px-4 ">Item(s) Subtotal : </td>
                      <td className="py-1 px-4">RS. 1,099.00</td>
                    </tr>
                    <tr>
                      <td className="py-1 px-4">Shipping :</td>
                      <td className="py-1 px-4">Rs. 40.00</td>
                    </tr>
                    <tr>
                      <td className="py-1 px-4">Total :</td>
                      <td className="py-1 px-4">Rs. 1,139.00</td>
                    </tr>
                    <tr>
                      <td className="py-1 px-4">Promotion Applied : </td>
                      <td className="py-1 px-4">Rs. -40.00</td>
                    </tr>
                    <tr className="font-bold">
                      <td className="py-1 px-4"> Grand Total : </td>
                      <td className="py-1 px-4">Rs. 1,099.00</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white  flex justify-center mb-5 items-center">
        <div className="bg-white rounded-black shadow-md rounded-xl border border-gray-500 w-full md:w-3/4">
          <div className="space-y-24 p-4">
            <div className="grid grid-cols-1 text-sm sm:grid-cols-12 sm:gap-x-6 md:gap-x-8 lg:gap-x-8">
              <div className="sm:col-span-2 aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-700">
                <img
                  src="https://tailwindui.com/img/ecommerce-images/confirmation-page-04-product-01.jpg"
                  alt="image"
                  className="object-cover object-center w-full h-full"
                />
              </div>
              <div className=" sm:col-span-7 md:col-span-9 lg:col-span-7">
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
                  useful data.
                </p>
              </div>
              <div className=" sm:col-span-3 md:col-span-3 lg:col-span-3">
                <div className="flex-shrink-0 m-3">
                  <button className="bg-[#ed1d24] rounded-xl text-white font-medium text-xs py-2 px-6 sm:px-12 w-full sm:w-auto">
                    Track Order
                  </button>
                </div>
                <div className="flex-shrink-0 m-3">
                  <button
                    className="bg-[#ed1d24] rounded-xl text-white font-medium text-xs py-2 px-4 sm:px-8 w-full sm:w-auto"
                    onClick={handleClick}
                  >
                    View Order Detail
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderDetailsPage;
