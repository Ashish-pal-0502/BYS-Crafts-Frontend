

"use client";
import React, { useState, useCallback } from "react";
import toast, { Toaster } from "react-hot-toast";
import ProductDetailsCarousel from "@/components/ProductDetailsCarousel/ProductDetailsCarousel";
import Wrapper from "@/components/Wrapper/Wrapper";
import RelatedProducts from "@/components/RelatedProducts/RelatedProducts";
import { useDispatch } from "react-redux";
import { add } from "@/redux/features/cart/cartSlice";
import ProductReview from "@/components/Account/ProductReview";
import { FiMinus, FiPlus } from "react-icons/fi";
import useAuth from "@/auth/useAuth";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumb/Breadcrumbs";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { FiShield, FiTruck, FiRotateCcw } from "react-icons/fi";
import ReviewSection from './../../../../components/Review/ReviewSection';


export default function ProductPage({ product, related }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useAuth();
 const [open, setOpen] = useState(true);
  const [quantity, setQuantity] = useState(1);

  console.log("found prod", product)

  const productPrice = product.discount
    ? product.sell_price - (product.discount * product.sell_price) / 100
    : product.sell_price;

  const handleQuantity = useCallback(
    (type) => {
      if (type === "dec" && quantity > 1) {
        setQuantity(quantity - 1);
      } else if (type === "inc") {
        setQuantity(quantity + 1);
      }
    },
    [quantity]
  );

  

 

    const notify = useCallback(() => {
    dispatch(add({ product, quantity }));
    toast.success("Success. Check your cart!");
  }, [product, quantity]);

  const buyNow = useCallback(() => {
    if (!user) {
      toast.error("Please login to continue");
      return;
    }
    dispatch(add({ product, quantity }));
    router.push("/checkout");
  }, [user, product, quantity, router]);

  const handleShare = async () => {
    if (!navigator.share) {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied!");
      return;
    }

    await navigator.share({
      title: product?.name,
      url: window.location.href,
    });
  };

  return (
    <section className="bg-[#faf6ed]  min-h-screen">
      <Wrapper>

        <Breadcrumbs product={product} />

        <div className="flex flex-col px-4  lg:px-10 lg:flex-row gap-10 mt-6">

          <div className="w-full lg:w-[50%]">
              <ProductDetailsCarousel images={product?.image} />
        
          </div>

          <div className="w-full lg:w-[50%] space-y-4">

            <div className="flex justify-between items-center">
              <div className="flex gap-3 items-center">

                
             
              <div className="inline-flex items-center gap-3 px-3 py-2 border border-[#EDE5D3] rounded-full  bg-[#F5EFE0] shadow-sm">
  
  <div className="w-8 h-8  rounded-full bg-[#1f3b57] text-white flex items-center justify-center text-xs overflow-hidden">
    {product?.artisanInfo?.artisan?.image ? (
      <img
        src={product?.artisanInfo?.artisan?.image}
        alt={product?.artisanInfo?.artisan?.fullName || "artisan"}
        className="w-full h-full object-cover"
      />
    ) : (
      <span className="font-medium">
        {product?.artisanInfo?.artisan?.name?.charAt(0)?.toUpperCase() || "A"}
      </span>
    )}
  </div>

  <div className="leading-tight">
    <p className="text-sm font-medium text-gray-900">
      {product?.artisanInfo?.artisan?.name || "Artisan"}
    </p>
    <p className="text-xs text-gray-500">
      India
    </p>
  </div>
</div>
              </div>

              <button onClick={handleShare}>
                <Image src="/share.png" width={20} height={20} alt="share" />
              </button>
            </div>

            <h1 className="text-3xl font-semibold">
              {product?.name}
            </h1>

            <ProductReview
              initialRating={product?.rating || 4.9}
              initialTotalReviews={product?.reviews?.length || 128}
            />

            <div className="flex items-center gap-3">
              <span className="text-2xl font-bold">
                ₹{productPrice.toLocaleString()}
              </span>

              <span className="line-through text-gray-400 text-sm">
                ₹{product?.sell_price}
              </span>

              <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded">
                Save 22%
              </span>
            </div>


            <div
  className="text-gray-600 text-sm leading-relaxed space-y-2"
  dangerouslySetInnerHTML={{ __html: product?.description }}
/>

         

            <div className="flex items-center gap-6">


  <span className="text-sm text-gray-700 font-medium">Qty</span>


<div className="flex items-center bg-[#f3efe7] rounded-md overflow-hidden border border-[#e5e0d6] h-[36px]">

  <button
    onClick={() => handleQuantity("dec")}
    className="px-4 h-full flex items-center justify-center bg-[#e9e3d6]"
  >
    <FiMinus size={14} />
  </button>

  <span className="px-5 h-full flex items-center text-gray-800 text-sm font-medium border-x border-[#e5e0d6]">
    {quantity}
  </span>

  <button
    onClick={() => handleQuantity("inc")}
    className="px-4 h-full flex items-center justify-center bg-[#e9e3d6]"
  >
    <FiPlus size={14} />
  </button>

</div>
  
  <span className="text-green-600 text-sm flex items-center gap-2">
    <span className="w-2 h-2 bg-green-600 rounded-full"></span>
    In stock — ships in 3–5 days
  </span>

</div>

       <div className="flex flex-col sm:flex-row gap-3 mt-4">
  <button
    onClick={notify}
    className="bg-[#E0B94B] w-full py-3 rounded-lg font-medium text-sm"
  >
    Add to cart
  </button>

  <button
    onClick={buyNow}
    className="bg-[#1f3b57] text-white w-full py-3 rounded-lg font-medium text-sm"
  >
    Buy now
  </button>
</div>


            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">

        <div className="flex items-center gap-3 bg-[#f5efe0] border border-[#e6decf] rounded-lg p-4">
          <FiShield className="text-[#1f3b57]" size={20} />
          <div className="text-xs">
            <p className="font-medium text-gray-800">Authentic</p>
            <p className="text-gray-500">GI-tagged product</p>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-[#f5efe0] border border-[#e6decf] rounded-lg p-4">
          <FiTruck className="text-[#1f3b57]" size={20} />
          <div className="text-xs">
            <p className="font-medium text-gray-800">Free shipping</p>
            <p className="text-gray-500">Orders over ₹1,999</p>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-[#f5efe0] border border-[#e6decf] rounded-lg p-4">
          <FiRotateCcw className="text-[#1f3b57]" size={20} />
          <div className="text-xs">
            <p className="font-medium text-gray-800">Easy returns</p>
            <p className="text-gray-500">15-day return policy</p>
          </div>
        </div>

      </div>

   
      <div className="border-b border-[#e6decf] my-6"></div>

          <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center text-left"
      >
        <h3 className="font-semibold text-gray-800">
          Product details
        </h3>

        {open ? (
          <FiChevronUp className="text-gray-600" />
        ) : (
          <FiChevronDown className="text-gray-600" />
        )}
      </button>

  
      {open && (
        <div
          className="mt-4 text-sm text-gray-600 leading-relaxed
                     [&_p]:mb-2
                     [&_strong]:font-semibold
                     [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1"
          dangerouslySetInnerHTML={{
            __html: product?.specification || product?.details || "",
          }}
        />
      )}

          </div>
        </div>

        <ReviewSection/>

      </Wrapper>
      <RelatedProducts products={related.products} />
  
    </section>
  );
}