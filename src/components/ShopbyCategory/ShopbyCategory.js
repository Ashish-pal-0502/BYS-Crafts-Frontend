"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import ShopCategoryCard from "./ShopCategoryCard";
import apiClient from "@/api/client";

const ShopbyCategory = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch category data from the API
    const fetchCategories = async () => {
      try {
        const response = await apiClient.get("/variation/category/get");
        if (response.ok) {
          // const data = await response.json();
          const data = response.data;
          setCategories(data);
        } else {
          console.error("Failed to fetch categories:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <section>
      <div className="max-w-screen-lg mx-auto">
        {/* <h3 className="text-center text-3xl md:text-4xl mb-11 mt-11 font-medium"> */}
        <p className="  font-semibold text-center md:text-4xl mb-11 mt-11">
          Shop by category
        </p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-10 lg:mt-10 px-3 lg:px-0 place-items-center place-content-center">
          {/* {categories.map((category) => (
            <ShopCategoryCard key={category.id} category={category} />
          ))} */}
          <ShopCategoryCard categories={categories} />
        </div>
      </div>
      <div className="mt-20">
        <Link href="/category">
          <button className="btn btn-accent rounded-lg mx-auto mt-10">
            See all
          </button>
        </Link>
      </div>
    </section>
  );
};

export default ShopbyCategory;
