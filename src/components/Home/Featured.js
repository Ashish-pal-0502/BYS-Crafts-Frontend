// import apiClient from "@/api/client";
// import { Button } from "@/components/ui/lovable/button";
// import { useEffect, useRef, useState } from "react";
// import Link from "next/link";
// import BestSellerCard2 from "../BestSellers/BestSellerCard2";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Autoplay } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/navigation";
// import { ArrowRight, ChevronLeft, ChevronRight, Image } from "lucide-react";

// const FeaturedProducts = () => {
//   const [products, setProducts] = useState([]);
//   const swiperRef = useRef(null);

//   const fetchData = async () => {
//     try {
//       const response = await apiClient.get("/product/most-ordered-products");
//       if (response.ok) setProducts(response.data.mostOrderedProducts);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const enoughForNav = products.length > 1;

//   return (
//     <section className="py-5 bg-gradient-card ">
//       <div className="container max-w-screen-2xl mx-auto px-3 sm:px-4">
//         {/* Section Heading */}
//         <div className="mb-6 px-4 text-center sm:text-left">
//           <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-foreground tracking-tight">
//             Trending <span className="text-primary">Treasures</span>
//           </h2>
//           <p className="mt-2 text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto sm:mx-0">
//             Each piece in our collection carries the soul of Bundelkhand&apos;s
//             rich cultural heritage
//           </p>
//         </div>

//         {/* Swiper Slider */}
//         <div className="relative">
//           <Swiper
//             modules={[Navigation, Autoplay]}
//             onSwiper={(swiper) => (swiperRef.current = swiper)}
//             navigation={false} // hide default arrows
//             autoplay={{ delay: 4000, disableOnInteraction: false }}
//             loop={products.length > 4}
//             spaceBetween={5}
//             slidesPerView={2} //   2 cards per view on mobile
//             breakpoints={{
//               640: { slidesPerView: 2, spaceBetween: 2 }, // mobile
//               768: { slidesPerView: 3, spaceBetween: 20 }, // tablet
//               1024: { slidesPerView: 4, spaceBetween: 24 }, // desktop
//             }}
//           >
//             {products?.slice(0, 6).map((product) => (
//               <SwiperSlide key={product.productDetails._id}>
//                 <BestSellerCard2 product={product.productDetails} />
//               </SwiperSlide>
//             ))}
//           </Swiper>

//           {enoughForNav && (
//             <button
//               onClick={() => swiperRef.current?.slidePrev()}
//               aria-label="Previous"
//               className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-20 h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow hover:bg-white focus:outline-none"
//             >
//               <ChevronLeft className="h-5 w-5" />
//             </button>
//           )}

//           {enoughForNav && (
//             <button
//               onClick={() => swiperRef.current?.slideNext()}
//               aria-label="Next"
//               className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-20 h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow hover:bg-white focus:outline-none"
//             >
//               <ChevronRight className="h-5 w-5" />
//             </button>
//           )}
//         </div>

//         {/* View All Button */}
//         <Link
//           href="/new-arrivals"
//           className="flex items-center justify-center gap-2 mt-10 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
//         >
//           <span>View All</span>
//           <ArrowRight className="w-4 h-4" />
//         </Link>
//       </div>
//     </section>
//   );
// };

// export default FeaturedProducts;
"use client";
import apiClient from "@/api/client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import BestSellerCard2 from "../BestSellers/BestSellerCard2";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { ArrowRight } from "lucide-react";

const FeaturedProducts = () => {
  // const [products, setProducts] = useState([]);
  const swiperRef = useRef(null);

  const products = [
    {
      totalOrdered: 8,
      _id: "p1",
      productDetails: {
        _id: "p1",
        name: "Handcrafted Wooden Table Decor",
        image: [
          "https://images.pexels.com/photos/6585750/pexels-photo-6585750.jpeg?auto=compress&w=800",
        ],
        category: "wooden-toy",
        artisanInfo: {
          artisan: "a1",
          artisanDescription: "Expert wood artisan",
        },
        description: "<p>Beautiful handcrafted wooden decor item.</p>",
        details: "<p>Made with premium wood and fine finish.</p>",
        specification: "<ul><li>Eco-friendly</li><li>Handmade</li></ul>",
        rating: 4,
        sell_price: 799,
        discount: 10,
        reviews: [],
        dimension: "10x5 inches",
        finish: "Matte polish",
        material: "Natural Wood",
      },
    },

    {
      totalOrdered: 5,
      _id: "p2",
      productDetails: {
        _id: "p2",
        name: "Minimal Ceramic Vase",
        image: [
          "https://images.pexels.com/photos/4207892/pexels-photo-4207892.jpeg?auto=compress&w=800",
        ],
        category: "ceramics",
        artisanInfo: {
          artisan: "a2",
          artisanDescription: "Ceramic artist",
        },
        description: "<p>Minimal modern ceramic vase.</p>",
        details: "<p>Perfect for home decor and gifting.</p>",
        specification: "<ul><li>Modern design</li></ul>",
        rating: 4,
        sell_price: 899,
        discount: 5,
        reviews: [],
        dimension: "8 inches",
        finish: "Glossy",
        material: "Ceramic",
      },
    },

    {
      totalOrdered: 6,
      _id: "p3",
      productDetails: {
        _id: "p3",
        name: "Abstract Wall Painting",
        image: [
          "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&w=800",
        ],
        category: "chitkari-painting",
        artisanInfo: {
          artisan: "a3",
          artisanDescription: "Folk artist",
        },
        description: "<p>Modern abstract handmade painting.</p>",
        details: "<p>Enhances your living space.</p>",
        specification: "<ul><li>Canvas based</li></ul>",
        rating: 5,
        sell_price: 1499,
        discount: 12,
        reviews: [],
        dimension: "12x12 inch",
        finish: "Hand-painted",
        material: "Canvas",
      },
    },

    {
      totalOrdered: 3,
      _id: "p4",
      productDetails: {
        _id: "p4",
        name: "Handmade Leather Wallet",
        image: [
          "https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg?auto=compress&w=800",
        ],
        category: "leather-craft",
        artisanInfo: {
          artisan: "a4",
          artisanDescription: "Leather craftsman",
        },
        description: "<p>Premium leather wallet.</p>",
        details: "<p>Durable and stylish.</p>",
        specification: "<ul><li>Genuine leather</li></ul>",
        rating: 4,
        sell_price: 699,
        discount: 8,
        reviews: [],
        dimension: "Standard",
        finish: "Smooth",
        material: "Leather",
      },
    },

    {
      totalOrdered: 7,
      _id: "p5",
      productDetails: {
        _id: "p5",
        name: "Decorative Metal Candle Holder",
        image: [
          "https://images.pexels.com/photos/1128318/pexels-photo-1128318.jpeg?auto=compress&w=800",
        ],
        category: "metalwork",
        artisanInfo: {
          artisan: "a5",
          artisanDescription: "Metal craft artist",
        },
        description: "<p>Elegant metal candle holder.</p>",
        details: "<p>Perfect for home decoration.</p>",
        specification: "<ul><li>Rust resistant</li></ul>",
        rating: 4,
        sell_price: 999,
        discount: 15,
        reviews: [],
        dimension: "6 inches",
        finish: "Antique",
        material: "Metal",
      },
    },

    {
      totalOrdered: 4,
      _id: "p6",
      productDetails: {
        _id: "p6",
        name: "Handmade Jewellery Set",
        image: [
          "https://images.pexels.com/photos/1927259/pexels-photo-1927259.jpeg?auto=compress&w=800",
        ],
        category: "artificial-jewellery",
        artisanInfo: {
          artisan: "a6",
          artisanDescription: "Jewellery designer",
        },
        description: "<p>Elegant handmade jewellery set.</p>",
        details: "<p>Perfect for weddings and occasions.</p>",
        specification: "<ul><li>Lightweight</li></ul>",
        rating: 5,
        sell_price: 1299,
        discount: 20,
        reviews: [],
        dimension: "Free size",
        finish: "Glossy",
        material: "Alloy",
      },
    },
  ];

  useEffect(() => {
    apiClient
      .get("/product/most-ordered-products")
      .then((res) => {
        // if (res.ok) setProducts(res.data.mostOrderedProducts);
      })
      .catch(console.error);
  }, []);

  return (
    <section className="py-16 bg-[#faf7f2]">
      <div className="max-w-screen-2xl mx-auto px-4">
        {/* 🔥 HEADING */}
        <div className="text-center mb-12">
          <p className="text-xs tracking-widest text-gray-500 uppercase mb-2">
            BYS Crafts Collection
          </p>

          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Trending Right Now
          </h2>

          <p className="mt-3 text-gray-600 max-w-xl mx-auto text-sm sm:text-base">
            Handpicked pieces loved by our customers — crafted to bring warmth,
            beauty, and character into your space.
          </p>
        </div>

        {/* 🔥 SLIDER */}
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          loop={true}
          spaceBetween={20}
          slidesPerView={2}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
        >
          {products?.slice(0, 8).map((product) => (
            <SwiperSlide key={product.productDetails._id}>
              <BestSellerCard2 product={product.productDetails} />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* CTA */}
        <div className="flex justify-center mt-12">
          <Link
            href="/new-arrivals"
            className="flex items-center gap-2 px-6 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition"
          >
            Explore All
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
