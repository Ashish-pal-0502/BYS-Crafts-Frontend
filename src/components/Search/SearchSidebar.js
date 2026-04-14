"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { ScrollArea } from "../ui/scroll-area";
import apiClient from "@/api/client";
import Link from "next/link";
import { Search, X } from "lucide-react";

const SearchSidebar = ({ isOpen, setIsOpen }) => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    if (!search || search.trim().length < 1) {
      setResults([]);
      return;
    }

    try {
      const { data } = await apiClient.get("/product/search-product", {
        Query: search,
      });

      const filtered = data?.filter((product) =>
        product?.name?.toLowerCase().includes(search.toLowerCase())
      );

      setResults(filtered);
    } catch (err) {
      console.error("Search error:", err);
      setResults([]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch();
  };

  const handleClear = () => {
    setSearch("");
    setResults([]);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className="bg-bg-light w-full lg:max-w-[500px]">
        {/* Search bar */}
        <form
          onSubmit={handleSubmit}
          className="flex items-center justify-between mt-5 border-b pb-4 border-gray-500"
        >
          {/* Search button */}
          <button
            type="submit"
            className="relative h-5 w-5 cursor-pointer flex-shrink-0"
          >
            <Image src="/search.svg" alt="search" fill priority />
          </button>

          {/* Input */}
          <input
            className="flex-1 ml-2 text-sm sm:font-medium border-none appearance-none py-1 px-2 bg-transparent text-black focus:outline-none"
            type="search"
            name="q"
            placeholder="What are you looking for?"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* Clear button */}
          {search && (
            <button
              type="button"
              onClick={handleClear}
              className="relative h-5 w-5 flex-shrink-0 text-gray-500 hover:text-black transition"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </form>

        {/* No results */}
        {results.length === 0 && search?.length > 0 && (
          <div className="text-center h-screen flex flex-col items-center justify-center text-lg">
            No results could be found
          </div>
        )}

        {/* Results */}
        {results.length > 0 && (
          <div className="mt-2">
            <ScrollArea className="h-[calc(100vh-150px)] overflow-y-auto">
              {results.map((result) => {
                const slugify = (text) =>
                  text
                    .toLowerCase()
                    .replace(/ /g, "-")
                    .replace(/[^\w-]+/g, "");

                const productSlug = slugify(result.name);
                return (
                  <div key={result._id}>
                    <ul className="mt-1 text-[15px]">
                      <li>
                        <Link
                          href={`/product/${productSlug}/${result._id}`}
                          onClick={handleCloseModal}
                        >
                          <div className="flex w-full items-center gap-2 py-2">
                            <div
                              className="h-[80px] w-[80px] rounded-md bg-cover bg-center bg-no-repeat hover:scale-105 transition-all duration-500 cursor-pointer"
                              style={{
                                backgroundImage: `url(${result.image[0]})`,
                              }}
                            />
                            <div className="block p-2 ml-2 rounded-lg font-normal sm:text-base text-black">
                              <div className="p-1">{result.name}</div>
                              <div className="p-1">₹ {result.sell_price}</div>
                            </div>
                          </div>
                        </Link>
                      </li>
                    </ul>
                  </div>
                );
              })}
            </ScrollArea>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default SearchSidebar;
