"use client"
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import Link from "next/link";

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
  const {addToCart} = useAuth();

  return (
    <Link href={`/product/${product.id}`} passHref>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl cursor-pointer transition duration-300">
        <div className="relative h-48 justify-center flex items-center ">
          {product.imageUrl &&
            <Image
              src={`${backendUrl}${product.imageUrl}`}
              alt={product.name}
              fill
              className="object-cover"
            />}
          {!product.imageUrl &&
            <p className="text-center text-gray-500 font-semibold">No image available</p>
          }

        </div>
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
          <p className="text-gray-600 text-sm mb-4">
            {product.description?.slice(0, 50)}...
          </p>
          <p className="text-indigo-600 font-bold">${product.price.toFixed(2)}</p>
        </div>
        <button className="w-full bg-indigo-600 text-white py-2 rounded-b-lg hover:bg-indigo-700 transition duration-300"
          onClick={(e) => {
            e.preventDefault();
            addToCart(product.id, 1);
          }}
        >
          Add to Cart
        </button>
      </div>
    </Link>
  );
};

export default ProductCard;