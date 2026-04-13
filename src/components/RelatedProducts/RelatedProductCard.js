"use client";

import Image from "next/image";
import Link from "next/link";
import { BsEye } from "react-icons/bs";
import AddtoCartBtn from "../Button/AddtoCartBtn";
import { FaStar } from "react-icons/fa";

const RelatedProductCard = ({ product }) => {
  const short = product.name.replace(/(.{33})..+/, "$1");
  return (
    <Link className="group" href={`/product/${product.slug}`}>
      <div className="drop-shadow-md rounded-md bg-white border-red-500 h-[300px] mb-3 p-4 m-5 overflow-hidden relative md:h-[328px]">
        <div className="w-full h-full group-hover:bg-primary/10 transition-all duration-300 flex justify-center items-center">
          <div className="absolute top-8 left-8 bg-[#ed1d24] text-white px-3 text-sm uppercase font-medium ">
            Best Seller
          </div>
          <Image src={product?.image[0]} width={240} height={147} alt="image" />
        </div>
      </div>

      <p className="text-sm font-medium text-left">{short}</p>
      <p className="text-sm text-gray-400 font-normal  text-left">
        {product.category.name}
      </p>
      <div className="text-lg font-semibold text-accent text-left">
        ₹{product.sell_price}
      </div>
    </Link>
  );
};

export default RelatedProductCard;
