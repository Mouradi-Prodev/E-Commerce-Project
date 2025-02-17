"use client";

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Image from 'next/image';
import { getOrderById } from '@/actions/user/order';
import { motion } from 'framer-motion';

const OrderSuccessPage: React.FC = () => {
    const { user, setItemsCount } = useAuth();
    const router = useRouter();
    const searchParams = useSearchParams();
    const orderId = searchParams?.get('orderId');
    const [order, setOrder] = useState<any>(null);
    const backendurl = process.env.NEXT_PUBLIC_BACKEND_URL;
   

    useEffect(() => {
        if (user == null) {
            router.push('/');
            return;
        }

        async function fetchOrder() {
            const data = await getOrderById(orderId as string);
            setOrder(data);
        }

        fetchOrder();
    }, [orderId, router]);

    if (!order) return <div>Loading...</div>;

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white p-8 rounded-lg shadow-lg"
            >
                <h1 className="text-4xl font-bold mb-8 text-center text-indigo-600">Thank You for Your Order!</h1>
                <p className="mb-8 text-center text-gray-700">Your order has been placed successfully. Here are the details:</p>
                <div className="space-y-4">
                    {order.orderProducts && order.orderProducts.map((item: any) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                            className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg shadow-md"
                        >
                            <div className="relative w-24 h-24">
                                <Image src={backendurl + item.product.imageUrl} alt={item.product.name} layout="fill" className="object-cover rounded-lg" />
                            </div>
                            <div className="flex-1">
                                <h2 className="text-lg font-semibold text-gray-800">{item.product.name}</h2>
                                <p className="text-gray-600">{item.product.description}</p>
                                <p className="text-indigo-600 font-bold">${item.product.price.toFixed(2)}</p>
                                <p className="text-gray-600">Quantity: {item.quantity}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
};

export default OrderSuccessPage;