"use client"

import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";

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

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const { addToCart } = useAuth();

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
    >
      <Link href={`/product/${product.id}`} className="block">
        <div className="relative h-64 group">
          {product.imageUrl ? (
            <>
              <Image
                src={`${backendUrl}${product.imageUrl}`}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </>
          ) : (
            <div className="h-full flex items-center justify-center bg-gray-100">
              <p className="text-gray-500 font-medium">No image available</p>
            </div>
          )}
          <motion.div
            className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md"
            whileHover={{ scale: 1.1 }}
          >
            <span className="text-sm font-bold text-indigo-600">
              ${product.price.toFixed(2)}
            </span>
          </motion.div>
        </div>

        <div className="p-5">
          <h3 className="font-semibold text-lg mb-2 text-gray-800">{product.name}</h3>
          <p className="text-gray-600 text-sm line-clamp-2 mb-4">
            {product.description}
          </p>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.preventDefault();
              addToCart(product.id, product.price, 1);
            }}
            className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg transition-colors"
          >
            <ShoppingCart size={20} />
            Add to Cart
          </motion.button>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;