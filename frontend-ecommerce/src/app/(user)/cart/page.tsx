"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

import { Button } from '@heroui/react';
import CartItem from '@/ui/components/CartItem';

const CartPage: React.FC = () => {
  const [cart, setCart] = useState<{ id: string; quantity: number }[]>([]);
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  const [totalPrice, setTotalPrice] = useState(0);
  const { user, itemsCount } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(cart);
  }, []);

  const calculateTotalPrice = async (cart: { id: string; quantity: number }[]) => {
    let total = 0;
    for (const item of cart) {
      const response = await fetch(`${backendUrl}api/products/${item.id}`);
      const product = await response.json();
      total += product.price * item.quantity;
    }
    setTotalPrice(total);
  };

  useEffect(() => {
    calculateTotalPrice(cart);
  }, [cart]);

  const updateCart = (updatedCart: { id: string; quantity: number }[]) => {
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    calculateTotalPrice(updatedCart);
  };


  const handleValidateOrder = () => {
    if (!user) {
      router.push('/login');
    } else {
      localStorage.setItem('cart', JSON.stringify(cart));
      if(itemsCount === 0)
      {
        router.push('/');
      }else
      router.push('/order/validate');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      <div className="space-y-4">
        {cart.map((item) => (
          <CartItem key={item.id} productId={item.id} quantity={item.quantity} updateCart={updateCart} />
        ))}
      </div>
      <div className="mt-8 text-right">
        <h2 className="text-2xl font-bold">Total Price: ${totalPrice.toFixed(2)}</h2>
      </div>
      <div className="mt-8">
        <Button
          className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition duration-300"
          onPress={handleValidateOrder}
        >
          Validate Order
        </Button>
      </div>
    </div>
  );
};

export default CartPage;