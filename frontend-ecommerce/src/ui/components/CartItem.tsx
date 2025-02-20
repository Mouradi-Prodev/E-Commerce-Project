import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { getProductById } from '@/actions/product';
import { useAuth } from '@/context/AuthContext';
import { Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface CartItemProps {
  productId: string;
  quantity: number;
  updateCart: (updatedCart: { id: string; price: number; quantity: number }[]) => void;
}

const CartItem: React.FC<CartItemProps> = ({ productId, quantity, updateCart }) => {
  const [product, setProduct] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [itemQuantity, setItemQuantity] = useState(quantity);
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const { itemsCount, setItemsCount } = useAuth();

  useEffect(() => {
    async function fetchProduct() {
      try {
        const data = await getProductById(productId);
        console.log('Fetched product:', data); // Debug log
        if (!data) {
          setError('Product not found');
          return;
        }
        setProduct(data);
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Failed to load product');
      }
    }
    fetchProduct();
  }, [productId]);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const updatedCart = cart.map((item: { id: string; price: number; quantity: number }) =>
      item.id === productId ? { ...item, quantity: itemQuantity } : item
    );
    updateCart(updatedCart);
  }, [itemQuantity, productId]);

  if (error) return <div className="text-red-500 p-4">{error}</div>;
  if (!product) return <div className="p-4">Loading...</div>;

  const handleIncreaseQuantity = () => {
    setItemsCount(itemsCount + 1);
    setItemQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (itemQuantity > 1) {
      setItemsCount(itemsCount - 1);
      setItemQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value > 0) {
      setItemsCount(itemsCount - itemQuantity + value);
      setItemQuantity(value);
    }
  };

  const handleDelete = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const updatedCart = cart.filter((item: { id: string }) => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    updateCart(updatedCart);
    setItemsCount(itemsCount - itemQuantity);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className="flex items-center gap-6 p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="relative w-32 h-32 overflow-hidden rounded-lg"
      >
        <Image
          src={`${backendUrl}${product.imageUrl}`}
          alt={product.name}
          fill
          sizes="(max-width: 128px) 100vw, 128px"
          style={{ objectFit: 'cover' }}
          className="transition-transform duration-300 hover:scale-110"
        />
      </motion.div>
      <div className="flex-1 space-y-3">
        <h2 className="text-xl font-semibold text-gray-800">{product.name}</h2>
        <p className="text-gray-600 line-clamp-2">{product.description}</p>
        <p className="text-2xl font-bold text-indigo-600">${product.price.toFixed(2)}</p>
        <div className="flex items-center gap-4">
          <div className="flex items-center bg-gray-100 rounded-lg overflow-hidden">
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 text-gray-600 hover:bg-gray-200 transition-colors"
              onClick={handleDecreaseQuantity}
            >
              -
            </motion.button>
            <input
              type="number"
              value={itemQuantity}
              onChange={handleQuantityChange}
              className="w-16 text-center bg-transparent border-none focus:ring-0"
              min="1"
            />
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 text-gray-600 hover:bg-gray-200 transition-colors"
              onClick={handleIncreaseQuantity}
            >
              +
            </motion.button>
          </div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 text-red-500 hover:text-red-600 bg-red-50 rounded-full"
            onClick={handleDelete}
          >
            <Trash2 className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default CartItem;