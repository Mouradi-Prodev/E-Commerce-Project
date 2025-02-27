"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { Button, Tooltip } from "@heroui/react";
import { deleteCategory, fetchCategories } from "@/actions/category";

interface Category {
  id: string;
  name: string;
  description: string;
  image_url: string;
}

export default function CategoriesTable() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      const data = await fetchCategories();
      setCategories(data);
      setLoading(false);
    }
    fetchData();
  }, []);

  const handleDelete = async (id: string) => {
    const success = await deleteCategory(id);
    if (success) {
      setCategories(categories.filter((category) => category.id !== id));
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
        <h2 className="text-2xl font-bold">Categories</h2>
        <Button color="primary" onPress={() => router.push("/admin/categories/new")}>
          New Category
        </Button>
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading categories...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 rounded-md">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 text-left">Image</th>
                <th className="py-2 px-4 text-left">Name</th>
                <th className="py-2 px-4 text-left">Description</th>
                <th className="py-2 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <motion.tr
                  key={category.id}
                  className="border-t hover:bg-gray-50"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  whileHover={{ scale: 1.01 }}
                >
                  <td className="py-2 px-4">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="relative w-12 h-12 overflow-hidden rounded-lg"
                    >
                      <img
                        src={category.image_url || '/placeholder-image.jpg'}
                        alt={category.name}
                       
                        className="object-cover"
                        sizes="(max-width: 48px) 100vw, 48px"
                      />
                    </motion.div>
                  </td>
                  <td className="py-2 px-4">{category.name}</td>
                  <td className="py-2 px-4">
                    <Tooltip content={category.description}>
                      {category.description?.length > 30
                        ? category.description.slice(0, 30) + "..."
                        : category.description}
                    </Tooltip>
                  </td>
                  <td className="py-2 px-4 flex space-x-2">
                    <Button
                      color="secondary"
                      size="sm"
                      onPress={() => router.push(`/admin/categories/edit/${category.id}`)}
                    >
                      Edit
                    </Button>
                    <Button color="danger" size="sm" onPress={() => handleDelete(category.id)}>
                      Delete
                    </Button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </motion.div>
  );
}