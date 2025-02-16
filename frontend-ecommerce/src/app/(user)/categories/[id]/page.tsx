"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from 'next/navigation';
import ProductCard from "@/ui/components/ProductCard";
import Loader from "@/ui/components/Loader";
import ErrorComponent from "@/ui/components/ErrorComponent";

export default function CategoryProductsPage({params}: {params: Promise<{id: string}>}) {
  const [products, setProducts] = useState<any[]>([]);
  const [category, setCategory] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const searchParams = useSearchParams();
  const [categoryId, setCategoryId] = useState(searchParams?.get('id'));
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  useEffect(() => {
    params.then((params) => {
      setCategoryId(params.id);
    });
  })

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${backendUrl}api/categories/${categoryId}/products`);
        if (!response.ok) throw new Error("Failed to fetch products");
       
        const data = await response.json();
        
        setProducts(data);
        if(data.length > 0)
        setCategory(data[0]?.category?.name);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError(true);
        setLoading(false);
      }
    };

    if (categoryId) {
      fetchProducts();
    }
  }, [categoryId, backendUrl]);

  if (loading) return <Loader />;
  if (error) return <ErrorComponent />;
  if(category === null) return <h1 className="text-3xl font-bold text-center mb-8">No products found</h1>;

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">{category}</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}