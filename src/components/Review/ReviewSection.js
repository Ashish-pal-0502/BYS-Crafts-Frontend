"use client";

import React from "react";

import ReviewCard from './../Cards/ReviewCard';

const ReviewSection = () => {

  const reviews = [
    {
      name: "Priya Sharma",
      date: "March 15, 2026",
      rating: 5,
      text: "Absolutely stunning piece! The indigo color is rich and deep, and the block print pattern is so intricate. You can tell it’s truly handmade. The cotton quality is excellent too — soft but sturdy. Already ordered another one in the vermilion color for our guest room.",
    },
    {
      name: "Arjun Kapoor",
      date: "March 8, 2026",
      rating: 5,
      text: "Bought this as a housewarming gift and the receiver loved it. The packaging is premium — comes in a handmade cloth pouch with the artisan’s note. Makes a meaningful gift that supports real craftspeople.",
    },
    {
      name: "Riya Mehra",
      date: "February 12, 2026",
      rating: 4,
      text: "Beautiful print and great quality. Only giving 4 stars because delivery took 7 days instead of the promised 3–5. But the product itself is gorgeous and worth the wait.",
    },
  ];

  const ratingData = [
    { label: "5 ★", value: 100 },
    { label: "4 ★", value: 13 },
    { label: "3 ★", value: 4 },
    { label: "2 ★", value: 1 },
    { label: "1 ★", value: 1 },
  ];

  return (
    <section className="bg-[#faf6ed] py-10 px-4 sm:px-8 lg:px-10">

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        <div>
          <p className="text-xs tracking-widest text-[#C8A96A] uppercase">
            Customer Reviews
          </p>
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#1E2A38] mt-1">
            What buyers are saying
          </h2>
        </div>

        <button className="border border-[#1E2A38] px-4 py-2 text-sm rounded-md hover:bg-[#1E2A38] hover:text-white transition">
          Write a review
        </button>
      </div>

      <div className="bg-[#EFE7D6] border border-[#E6DECF] rounded-xl p-6 mb-8">

        <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">

          <div>
            <h3 className="text-3xl font-semibold text-[#1E2A38]">
              4.9
            </h3>

            <div className="text-[#E0B94B] text-sm mt-1">
              ★★★★★
            </div>

            <p className="text-xs text-gray-500 mt-1">
              128 reviews
            </p>
          </div>

          <div className="flex-1 w-full space-y-2">
            {ratingData.map((item, index) => (
              <div key={index} className="flex items-center gap-3 text-xs">
                <span className="w-8">{item.label}</span>

                <div className="flex-1 h-2 bg-[#e6decf] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#E0B94B]"
                    style={{ width: `${item.value}%` }}
                  />
                </div>

                <span className="w-6 text-right">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-transparent">
        {reviews.map((review, index) => (
          <ReviewCard key={index} review={review} />
        ))}
      </div>

    </section>
  );
};

export default ReviewSection;