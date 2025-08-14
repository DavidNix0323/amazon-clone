"use client";
import React, { useEffect, useRef, useState } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { MdOutlineClose } from "react-icons/md";
import { fetchData } from "@/hooks/fetchter";
import { Product } from "@/type";
import SearchResultCard from "@/components/SearchResultCard";

const SearchInput = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const searchContainerRef = useRef(null);

  useEffect(() => {
    const getData = async () => {
      const endpoint = "https://dummyjson.com/products";
      try {
        const data = await fetchData(endpoint);
        setProducts(data?.products);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    const filtered = products.filter((item: Product) =>
      item?.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchQuery, products]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        // @ts-ignore
        !searchContainerRef.current.contains(event.target)
      ) {
        setIsInputFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={searchContainerRef}
      className="flex-1 h-10 mx-4 hidden md:inline-flex items-center justify-between relative"
    >
      <input
        className="w-full h-full rounded-md px-2 placeholder:text-sm text-base text-black border-[3px] border-transparent outline-none focus-visible:border-amazonOrange"
        type="text"
        onChange={(e) => setSearchQuery(e.target.value)}
        value={searchQuery}
        placeholder="Search amazon"
        onFocus={() => setIsInputFocused(true)}
      />
      {searchQuery && (
        <MdOutlineClose
          onClick={() => setSearchQuery("")}
          className="text-xl text-amazonLight hover:text-red-600 absolute right-14 duration-200 cursor-pointer"
        />
      )}
      <span className="w-12 h-full bg-amazonOrange hover:bg-amazonOrangeDark duration-200 cursor-pointer text-black text-2xl flex items-center justify-center absolute right-0 rounded-tr-md rounded-br-md">
        <HiOutlineSearch />
      </span>

      {/* Search Results Dropdown */}
      {isInputFocused && searchQuery && (
        <div className="absolute left-0 top-12 w-full mx-auto h-auto max-h-96 bg-white rounded-md overflow-y-scroll cursor-pointer text-black z-50">
          {filteredProducts.length > 0 ? (
            <div className="flex flex-col">
              {filteredProducts.map((item: Product) => (
                <SearchResultCard
                  key={item.id}
                  product={item}
                  onSelect={() => setSearchQuery("")}
                />
              ))}
            </div>
          ) : (
            <div className="py-10 px-5">
              <p className="text-base">
                Nothing matched with{" "}
                <span className="font-semibold underline underline-offset-2 decoration-[1px]">
                  {searchQuery}
                </span>{" "}
                please try again.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchInput;
