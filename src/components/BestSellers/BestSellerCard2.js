

"use client";
import React from "react";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { add } from "@/redux/features/cart/cartSlice";
import { Heart } from "lucide-react";
import apiClient from "@/api/client";
import useAuth from "@/auth/useAuth";
import Link from "next/link";

const BestSellerCard2 = ({ product }) => {
  const dispatch = useDispatch();
  const { user } = useAuth();

  const slugify = (text) =>
    text
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");

  const productSlug = slugify(product.name);

  const productPrice = product?.discount
    ? product?.sell_price - (product?.discount * product?.sell_price) / 100
    : product?.sell_price;

  const handleAddToCart = (e) => {
    e.preventDefault();
    dispatch(add({ product, quantity: 1 }));
    toast.success("Added to cart");
  };

  const addToWishlist = async (e) => {
    e.preventDefault();
    if (!user?.id) return toast.error("Login required");

    await apiClient.post("/wishlist/create", {
      user: user?.id,
      items: [{ product, qty: 1 }],
    });

    toast.success("Saved to wishlist");
  };

  return (
    <Link href={`/product/${productSlug}/${product._id}`}>
      <div className="group relative rounded-2xl overflow-hidden bg-white transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
        {/* 🔥 IMAGE SECTION */}
        <div className="relative overflow-hidden">
          <img
            src={product?.image[0]}
            alt={product.name}
            className="w-full h-56 sm:h-64 object-cover transition-transform duration-700 group-hover:scale-110"
          />

          {/* TOP BADGE */}
          {product?.discount && (
            <span className="absolute top-3 left-3 bg-black text-white text-xs px-3 py-1 rounded-full shadow">
              {product.discount}% OFF
            </span>
          )}

          {/* WISHLIST */}
          <button
            onClick={addToWishlist}
            className="absolute top-3 right-3 bg-white/90 backdrop-blur p-2 rounded-full shadow hover:scale-110 transition"
          >
            <Heart size={16} />
          </button>

          {/* HOVER DARK OVERLAY */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition duration-500" />
        </div>

        {/* 🔥 FLOATING CONTENT CARD */}
        <div className="relative -mt-10 mx-3 bg-white rounded-xl p-4 shadow-lg transition-all duration-500 group-hover:shadow-xl">
          {/* PRODUCT NAME */}
          <h3 className="text-sm sm:text-base font-semibold text-gray-900 line-clamp-1">
            {product?.name}
          </h3>

          {/* BRAND */}
          <p className="text-xs text-gray-500 mt-1">BYS Crafts</p>

          {/* PRICE SECTION */}
          <div className="flex items-center gap-2 mt-2">
            <span className="text-lg font-bold text-gray-900">
              ₹ {productPrice.toFixed(0)}
            </span>

            {product?.discount && (
              <span className="text-xs text-green-600 font-medium">
                Save {product.discount}%
              </span>
            )}
          </div>

          {/* CTA BUTTON */}
          <button
            onClick={handleAddToCart}
            className="mt-4 w-full bg-black text-white py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-all duration-300"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </Link>
  );
};

export default BestSellerCard2;
