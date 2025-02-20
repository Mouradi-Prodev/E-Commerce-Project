"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { deleteProduct, getProducts } from "@/actions/product";

import { Edit, Plus, Trash } from "lucide-react";
import Image from "next/image";
import {
  Tooltip, TooltipProvider,
  TooltipTrigger,
  TooltipContent
} from "@radix-ui/react-tooltip";
import { Button } from "@heroui/react";

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

export default function ProductTable() {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      const data = await getProducts();
      console.log(data);
      setProducts(data);
      setLoading(false);
    }
    fetchData();
  }, []);

  const handleDelete = async (id: string) => {
    const success = await deleteProduct(id);
    if (success) {
      setProducts(products.filter((product) => product.id !== id));
    }
  };

  return (
    <motion.div
      className="p-8 bg-white rounded-xl shadow-2xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center mb-8">
        <motion.h2
          className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
          initial={{ x: -20 }}
          animate={{ x: 0 }}
        >
          Products Management
        </motion.h2>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            color="primary"
            className="gradient-shadow-blue px-6 py-2 rounded-lg"
            onPress={() => router.push("/admin/products/new")}
          >
            <Plus className="mr-2" size={20} />
            Add New Product
          </Button>
        </motion.div>
      </div>

      {loading ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex justify-center items-center h-64"
        >
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </motion.div>
      ) : (
        <motion.div
          className="overflow-hidden rounded-xl border border-gray-200"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-4 px-6 text-left text-sm font-semibold text-gray-600">Image</th>
                <th className="py-4 px-6 text-left text-sm font-semibold text-gray-600">Name</th>
                <th className="py-4 px-6 text-left text-sm font-semibold text-gray-600">Price</th>
                <th className="py-4 px-6 text-left text-sm font-semibold text-gray-600">Description</th>
                <th className="py-4 px-6 text-left text-sm font-semibold text-gray-600">Active</th>
                <th className="py-4 px-6 text-left text-sm font-semibold text-gray-600">Quantity</th>
                <th className="py-4 px-6 text-left text-sm font-semibold text-gray-600">Category</th>
                <th className="py-4 px-6 text-left text-sm font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products && products.length > 0 ? (
                products.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                    <motion.td className="py-4 px-6" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                      {product.imageUrl ? (
                        <motion.div whileHover={{ scale: 1.1 }} className="rounded-lg overflow-hidden">
                          <Image
                            src={`${backendUrl}${product.imageUrl}`}
                            alt={product.name}
                            width={60}
                            height={60}
                            className="object-cover rounded-lg"
                          />
                        </motion.div>
                      ) : (
                        <span className="text-gray-400">No Image</span>
                      )}
                    </motion.td>
                    <motion.td className="py-4 px-6 text-gray-900" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      {product.name}
                    </motion.td>
                    <motion.td className="py-4 px-6 text-gray-900" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      ${product.price.toFixed(2)}
                    </motion.td>
                    <motion.td className="py-4 px-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            {product.description?.length > 30
                              ? product.description.slice(0, 30) + "..."
                              : product.description}
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{product.description}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </motion.td>
                    <motion.td className="py-4 px-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      {product.active ? (
                        <span className="text-green-600 font-bold">Active</span>
                      ) : (
                        <span className="text-red-500 font-bold">Inactive</span>
                      )}
                    </motion.td>
                    <motion.td className="py-4 px-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      {product.quantity}
                    </motion.td>
                    <motion.td className="py-4 px-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      {product.category?.name ?? "Uncategorized"}
                    </motion.td>
                    <motion.td className="py-4 px-6 flex space-x-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      <Button color="secondary" size="sm" onClick={() => router.push(`/admin/products/edit/${product.id}`)}>
                        <Edit className="mr-1" size={16} /> Edit
                      </Button>
                      <Button color="danger" size="sm" onPress={() => handleDelete(product.id)}>
                        <Trash className="mr-1" size={16} /> Delete
                      </Button>
                    </motion.td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="py-4 px-6 text-center text-gray-500">
                    No products found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </motion.div>
      )}
    </motion.div>
  );
}
