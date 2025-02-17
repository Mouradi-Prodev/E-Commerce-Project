"use client";

import React, { useState, useEffect } from 'react';

import { useAuth } from '@/context/AuthContext';
import { Button, Input } from '@heroui/react';
import { updateUserShippingAddress } from '@/actions/auth';
import { confirmOrder } from '@/actions/user/order';
import { useRouter } from 'next/navigation';


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
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-8">Validate Your Order</h1>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-md">
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">
            Address
          </label>
          <Input
            id="address"
            type="text"
            value={local_address}
            onChange={(e) => setAddress(e.target.value)}
            className="mt-1 block w-full"
            required
          />
        </div>
        <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-700">
            City
          </label>
          <Input
            id="city"
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="mt-1 block w-full"
            required
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            Phone
          </label>
          <Input
            id="phone"
            type="tel"
            value={phone_number}
            onChange={(e) => setPhone(e.target.value)}
            className="mt-1 block w-full"
            required
          />
        </div>
        <Button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition duration-300"
        >
          Validate Order
        </Button>
      </form>
    </div>
  );
};

export default ValidateOrderPage;