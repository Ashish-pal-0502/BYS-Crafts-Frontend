"use client";
import React from "react";
import { Star } from "lucide-react";
import { CheckCircle } from "lucide-react";

const ReviewCard = ({ review }) => {
  return (
    <div className="py-6 border-b border-[#e6decf]">

      <div className="flex items-center justify-between">

        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#d8d8d8] flex items-center justify-center text-xs font-medium text-gray-700">
            {review.name
              .split(" ")
              .map((w) => w[0])
              .join("")
              .slice(0, 2)}
          </div>

          <div>
            <p className="text-sm font-medium text-gray-900">
              {review.name}
            </p>
            <p className="text-xs text-gray-500">
              {review.date}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1 text-[#E0B94B]">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={14}
              fill={i < review.rating ? "#E0B94B" : "none"}
              stroke="#E0B94B"
            />
          ))}
        </div>
      </div>

      <p className="text-sm text-gray-700 mt-3 leading-relaxed">
        {review.text}
      </p>

      <div className="flex items-center gap-2 mt-3 text-xs text-green-600">
        <CheckCircle size={14} />
        Verified purchase
      </div>
    </div>
  );
};

export default ReviewCard;