"use client";

import { fetchCategories } from "@/actions/category";
import CategoryCard from "@/ui/components/CategoryCard";
import { useState, useEffect } from "react";


import React from "react";

interface Category {
  id: string;
  name: string;
  description: string;
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    async function fetchData() {
      const data = await fetchCategories();
      setCategories(data);
    }
    fetchData();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-8">Categories</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((category) => (

          <div key={category.id} className="flex">
            <CategoryCard category={category} />
          </div>

        ))}
      </div>
    </div>
  );
}