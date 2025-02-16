"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";
import ProductCard from "./ProductCard";
import { getProducts } from "@/actions/user/product";

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  active: boolean;
  imageUrl?: string;
  quantity: number;
  category?: { name: string };
}

export default  function ProductSection() {
  const [index, setIndex] = useState(0);

  const [products, setProducts] = useState<Product[]>([]);

  const prevSlide = () => {
    setIndex((prev) => (prev === 0 ? products.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setIndex((prev) => (prev === products.length - 1 ? 0 : prev + 1));
  };

  React.useEffect(() => {
    const fetchData = async () => {
      const data = await getProducts();
      setProducts(data);
    };
    fetchData();
  }, []);

  if (products.length === 0) return <p>No product available</p>;

  
  return (
    <section className="relative w-full py-16 px-6 md:px-12 lg:px-20">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">Latest Products</h2>

      <div className="relative flex items-center justify-center">
        {/* Left Button */}
        <button
          onClick={prevSlide}
          className="absolute left-0 z-10 p-3 bg-white shadow-lg rounded-full hover:bg-gray-100 transition"
        >
          <ChevronLeft className="w-6 h-6 text-gray-700" />
        </button>

        {/* Product Cards */}
        <div className="w-full max-w-3xl flex overflow-hidden">
          <AnimatePresence mode="wait">
            {products.slice(index, index + (window.innerWidth < 640 ? 1 : 2)).map((product) => (
              <motion.div
                key={product.id}
                className="w-full sm:w-1/2 flex-shrink-0 px-3"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
              >
                 <ProductCard key={product.id} product={product} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Right Button */}
        <button
          onClick={nextSlide}
          className="absolute right-0 z-10 p-3 bg-white shadow-lg rounded-full hover:bg-gray-100 transition"
        >
          <ChevronRight className="w-6 h-6 text-gray-700" />
        </button>
      </div>
    </section>
  );
}
