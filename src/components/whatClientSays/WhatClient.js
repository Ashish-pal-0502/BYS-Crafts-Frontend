"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import WhatClientSaysCard from "./WhatClientSaysCard";

const data = [
  {
    name: "Priya Sharma",
    location: "Mumbai, Maharashtra",
    initials: "PS",
    message:
      "The Pashmina shawl I ordered is exquisite. The packaging included a handwritten note from the artisan in Kashmir. This is how shopping should feel.",
  },
  {
    name: "Arjun Kapoor",
    location: "Toronto, Canada",
    initials: "AK",
    message:
      "I bought the Dokra jewelry set as a gift and it was a huge hit. The craftsmanship is remarkable — you can tell these are made by skilled hands, not machines.",
  },
  {
    name: "Riya Mehra",
    location: "Bengaluru, Karnataka",
    initials: "RM",
    message:
      "Finally found a brand that cares about artisans as much as aesthetics. The block-print cushion covers are now the centerpiece of our living room.",
  },
];

const WhatClient = () => {
  return (
    <section className="bg-[#0F1E2F] py-16 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-xs tracking-[0.25em] text-[#C8A96A] uppercase mb-3">
          What our customers say
        </p>

        <h2 className="text-2xl sm:text-4xl font-semibold text-white">
          Loved across India & beyond
        </h2>

        <p className="mt-4 text-gray-400 max-w-2xl mx-auto text-sm sm:text-base">
          Real stories from people who brought a piece of Indian craft into
          their homes
        </p>

        <div className="mt-12">
          <Swiper
            modules={[Autoplay]}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            spaceBetween={20}
            breakpoints={{
              0: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {data.map((item, index) => (
              <SwiperSlide key={index}>
                <WhatClientSaysCard data={item} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default WhatClient;
