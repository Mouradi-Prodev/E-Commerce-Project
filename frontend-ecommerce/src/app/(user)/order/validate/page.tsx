"use client";

import React, { useState, useEffect } from 'react';

import { useAuth } from '@/context/AuthContext';
import { Button, Input } from '@heroui/react';
import { updateUserShippingAddress } from '@/actions/auth';
import { confirmOrder } from '@/actions/user/order';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

interface OrderProduct {
  productId: string;
  quantity: number;
}

interface OrderDTO {
  orderProducts: OrderProduct[];
}

const ValidateOrderPage: React.FC = () => {
  const { user, setUser, itemsCount, setItemsCount } = useAuth();
  const router = useRouter();
  const [local_address, setAddress] = useState(user?.local_address || '');
  const [city, setCity] = useState(user?.city || '');
  const [phone_number, setPhone] = useState(user?.phone_number || '');


  useEffect(() => {
    if (itemsCount === 0 || !user) {
      router.push('/cart');

    }
  }, []);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const updatedUser = { ...user, local_address, city, phone_number };
    // Update user info in the backend
    const returnedUser = await updateUserShippingAddress(updatedUser);
    setUser(returnedUser);

    // Confirm the order
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const orderDTO: OrderDTO = {
      orderProducts: cart.map((item: { id: string; quantity: number }) => ({
        productId: item.id,
        quantity: item.quantity,
      })),
    };
    // Clear the cart
    localStorage.removeItem('cart');
    setItemsCount(0);
    await confirmOrder(orderDTO);

  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8"
    >
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="max-w-2xl mx-auto"
      >
        <h1 className="text-4xl font-bold text-gray-900 text-center mb-8">Complete Your Order</h1>
        <motion.form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-2xl shadow-xl space-y-6"
        >
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Shipping Address
            </label>
            <Input
              type="text"
              value={local_address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your address"
              required
            />
          </motion.div>

          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <label className="block text-sm font-medium text-gray-700 mb-2">
              City
            </label>
            <Input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your city"
              required
            />
          </motion.div>

          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <Input
              type="tel"
              value={phone_number}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your phone number"
              required
            />
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <Button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg
                       transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              Confirm Order
            </Button>
          </motion.div>
        </motion.form>
      </motion.div>
    </motion.div>
  );
};

export default ValidateOrderPage;