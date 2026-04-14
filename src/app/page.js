"use client";

import BlogHero from "@/components/Blog/BlogHero";
import Loader from "@/components/loader/Loader";
import NewArrivals from "@/components/NewArrivals/NewArrivals";
import { useEffect, useState } from "react";
import BestSellingCraftHome from "./../components/BestSellers/BestSellingCraftHome";
import Hero from "../components/Hero/Hero";
import WhatClient from "./../components/whatClientSays/WhatClient";
import ShopByCategory from "./../components/Home/ShopByCategory";

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setInterval(() => setLoading(false), 500);
  }, []);

  if (loading) {
    return (
      <div className="h-screen">
        <Loader />
        
      </div>
    );
  }

  return (
    <div className="bg-white">
      <div className="relative">
        <Hero />
        <ShopByCategory />
        <BestSellingCraftHome />
      </div>
      <WhatClient />
      <NewArrivals />
      <BlogHero />
    </div>
  );
}
