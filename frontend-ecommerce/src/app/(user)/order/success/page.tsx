"use client";

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Image from 'next/image';
import { getOrderById } from '@/actions/user/order';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { Button } from '@heroui/react';

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
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8"
        >
            <div className="max-w-3xl mx-auto">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1 }}
                        className="inline-block"
                    >
                        <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
                    </motion.div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Order Confirmed!</h1>
                    <p className="text-xl text-gray-600">Thank you for your purchase</p>
                </motion.div>

                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white rounded-2xl shadow-xl p-6 mb-8"
                >
                    <h2 className="text-2xl font-semibold mb-4">Order Details</h2>
                    <div className="space-y-6">
                        {order.orderProducts && order.orderProducts.map((item: any, index: number) => (
                            <motion.div
                                key={item.id}
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: index * 0.1 }}
                                className="flex items-center gap-6 p-4 bg-gray-50 rounded-xl"
                            >
                                <div className="relative w-24 h-24 rounded-lg overflow-hidden">
                                    <Image
                                        src={backendurl + item.product.imageUrl}
                                        alt={item.product.name}
                                        layout="fill"
                                        className="object-cover"
                                    />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-lg font-semibold">{item.product.name}</h3>
                                    <p className="text-gray-600">{item.product.description}</p>
                                    <div className="flex justify-between items-center mt-2">
                                        <span className="text-indigo-600 font-bold">
                                            ${item.product.price.toFixed(2)} × {item.quantity}
                                        </span>
                                        <span className="text-gray-600">
                                            Total: ${(item.product.price * item.quantity).toFixed(2)}
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="text-center"
                >
                    <Button
                        className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 
                     transition-all duration-300 transform hover:shadow-lg"
                        onPress={() => router.push('/')}
                    >
                        Continue Shopping
                    </Button>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default OrderSuccessPage;