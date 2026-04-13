

"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import BestSellingCraftCard from "../BestSellers/BestSellingCraftCard";

const RelatedProducts = ({ products = [] }) => {
  const swiperRef = useRef(null);

  const enoughForNav = products.length > 4;

  return (
    <section className="py-10 bg-[#F5EFE0]">
      <div className="max-w-6xl mx-auto px-4">

        <div className="flex items-center justify-between mb-10 flex-wrap gap-4">
          <div>
            <p className="text-xs tracking-widest text-[#C8A96A] uppercase mb-2">
              You may also like
            </p>

            <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900">
              Related Products
            </h2>
          </div>

          <Link
            href="/products"
            className="flex items-center gap-2 border border-gray-400 px-4 py-2 rounded-lg text-sm hover:bg-black hover:text-white transition"
          >
            View all products
            <ArrowRight size={16} />
          </Link>
        </div>

       
        <div className="relative">

       
          {enoughForNav && (
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              className="hidden md:flex absolute -left-4 top-1/2 -translate-y-1/2 z-20 h-10 w-10 items-center justify-center rounded-full bg-white shadow"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          )}

          <Swiper
            modules={[Navigation]}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            loop={products.length > 4}
            spaceBetween={20}
            slidesPerView={2}
            breakpoints={{
              640: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
            }}
          >
            {products?.map((product) => (
              <SwiperSlide key={product._id}>
                <BestSellingCraftCard
                  product={
                    product.productDetails
                      ? product.productDetails
                      : product
                  }
                />
              </SwiperSlide>
            ))}
          </Swiper>

          {enoughForNav && (
            <button
              onClick={() => swiperRef.current?.slideNext()}
              className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-20 h-10 w-10 items-center justify-center rounded-full bg-white shadow"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default RelatedProducts;