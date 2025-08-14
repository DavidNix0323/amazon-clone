import React, { useState } from "react";
import Link from "next/link";
import { Product } from "@/type";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";
import { BsCartPlus } from "react-icons/bs";

interface Props {
  product: Product;
  onSelect: () => void;
}

const SearchResultCard = ({ product, onSelect }: Props) => {
  const [imgLoaded, setImgLoaded] = useState(false);
  const discount = product.discountPercentage || 0;
  const rating = product.rating || 4.5;

  const handleAddToCart = (product: Product) => {
    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
    const updatedCart = [...existingCart, product];
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    alert(`${product.title} added to cart!`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      <Link
        href={{
          pathname: `/product/${product.id}`,
          query: { id: product.id },
        }}
        onClick={onSelect}
        className="flex items-center gap-4 px-3 py-2 hover:bg-lightText/30 transition-all relative"
      >
        {/* Discount Badge */}
        {discount > 0 && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded z-10">
            -{discount.toFixed(0)}%
          </span>
        )}

        {/* Image with shimmer */}
        <div className="relative w-16 h-16 shrink-0 overflow-visible">
          {!imgLoaded && (
            <div className="absolute inset-0 bg-gray-300 animate-pulse rounded-md" />
          )}
          <img
            src={product.thumbnail || product.images?.[0]}
            alt={product.title}
            className={`w-16 h-16 object-cover rounded-md transition-opacity duration-300 ${
              imgLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setImgLoaded(true)}
          />
        </div>

        {/* Info */}
        <div className="flex flex-col flex-grow">
          <p className="text-sm font-semibold line-clamp-1">{product.title}</p>
          <p className="text-xs text-gray-500">{product.category}</p>
          <div className="flex items-center gap-1">
            <p className="text-sm font-bold text-amazonBlue">${product.price}</p>
            <div className="flex items-center ml-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <FaStar
                  key={i}
                  className={`text-xs ${
                    i < Math.round(rating) ? "text-yellow-400" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Quick Add */}
        <button
          type="button"
          className="ml-auto p-2 rounded-full hover:bg-gray-200 transition"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleAddToCart(product);
          }}
        >
          <BsCartPlus className="text-lg text-gray-600" />
        </button>
      </Link>
    </motion.div>
  );
};

export default SearchResultCard;
