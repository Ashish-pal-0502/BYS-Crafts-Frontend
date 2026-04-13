"use client";
import apiClient from "@/api/client";
import useAuth from "@/auth/useAuth";
import OrderAddress from "@/components/OrderAddress";
import Loader from "@/components/loader/Loader";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoIosCart } from "react-icons/io";

const page = () => {
  const { user } = useAuth();
  const [myOrder, setMyOrder] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    if (user) {
      getMyOrder();
    }
  }, [user]);

  const getMyOrder = async () => {
    try {
      const response = await apiClient.get("/orders/myorders-details", {
        id: params.account,
      });

      if (response.ok) {
        setMyOrder(response.data);
      } else {
        setError(response.statusText);
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <Loader />
      </>
    );
  }
  const handleBackClick = () => {
    router.push("/account/");
  };



  return (
    <div className="shadow-lg m-8 rounded-lg pb-4 p-6 shadow-blue-gray-300 bg-white">
      {/* Order Header Section */}
      <div className="border-b-2 pb-4 mb-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center text-[#4F46E5] text-xl font-semibold">
            <IoIosCart className="mr-2 text-2xl" />
            <span>My Order Details</span>
          </div>
          <button
            onClick={handleBackClick}
            className="bg-primary text-white px-4 py-2  transition"
          >
            Back
          </button>
        </div>
      </div>

      {/* Order Address Section */}
      <OrderAddress mydata={myOrder} />

      {/* Items Section */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Items</h2>
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300 text-left">
            <thead>
              <tr className="bg-gray-100 text-gray-600">
                <th className="border border-gray-300 p-4 font-medium">
                  Product Name
                </th>
                <th className="border border-gray-300 p-4 font-medium">
                  Product Image
                </th>
                <th className="border border-gray-300 p-4 font-medium">
                  Quantity
                </th>
                <th className="border border-gray-300 p-4 font-medium">
                  Price
                </th>
              </tr>
            </thead>
            <tbody>
              {myOrder?.orderItems?.length > 0 ? (
                myOrder.orderItems.map((data, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="border p-4 border-gray-300 text-gray-700">
                      {data?.name}
                    </td>
                    <td className="border p-4 border-gray-300">
                      <div className="flex justify-center">
                        <Image
                          src={data?.image}
                          width={80}
                          height={80}
                          alt="Product Image"
                          className="object-contain w-20 h-20 rounded-lg shadow"
                        />
                      </div>
                    </td>
                    <td className="border p-4 border-gray-300 text-center text-gray-700">
                      {data?.qty}
                    </td>
                    <td className="border p-4 border-gray-300 text-center font-semibold text-gray-800">
                      ₹{data?.price}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="border p-4 text-center border-gray-300 text-gray-600"
                  >
                    No order items available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default page;
