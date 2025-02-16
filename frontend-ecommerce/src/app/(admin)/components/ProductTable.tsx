"use client";

import { useEffect, useState } from "react";


import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { deleteProduct, getProducts, } from "@/actions/product";
import { Button, Tooltip, Image } from "@heroui/react";

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
      className="p-6 bg-white shadow-lg rounded-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-bold">Products</h2>
        <Button color="primary" onPress={() => router.push("/admin/products/new")}>
          New Product
        </Button>
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading products...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 rounded-md">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 text-left">Image</th>
                <th className="py-2 px-4 text-left">Name</th>
                <th className="py-2 px-4 text-left">Price</th>
                <th className="py-2 px-4 text-left">Description</th>
                <th className="py-2 px-4 text-left">Active</th>
                <th className="py-2 px-4 text-left">Quantity</th>
                <th className="py-2 px-4 text-left">Category</th>
                <th className="py-2 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-t">
                  <td className="py-2 px-4">
                    {product.imageUrl ? (
                      <Image
                        src={"http://localhost:8080/"+product.imageUrl}
                        alt={product.name}
                        width={50}
                        height={50}
                        className="rounded-md"
                      />
                    ) : (
                      <span className="text-gray-400">No Image</span>
                    )}
                  </td>
                  <td className="py-2 px-4">{product.name}</td>
                  <td className="py-2 px-4">${product.price.toFixed(2)}</td>
                  <td className="py-2 px-4">
                    <Tooltip content={product.description}>
                      {product.description?.length > 30
                        ? product.description.slice(0, 30) + "..."
                        : product.description}
                    </Tooltip>
                  </td>
                  <td className="py-2 px-4">
                    {product.active ? (
                      <span className="text-green-600 font-bold">Active</span>
                    ) : (
                      <span className="text-red-500 font-bold">Inactive</span>
                    )}
                  </td>
                  <td className="py-2 px-4">{product.quantity}</td>
                  <td className="py-2 px-4">
                    {product.category?.name ?? "Uncategorized"}
                  </td>
                  <td className="py-2 px-4 flex space-x-2">
                    <Button
                      color="secondary"
                      size="sm"
                      onClick={() => router.push(`/admin/products/edit/${product.id}`)}
                    >
                      Edit
                    </Button>
                    <Button color="danger" size="sm" onPress={() => handleDelete(product.id)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </motion.div>
  );
}
