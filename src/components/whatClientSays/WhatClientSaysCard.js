"use client";

import { Star } from "lucide-react";

const WhatClientSaysCard = ({ data }) => {
  return (
    <div className="bg-[#11263D] border border-white/10 rounded-2xl p-6 text-left h-full flex flex-col justify-between hover:shadow-lg transition">
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={14} className="fill-[#C8A96A] text-[#C8A96A]" />
        ))}
      </div>

      <p className="text-gray-300 text-sm leading-relaxed mb-6 italic">
        “{data.message}”
      </p>

      <div className="border-t border-white/10 mb-4"></div>

      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-[#1E3A5F] flex items-center justify-center text-xs text-white font-medium">
          {data.initials}
        </div>

        <div>
          <p className="text-sm text-white font-medium">{data.name}</p>
          <p className="text-xs text-gray-400">{data.location}</p>
        </div>
      </div>
    </div>
  );
};

export default WhatClientSaysCard;
