"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

import CartItem from '@/ui/components/CartItem';
import { motion, AnimatePresence } from 'framer-motion';
import { getProductById } from '@/actions/product';
import { Button } from '@heroui/react';

const CartPage: React.FC = () => {
  const [cart, setCart] = useState<{ id: string; price: number; quantity: number }[]>([]);
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  const [totalPrice, setTotalPrice] = useState(0);
  const { user, itemsCount } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    console.log('Saved cart:', savedCart); // Debug log
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart);
      console.log('Parsed cart:', parsedCart); // Debug log
      setCart(parsedCart);
    }
    setIsLoading(false);
  }, []);

  const calculateTotalPrice = async (cart: { id: string; price: number; quantity: number }[]) => {
    let total = 0;
    for (const item of cart) {
      total += item.price * item.quantity;
    }
    setTotalPrice(total);
  };

  useEffect(() => {
    calculateTotalPrice(cart);
  }, [cart]);

  const updateCart = (updatedCart: { id: string; price: number; quantity: number }[]) => {
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    calculateTotalPrice(updatedCart);
  };

  const handleValidateOrder = () => {
    if (!user) {
      router.push('/login');
    } else {
      localStorage.setItem('cart', JSON.stringify(cart));
      if (itemsCount === 0) {
        router.push('/');
      } else
        router.push('/order/validate');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-gray-50 to-white p-8"
    >
      <motion.h1
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        className="text-4xl font-bold mb-12 text-gray-800 text-center"
      >
        Your Shopping Cart
      </motion.h1>

      <div className="max-w-4xl mx-auto">
        <AnimatePresence>
          {isLoading ? (
            <div className="text-center py-16">
              <p>Loading...</p>
            </div>
          ) : cart.length > 0 ? (
            <motion.div className="space-y-6">
              {cart.map((item, index) => {
                console.log('Rendering item:', item); // Debug log
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <CartItem
                      productId={item.id}
                      quantity={item.quantity}
                      updateCart={updateCart}
                    />
                  </motion.div>
                );
              })}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <p className="text-xl text-gray-600">Your cart is empty</p>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-12 bg-white rounded-2xl shadow-lg p-6"
        >
          <div className="flex justify-between items-center mb-6">
            <span className="text-xl font-medium text-gray-600">Total</span>
            <span className="text-3xl font-bold text-indigo-600">
              ${totalPrice.toFixed(2)}
            </span>
          </div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-xl
                       text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              onPress={handleValidateOrder}
            >
              Proceed to Checkout
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CartPage;