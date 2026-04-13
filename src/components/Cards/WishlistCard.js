

"use client";
import Image from "next/image";
import { X } from "lucide-react";
import { useDispatch } from "react-redux";
import { add } from "@/redux/features/cart/cartSlice";
import toast from "react-hot-toast";

const WishlistCard = ({ product, onRemove }) => {
  const dispatch = useDispatch();

  const productPrice = product?.discount
    ? product?.sell_price - (product?.discount * product?.sell_price) / 100
    : product?.sell_price;

  const handleAddToCart = () => {
    dispatch(add({ product, quantity: 1 }));
    toast.success("Added to cart");
  };

  return (
    <div className="bg-[#f3eee6] border border-[#e2dbcf] rounded-xl overflow-hidden relative">

      <button
        onClick={() => onRemove(product)}
        className="absolute top-3 right-3 w-6 h-6 flex items-center justify-center bg-white rounded-full shadow text-red-500 hover:bg-red-50 z-10"
      >
        <X size={14} />
      </button>

<div className="w-full h-[200px] relative">
  {product?.image?.[0] ? (
    <Image
      src={product.image[0]}
      alt={product.name}
      fill
      className="object-cover rounded-t-xl"
    />
  ) : (
    <div className="w-full h-full flex items-center justify-center bg-gray-100 text-xs text-gray-500">
      {product?.category || "Product"}
    </div>
  )}
</div>

      <div className="p-4">
        <h3 className="text-[14px] text-[#2c2c2c] font-medium line-clamp-1">
          {product?.name}
        </h3>

        <p className="text-[14px] font-semibold mt-1">
          ₹{productPrice?.toFixed(0)}
        </p>

        <button
          onClick={handleAddToCart}
          className="w-full mt-3 bg-[#1f3b57] text-white text-[13px] py-2 rounded-md hover:bg-[#173047] transition"
        >
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default WishlistCard;