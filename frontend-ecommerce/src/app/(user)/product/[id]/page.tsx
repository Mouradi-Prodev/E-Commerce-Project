"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button, Input } from "@heroui/react";
import Notification from "@/ui/components/Notification";

import React from "react";
import { getProductById } from "@/actions/product";
import { addToCart } from "@/actions/user/product";
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
    const backendUrl  = process.env.NEXT_PUBLIC_BACKEND_URL;
    const unwrappedParams = React.use(initialParams);
    const [product, setProduct] = useState<Product | null>(null);
    const [quantity, setQuantity] = useState<number>(1);
    const [notification, setNotification] = useState<{ message: string; type: "success" | "error" } | null>(null);
    const router = useRouter();
    const {addToCart} = useAuth();

    useEffect(() => {
        async function loadProduct() {
            if (!unwrappedParams) return;
            const data = await getProductById(unwrappedParams.id);
            setProduct(data);
        }
        loadProduct();
    }, [unwrappedParams]);

   

    return (
        <div className="container mx-auto p-6">
            {product && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex justify-center">
                        {product.imageUrl ? (
                            <img src={backendUrl + product.imageUrl} alt={product.name} className="w-full h-auto rounded-lg shadow-lg" />
                        ) : (
                            <p className="text-center text-gray-500 font-semibold">No image available</p>
                        )}
                    </div>
                    <div className="flex flex-col justify-center">
                        <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
                        <p className="text-xl text-gray-700 mb-4">${product.price.toFixed(2)}</p>
                        <p className="text-gray-600 mb-4">{product.description}</p>
                        <div className="flex items-center mb-4">
                            <Input
                                type="number"
                                name="quantity"
                                label="Quantity"
                                value={quantity.toString()}
                                min={1}
                                max={product.quantity}
                                onChange={(e) => setQuantity(Number(e.target.value))}
                                className="w-24 mr-4"
                            />
                            <Button color="primary" onPress={() => addToCart(product.id, quantity)}>
                                Add to Cart
                            </Button>
                        </div>
                    </div>
                </div>
            )}
            {notification && (
                <Notification
                    message={notification.message}
                    type={notification.type}
                    onClose={() => setNotification(null)}
                />
            )}
        </div>
    );
}