"use client";
import React, { useEffect, useState } from "react";
import Pagination from "@/components/ShopbyCategory/Pagination";
import apiClient from "@/api/client";
import Loader from "@/components/loader/Loader";
import NewProducts from "@/components/BestSellers/NewProducts";
import BestSellingCraftCard from "./../../components/BestSellers/BestSellingCraftCard";

const Page = () => {
  const [products, setProducts] = useState([]);



  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  //pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState();

  useEffect(() => {
    fetchProducts();
  }, [currentPage]);

  const fetchProducts = async () => {
    try {
      const response = await apiClient.get("product/get-new-arrival", {
        pageNumber: currentPage,
      });

      if (response.ok) {
        setProducts(response.data.products);
        setPageSize(response.data.pageCount);
      } else {
        setError(response.statusText);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="max-w-screen-xl mx-auto px-4 bg-bg-light sm:px-6 lg:px-8 pb-16 pt-4">
      <div className="w-full pb-10 mt-5">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-1.5 sm:gap-3">
          {products.length === 0 ? (
            <p className="col-span-full text-center text-lg text-gray-500">
              No products found
            </p>
          ) : (
            products?.map((product) => (
              <div key={product._id} className="w-full">
                {/* <BestSellerCard2 product={product.productDetails || product} /> */}
                  <BestSellingCraftCard
              key={product?._id}
              product={product}
            />
              </div>
            ))
          )}
        </div>
      </div>

      {pageSize > 1 && (
        <div className="mt-8">
          <Pagination
            count={pageSize}
            page={currentPage}
            siblingCount={1}
            onChange={(e, value) => setCurrentPage(value)}
          />
        </div>
      )}
    </div>
  );
};

export default Page;
