"use client";
import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import AddtoCartBtn from "../Button/AddtoCartBtn";
import { add } from "@/redux/features/cart/cartSlice";
import { useDispatch } from "react-redux";
// import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
const NewProducts = ({ product }) => {
  const dispatch = useDispatch();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const handleAddToCart = () => {
    dispatch(add({ product, quantity: 1 }));
    // toast.success("Success. Check your cart!", {
    //   position: "bottom-right",
    //   autoClose: 5000,
    //   hideProgressBar: false,
    //   closeOnClick: true,
    //   pauseOnHover: true,
    //   draggable: true,
    //   progress: undefined,
    //   theme: "dark",
    // });
    toast.success("Success. Check your cart!");
  };
  const handleImageError = (event) => {
    event.target.src =
      "https://files.stbotanica.com/site-images/400x400/STBOT470-01.jpg";
  };
  // const short = product.name.replace(/(.{33})..+/, "$1");
  const short =
    product.name.length > 24 ? product.name.slice(0, 24) + "..." : product.name;

  const handleMouseEnter = () => {
    if (product.image && product.image.length > 1) {
      setCurrentImageIndex(1);
    }
  };

  const handleMouseLeave = () => {
    setCurrentImageIndex(0);
  };

  const slugify = (text) =>
    text
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");

  const productSlug = slugify(product.name);

  return (
    <div>
      <div className="rounded-xl m-2 shadow-lg">
        <span className="absolute bg-[#ed1d24] p-0 px-2 text-white rounded-tl-lg rounded-br-lg">
          Best Seller
        </span>

        <div className=" flex-col  flex">
          <Link
            className="group"
            href={`/product/${productSlug}/${product._id}`}
          >
            <div
              className="overflow-hidden rounded-t-lg  h-[228px]  flex items-center justify-center"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <Image
                src={
                  product.image && product.image.length > 0
                    ? product.image[currentImageIndex]
                    : "https://files.stbotanica.com/site-images/400x400/STBOT470-01.jpg"
                }
                className="object-cover w-full h-full
                "
                // h-40  md:h-48
                alt="image"
                width={228}
                height={212}
                onError={handleImageError}
              />
            </div>
          </Link>
          <div className="p-2">
            <p className="text-sm font-medium text-left">{short}</p>
            <p className="text-sm text-gray-400 font-normal  text-left">
              {product.category.name}
            </p>
            <div className="flex flex-row gap-1 mt-2 items-center">
              <div className="flex flex-row gap-1 text-white bg-green-700 p-0 px-2   rounded-md">
                <span className=" pt-1">
                  <FaStar color="#ffffff text-sm" size={10} />
                </span>
                <span className="text-sm">{product?.rating}</span>
              </div>

              <p className="text-xs  font-medium">
                ({product?.reviews?.length})
              </p>
            </div>
            <div className="text-lg font-semibold  text-left mt-2">
              ₹{product.sell_price}
            </div>
            {product.countInStock.qty === 0 ? (
              <div className="md:flex md:w-full md:h-14 md:justify-between mt-6">
                <div className="w-full text-center bg-red-200 text-white py-2 rounded-lg font-semibold mt-4 hover:bg-red-300 focus:scale-95 transition-all">
                  Out of Stocks
                </div>
              </div>
            ) : (
              <div className="md:flex md:w-full md:h-14 md:justify-between mt-2 sm:mt-6">
                <AddtoCartBtn
                  onClick={handleAddToCart}
                  btnStyles="w-full text-center  bg-[#ed1d24] text-white py-2 rounded-lg font-semibold mt-4 hover:bg-red-300 focus:scale-95 transition-all"
                />
              </div>
            )}
          </div>
        </div>
      </div>
      {/* <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      /> */}
      <Toaster position="bottom-right" />
    </div>
  );
};

export default NewProducts;
