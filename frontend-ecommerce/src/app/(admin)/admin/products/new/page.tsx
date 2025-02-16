"use client";

import { useState, useEffect } from "react";


import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {  Form, Input, Switch, Button, Select, SelectItem } from "@heroui/react";
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
      className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-2xl font-bold mb-4">Create New Product</h2>

      <Form validationBehavior="native" action={action}>
        {/* Name */}
        <Input
          name="name"
          label="Product Name"
          placeholder="Enter product name"
          isInvalid={!!state?.errors?.name}
          errorMessage={state?.errors?.name?.[0]}
        />

        {/* Price */}
        <Input
          name="price"
          type="number"
          label="Price"
          placeholder="Enter price"
          step="0.01"
          isInvalid={!!state?.errors?.price}
          errorMessage={state?.errors?.price?.[0]}
        />

        {/* Description */}
        <Input
          name="description"
          label="Description"
          placeholder="Enter description"
          isInvalid={!!state?.errors?.description}
          errorMessage={state?.errors?.description?.[0]}
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
        {selectedFile && <img src={URL.createObjectURL(selectedFile)} alt="Selected file" width={300} height={300} />}
       

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

        {/* Submit Button */}
        <Button type="submit" color="primary" isDisabled={pending}>
          {pending ? "Creating..." : "Create Product"}
        </Button>
      </Form>

      {state?.message && <p className="text-green-600 mt-2">{state.message}</p>}
    </motion.div>
  );
}
