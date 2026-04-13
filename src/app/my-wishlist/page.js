
"use client";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import useAuth from "@/auth/useAuth";
import apiClient from "@/api/client";
import toast from "react-hot-toast";
import Link from "next/link";
import WishlistCard from './../../components/Cards/WishlistCard';


export default function WishlistPage() {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (!user?.id) {
      setLoading(false);
      return;
    }
    fetchWishlist();
  }, [user?.id]);

  const fetchWishlist = async () => {
    try {
      const res = await apiClient.get(`/wishlist/get-wishlists`, {
        userId: user?.id,
      });
      setWishlist(res.data?.wishlists || []);
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    } finally {
      setLoading(false);
    }
  };

  const removeFromWishlist = async (product) => {
    try {
      const res = await apiClient.post("/wishlist/delete", {
        user: user.id,
        items: [{ product, qty: 1 }],
      });

      if (res.status === 200) {
        toast.success("Item removed");
        fetchWishlist();
      } else {
        toast.error("Failed to remove");
      }
    } catch (error) {
      toast.error("Error removing item");
    }
  };

  // LOADING
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <Loader2 className="animate-spin w-8 h-8 text-gray-500" />
      </div>
    );
  }

  // NOT LOGGED IN
  if (!user?.id) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl font-semibold mb-3">
          Please log in to view your wishlist
        </h2>
        <Link
          href="/login"
          className="bg-[#1f3b57] text-white px-4 py-2 rounded"
        >
          Go to Login
        </Link>
      </div>
    );
  }

  // EMPTY
if (!wishlist.length) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] bg-[#FAF6ED] text-center">

      {/* ICON / ILLUSTRATION */}
      <div className="w-24 h-24 bg-[#f3eee6] rounded-full flex items-center justify-center mb-6">
        <span className="text-3xl">🤍</span>
      </div>

      {/* TITLE */}
      <h2 className="text-xl font-semibold text-[#2c2c2c] mb-2">
        Your wishlist is empty
      </h2>

      {/* SUBTEXT */}
      <p className="text-gray-500 text-sm max-w-sm">
        Save your favorite items here and revisit them anytime. Start exploring and add products you love.
      </p>

      {/* CTA BUTTON */}
      <Link
        href="/"
        className="mt-6 bg-[#1f3b57] text-white px-6 py-2 rounded-md text-sm hover:bg-[#173047] transition"
      >
        Explore products
      </Link>
    </div>
  );
}

  return (
    <div className=" bg-[#FAF6ED]">
    <div className="max-w-[1200px]  mx-auto px-4 py-10">

      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-[#2c2c2c]">
          Wishlist
        </h1>
        <p className="text-sm text-gray-500">
          Items you've saved for later
        </p>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {wishlist.map((item) => (
          <WishlistCard
            key={item?.product?._id}
            product={item?.product}
            onRemove={removeFromWishlist}
          />
        ))}
      </div>
    </div>
    </div>
  );
}