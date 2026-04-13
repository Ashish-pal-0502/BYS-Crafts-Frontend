"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import BestSellerCarousel from "./BestSellerCarousel";
import apiClient from "@/api/client";

const BestSellers = () => {
  const [error, setError] = useState(null);
  const [product, setProduct] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await apiClient.get("product/most-ordered-products");

      if (response.ok) {
        setProduct(response.data.mostOrderedProducts);
      } else {
        setError(response.status);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <section>
      <div className="mx-auto max-w-screen-xl px-4 pb-4 md:py-3 ">
        <p className="  text-2xl  font-semibold text-center md:text-4xl mb-11 mt-8">
          Best Sellers
        </p>

        <BestSellerCarousel products={product} />

        <div className="my-8">
          <Link href="/best-sellers">
            <button className="btn bg-[#6B6B6B] rounded-lg mx-auto mt-2 sm:mt-8">
              See all
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BestSellers;
