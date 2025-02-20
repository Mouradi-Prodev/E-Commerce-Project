"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Form, Input, Switch, Button, Select, SelectItem } from "@heroui/react";
import { fetchCategories } from "@/actions/category";
import { createProduct } from "@/actions/product";
import React from "react";

export default function NewProductPage() {
  const [state, action, pending] = React.useActionState(createProduct, undefined);
  const [categories, setCategories] = useState([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const router = useRouter();
  const [isActive, setIsActive] = useState<boolean>(false);

  useEffect(() => {
    async function loadCategories() {
      const data = await fetchCategories();
      setCategories(data);
    }
    loadCategories();
  }, []);

  return (
    <motion.div
      className="max-w-2xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="bg-white rounded-xl shadow-xl overflow-hidden">
        <div className="p-6 bg-gradient-to-r from-blue-600 to-purple-600">
          <h2 className="text-2xl font-bold text-white">Create New Product</h2>
        </div>

        <Form
          validationBehavior="native"
          action={action}
          className="p-6 space-y-6 bg-white"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Input
                name="name"
                label="Product Name"
                placeholder="Enter product name"
                className="w-full"
                isInvalid={!!state?.errors?.name}
                errorMessage={state?.errors?.name?.[0]}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Input
                name="price"
                type="number"
                label="Price"
                placeholder="Enter price"
                step="0.01"
                className="w-full"
                isInvalid={!!state?.errors?.price}
                errorMessage={state?.errors?.price?.[0]}
              />
            </motion.div>
          </div>

          {/* Description field */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Input
              name="description"
              label="Description"
              placeholder="Enter description"
              className="w-full h-24"
              isInvalid={!!state?.errors?.description}
              errorMessage={state?.errors?.description?.[0]}
            />
          </motion.div>

          {/* Image Preview */}
          {selectedFile && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-lg overflow-hidden shadow-lg"
            >
              <img
                src={URL.createObjectURL(selectedFile)}
                alt="Preview"
                className="w-full h-48 object-cover"
              />
            </motion.div>
          )}

          {/* Image URL */}
          <Input
            type="file"
            name="imageUrl"
            label="Image URL"
            placeholder="Enter image URL"
            isInvalid={!!state?.errors?.imageUrl}
            errorMessage={state?.errors?.imageUrl?.[0]}
            onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
            accept="image/*"
          />

          {/* Quantity */}
          <Input
            name="quantity"
            type="number"
            label="Quantity"
            placeholder="Enter quantity"
            isInvalid={!!state?.errors?.quantity}
            errorMessage={state?.errors?.quantity?.[0]}
          />

          {/* Active Status */}
          <div className="flex items-center space-x-2">
            <Switch name="activeSwitch" isSelected={isActive}
              onValueChange={(isSelected) => setIsActive(isSelected)}
            >Active</Switch>
            <input type="hidden" name="active" value={isActive.toString()} />
          </div>

          {/* Category Dropdown */}
          <Select name="category" label="Category">
            {categories.length > 0 ? (
              categories.map((category: { id: string; name: string }) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))
            ) : (
              <SelectItem key="none" isReadOnly>
                No categories available
              </SelectItem>
            )}
          </Select>

          <div className="flex justify-end space-x-4 mt-8">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                type="button"
                color="secondary"
                onClick={() => router.back()}
                className="gradient-shadow"
              >
                Cancel
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                type="submit"
                color="primary"
                isDisabled={pending}
                className="gradient-shadow-blue"
              >
                {pending ? "Creating..." : "Create Product"}
              </Button>
            </motion.div>
          </div>
        </Form>
      </div>
    </motion.div>
  );
}
