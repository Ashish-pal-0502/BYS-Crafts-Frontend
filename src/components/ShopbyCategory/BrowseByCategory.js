import { Card, CardContent } from "@/components/ui/lovable/card";
import { Badge } from "@/components/ui/lovable/badge";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import apiClient from "@/api/client";
import Image from "next/image";

const BrowseByDistricts = () => {
  const [districts, setDistricts] = useState([]);

  useEffect(() => {
    fetchDistricts();
  }, []);

  const fetchDistricts = async () => {
    try {
      const response = await apiClient.get("/district/get-all-districts");

      if (response.ok) {
        setDistricts(response.data.districts);
      } else {
        console.error("Failed to fetch districts:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching districts:", error.message);
    }
  };

  return (
    <section className="py-5 ">
      <div className="container max-w-screen-2xl mx-auto px-3 sm:px-4">
        <div className="mb-6 px-4 text-center sm:text-left">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-foreground tracking-tight">
            Shop by <span className="text-primary">Districts</span>
          </h2>
          <p className="mt-2 text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto sm:mx-0">
            Explore the unique craftsmanship from different districts of
            Bundelkhand, each with its own cultural heritage and artistic
            traditions.
          </p>
        </div>

        <div className="grid grid-cols-2 px-3 lg:px-0 lg:grid-cols-4 gap-2 lg:gap-5 w-full place-items-center">
          {districts?.map((district, i) => (
            <Link
              href={`/district/${district.name}`}
              key={district.name}
              className="w-full"
            >
              <div
                className="relative h-[190px] lg:h-[280px] bg-cover bg-center bg-no-repeat p-5 rounded-xl overflow-hidden group"
                style={{ backgroundImage: `url(${district.image})` }}
              >
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/30 transition duration-300"></div>
                <div className="absolute bottom-8 left-3 right-3 text-white text-sm lg:text-2xl font-semibold drop-shadow-md">
                  {district.name}
                </div>
              </div>
            </Link>
          ))}

          {/* Text Card */}
          <div className="w-full flex flex-col text-center p-4 sm:p-5 bg-warm-cream rounded-xl shadow-soft">
            <p className="font-semibold text-base sm:text-lg lg:text-2xl leading-snug">
              Discover Handcrafted Treasures from 7 Districts
            </p>
            <p className="font-medium text-xs sm:text-sm lg:text-lg mt-2 lg:mt-5 w-[90%] sm:w-3/4 mx-auto text-earth-brown leading-relaxed">
              Connect with Artisans & Explore More
            </p>
            <div className="mt-3 lg:mt-5 mx-auto">
              <a
                href="/"
                className="inline-flex items-center justify-center tracking-wide border-2 border-black rounded bg-accent px-5 sm:px-6 lg:px-12 py-2 lg:py-3 text-xs sm:text-sm font-bold text-black hover:text-white transition"
              >
                Explore
                <Image
                  src="/arrow.png"
                  height={10}
                  width={10}
                  className="ml-2 inline-block"
                  alt="explore-more"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrowseByDistricts;
