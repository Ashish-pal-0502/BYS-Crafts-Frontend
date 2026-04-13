import Image from "next/image";
import React from "react";

const OrderImagecard = ({ item, index }) => {
  const productPrice = item?.product.discount
    ? item?.product.sell_price -
      (item?.product.discount * item?.product.sell_price) / 100
    : item?.product.sell_price;
  return (
    <>
      <div
        className={`flex justify-between items-center pb-4 border-b border-gray-300 ${
          index > 0 ? "pt-4" : ""
        }`}
      >
        <Image
          src={item.product.image[0]}
          width={50}
          height={50}
          alt="Picture of the author"
          className="object-cover object-center  "
        />
        <div className="flex-1 ml-4">
          <p className="text-base font-semibold">{item.product.name}</p>
        </div>
        <div className="flex-1 flex justify-between items-center ml-20">
          <p className="text-base font-medium text-black">x{item.quantity}</p>
          <p className="text-base text-black font-medium">₹ {productPrice}</p>
        </div>
      </div>
    </>
  );
};

export default OrderImagecard;
