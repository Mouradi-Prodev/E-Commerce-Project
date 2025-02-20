"use client";

import { useState, useEffect } from "react";

import { Button, Input } from "@heroui/react";
import Notification from "@/ui/components/Notification";
import { motion } from "framer-motion";

import React from "react";
import { getProductById } from "@/actions/product";

import { useAuth } from "@/context/AuthContext";

interface Params {
    id: string;
}
interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
    quantity: number;
    imageUrl: string;
    active: boolean;
    category: {
        id: string;
        name: string;
    };
}

export default function ProductPage({ params: initialParams }: { params: Promise<Params> }) {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    const unwrappedParams = React.use(initialParams);
    const [product, setProduct] = useState<Product | null>(null);
    const [quantity, setQuantity] = useState<number>(1);
    const [notification, setNotification] = useState<{ message: string; type: "success" | "error" } | null>(null);
   
    const { addToCart } = useAuth();

    useEffect(() => {
        async function loadProduct() {
            if (!unwrappedParams) return;
            const data = await getProductById(unwrappedParams.id);
            setProduct(data);
        }
        loadProduct();
    }, [unwrappedParams]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="container mx-auto p-6 min-h-screen bg-gradient-to-b from-gray-50 to-white"
        >
            {product && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-10">
                    <motion.div
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.6 }}
                        className="flex justify-center"
                    >
                        {product.imageUrl ? (
                            <img
                                src={backendUrl + product.imageUrl}
                                alt={product.name}
                                className="w-full h-auto rounded-2xl shadow-2xl hover:shadow-3xl transition-shadow duration-300 object-cover"
                            />
                        ) : (
                            <div className="w-full h-96 bg-gray-100 rounded-2xl flex items-center justify-center">
                                <p className="text-gray-500 font-medium">No image available</p>
                            </div>
                        )}
                    </motion.div>
                    <motion.div
                        initial={{ x: 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.6 }}
                        className="flex flex-col justify-start space-y-6 p-4"
                    >
                        <h1 className="text-5xl font-bold text-gray-800 mb-4">{product.name}</h1>
                        <div className="flex items-center">
                            <span className="text-3xl font-bold text-indigo-600">${product.price.toFixed(2)}</span>
                            {product.quantity < 10 && (
                                <span className="ml-4 text-sm text-red-500">Only {product.quantity} left!</span>
                            )}
                        </div>
                        <p className="text-lg text-gray-600 leading-relaxed">{product.description}</p>
                        <div className="flex items-center space-x-4 mt-8">
                            <Input
                                type="number"
                                name="quantity"
                                label="Quantity"
                                value={quantity.toString()}
                                min={1}
                                max={product.quantity}
                                onChange={(e) => setQuantity(Number(e.target.value))}
                                className="w-32 focus:ring-indigo-500"
                            />
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Button
                                    color="primary"
                                    onPress={() => addToCart(product.id, product.price, quantity)}
                                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg
                                             transition duration-300 ease-in-out transform hover:-translate-y-1"
                                >
                                    Add to Cart
                                </Button>
                            </motion.div>
                        </div>
                        <div className="mt-8">
                            <span className="text-sm font-medium text-gray-500">Category: </span>
                            <span className="text-sm text-indigo-600">{product.category.name}</span>
                        </div>
                    </motion.div>
                </div>
            )}
            {notification && (
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 50 }}
                >
                    <Notification
                        message={notification.message}
                        type={notification.type}
                        onClose={() => setNotification(null)}
                    />
                </motion.div>
            )}
        </motion.div>
    );
}