import React from "react";
import { FaHandsHelping, FaMoneyBillWave } from "react-icons/fa";
import { GiIndianPalace } from "react-icons/gi";
import { MdSupportAgent } from "react-icons/md";

const services = [
  {
    icon: <FaHandsHelping className="w-8 h-8 text-primary" />,
    title: "100% Handmade",
    description: "Every curve and edge shaped with heartfelt attention",
  },
  {
    icon: <GiIndianPalace className="w-8 h-8 text-primary" />,
    title: "Made in India",
    description: "Proudly handmade in India, where tradition meets.",
  },
  {
    icon: <FaMoneyBillWave className="w-8 h-8 text-primary" />,
    title: "Cash on Delivery",
    description: "No upfront payments—get it first, pay with Cash on Delivery",
  },
  {
    icon: <MdSupportAgent className="w-8 h-8 text-primary" />,
    title: "Quick Support",
    description: "Our team is just a message away. Get instant support",
  },
];

const ServiceGrid = () => {
  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      {/* Mobile: horizontal scroll | Desktop: grid */}
      <div className="flex gap-4 overflow-x-auto sm:grid sm:grid-cols-4 sm:gap-6 scrollbar-hide">
        {services.map((service, index) => (
          <div
            key={index}
            className="min-w-[200px] sm:min-w-0 bg-white border-2 rounded-lg shadow hover:shadow-lg transition-shadow duration-300 p-4 text-center cursor-pointer flex-shrink-0"
          >
            <div className="flex justify-center mb-3">{service.icon}</div>
            <h4 className="text-sm font-semibold">{service.title}</h4>
            <p className="text-gray-600 text-xs mt-1">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceGrid;
