"use client";

import { Heart, Star } from "lucide-react";
import Link from "next/link";
import useAuth from "./../../auth/useAuth";
import apiClient from "./../../api/client";
import toast from "react-hot-toast";

const BestSellingCraftCard = ({ product }) => {
  const { user } = useAuth();

  const { name, image, sell_price, discount, rating, artisanInfo } = product;

  const finalPrice = sell_price - (sell_price * discount) / 100;

  const slugify = (text) =>
    text.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");

  const productSlug = slugify(product.name);

  const addToWishlist = async () => {
    if (!user?.id) {
      toast.error("Please log in to add items to your wishlist.");
      return;
    }

    const response = await apiClient.post("/wishlist/create", {
      user: user?.id,
      items: [{ product, qty: 1 }],
    });

    response.ok
      ? toast.success("Item added to wishlist")
      : toast.error("Failed to add item to wishlist");
  };

  return (
    <Link href={`/product/${productSlug}/${product._id}`} className="h-full">
      <div className="bg-[#FAF6ED] rounded-xl overflow-hidden border border-[#1B3A5C0F]  transition flex flex-col h-full">

     
        <div className="relative bg-[#eae2d6] h-[220px] flex-shrink-0">
          {discount > 0 && (
            <span className="absolute top-3 left-3 text-xs bg-red-500 text-white px-2 py-1 rounded">
              {discount}% off
            </span>
          )}

          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addToWishlist();
            }}
            className="absolute top-3 right-3 bg-white rounded-full p-2 shadow"
          >
            <Heart size={16} />
          </button>

          <img
            src={image?.[0]}
            alt={name}
            className="h-full w-full object-cover"
          />
        </div>

       
        <div className="p-4 flex flex-col flex-1">

        
          <div className="space-y-2 min-h-[110px]">
            <p className="text-xs text-gray-500">
              By {artisanInfo?.artisan?.name || "Artisan"}
            </p>

            <h3 className="text-sm font-medium text-gray-900 line-clamp-2 min-h-[40px]">
              {name}
            </h3>

            <p className="text-xs text-gray-500 line-clamp-2 min-h-[32px]">
              {artisanInfo?.artisanDescription || ""}
            </p>
          </div>

        
          <div className="mt-auto pt-2">
            <div className="flex items-center justify-between">

              <div className="flex items-center gap-2 text-sm">
                <span className="font-semibold text-black">
                  ₹{finalPrice.toFixed(0)}
                </span>

                {discount > 0 && (
                  <span className="line-through text-gray-400 text-xs">
                    ₹{sell_price}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-1 text-xs text-gray-500">
                <Star size={14} className="fill-yellow-400 text-yellow-400" />
                {rating || 4.5}
              </div>

            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BestSellingCraftCard;