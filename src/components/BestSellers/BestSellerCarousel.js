"use client";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { useEffect, useRef, useState } from "react";
import BestSellerCard2 from "./BestSellerCard2";
import Slider from "react-slick";
import { Toaster } from "react-hot-toast";

const BestSellerCarousel = ({ products }) => {
  const [isMobileView, setIsMobileView] = useState(false);
  const sliderRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1.25,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: "15px", // adds space left/right
        },
      },
    ],
  };

  return (
    <>
      {isMobileView ? (
        <div className="px-4">
          {" "}
          {/* Horizontal padding on mobile */}
          <Slider {...settings}>
            {products?.map((product) => (
              <div key={product._id} className="px-2">
                {" "}
                {/* spacing between slides */}
                <BestSellerCard2
                  product={
                    product.productDetails ? product.productDetails : product
                  }
                />
              </div>
            ))}
          </Slider>
        </div>
      ) : (
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => {
              if (sliderRef.current?.swiper) {
                sliderRef.current.swiper.slidePrev();
              }
            }}
            className="hover:drop-shadow-md hover:bg-white p-2 rounded-lg transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
              />
            </svg>
          </button>

          <Swiper
            ref={sliderRef}
            slidesPerView={1}
            spaceBetween={30}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              960: { slidesPerView: 3 },
              1440: { slidesPerView: 3 },
            }}
            modules={[Pagination]}
            className="w-full mb-8"
          >
            {products?.map((product) => (
              <SwiperSlide key={product._id} className="flex justify-center">
                <BestSellerCard2
                  product={
                    product.productDetails ? product.productDetails : product
                  }
                />
              </SwiperSlide>
            ))}
          </Swiper>

          <button
            onClick={() => {
              if (sliderRef.current?.swiper) {
                sliderRef.current.swiper.slideNext();
              }
            }}
            className="hover:drop-shadow-md hover:bg-white p-2 rounded-lg transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
              />
            </svg>
          </button>
        </div>
      )}
      <Toaster position="bottom-right" />
    </>
  );
};

export default BestSellerCarousel;
