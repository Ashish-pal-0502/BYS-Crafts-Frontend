"use client";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import apiClient from "@/api/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { ChevronLeft, ChevronRight } from "lucide-react"; // nice arrow icons

// Custom arrow components
const NextArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute top-1/2 right-4 z-10 -translate-y-1/2 bg-white/80 hover:bg-white shadow-md rounded-full p-2"
  >
    <ChevronRight className="w-5 h-5 text-gray-800" />
  </button>
);

const PrevArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute top-1/2 left-4 z-10 -translate-y-1/2 bg-white/80 hover:bg-white shadow-md rounded-full p-2"
  >
    <ChevronLeft className="w-5 h-5 text-gray-800" />
  </button>
);

const Banner = () => {
  const [banner, setBanner] = useState([]);
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 768 : false,
  );

  const staticBanners = [
    {
      _id: "1",
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070",
      category: "home-decor",
    },
    {
      _id: "2",
      image:
        "https://images.unsplash.com/photo-1618220179428-22790b461013?q=80&w=2070",
      category: "handmade",
    },

    {
      _id: "3",
      image:
        "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=2070",
      category: "pottery",
    },
  ];

  const router = useRouter();

  const mobileDummyBanners = [
    {
      _id: "m1",
      image:
        "https://www.natriel.com/cdn/shop/files/wooden_art_banners.png?v=1752742157&width=600",
    },
    {
      _id: "m2",
      image:
        "https://www.natriel.com/cdn/shop/files/blue_potter2_1.png?v=1747031242&width=600",
    },
  ];

  var settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    pauseOnHover: false,
    arrows: true, // enable arrows
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    speed: 1000, // 1s slide animation (slower transition)
    autoplaySpeed: 5000, // 5s delay between slides
  };

  useEffect(() => {
    if (!isMobile) {
      bannerHandler();
    } else {
      setBanner(mobileDummyBanners);
    }
  }, [isMobile]);

  const bannerHandler = async () => {
    try {
      const { data } = await apiClient.get("/variation/banner/get");
      setBanner(data);
    } catch (err) {
      console.error("Banner fetch failed", err);
    }
  };

  const slugify = (text) =>
    text
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");

  const handleClick = (item) => {
    if (item.product) {
      const productSlug = slugify(item.productName);
      router.push(`/product/${productSlug}/${item.product}`);
    } else if (item.category) {
      router.push(`/category/${item.category}`);
    }
  };

  return (
    <div className="w-full relative overflow-hidden">
      <Slider {...settings}>
        {staticBanners?.map((item) => (
          <div key={item._id} className="cursor-pointer">
            <Image
              alt="staticBanners"
              src={item.image}
              height={1200}
              width={2000}
              className="w-full sm:h-[400px] object-cover"
              onClick={() => handleClick(item)}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Banner;
