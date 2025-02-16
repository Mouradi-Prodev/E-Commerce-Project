import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { getProductById } from '@/actions/product';
import { useAuth } from '@/context/AuthContext';
import { Trash2 } from 'lucide-react';

interface CartItemProps {
  productId: string;
  quantity: number;
  updateCart: (updatedCart: { id: string; quantity: number }[]) => void;
}

const CartItem: React.FC<CartItemProps> = ({ productId, quantity, updateCart }) => {
  const [product, setProduct] = useState<any>(null);
  const [itemQuantity, setItemQuantity] = useState(quantity);
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const { itemsCount, setItemsCount } = useAuth();

  useEffect(() => {
    async function fetchProduct() {
      const data = await getProductById(productId);
      setProduct(data);
    }
    fetchProduct();
  }, [productId]);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const updatedCart = cart.map((item: { id: string; quantity: number }) =>
      item.id === productId ? { ...item, quantity: itemQuantity } : item
    );
    updateCart(updatedCart);
  }, [itemQuantity, productId]);

  if (!product) return null;

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
    <div className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-md">
      <div className="relative w-24 h-24">
        <Image src={`${backendUrl}${product.imageUrl}`} alt={product.name} layout="fill" className="object-cover rounded-lg" />
      </div>
      <div className="flex-1">
        <h2 className="text-lg font-semibold">{product.name}</h2>
        <p className="text-gray-600">{product.description}</p>
        <p className="text-indigo-600 font-bold">${product.price.toFixed(2)}</p>
        <div className="flex items-center space-x-2">
          <button
            className="bg-gray-200 text-gray-700 px-2 py-1 rounded-lg hover:bg-gray-300 transition duration-300"
            onClick={handleDecreaseQuantity}
          >
            -
          </button>
          <input
            type="number"
            value={itemQuantity}
            onChange={handleQuantityChange}
            className="w-16 text-center bg-gray-200 text-gray-700 rounded-lg"
            min="1"
          />
          <button
            className="bg-gray-200 text-gray-700 px-2 py-1 rounded-lg hover:bg-gray-300 transition duration-300"
            onClick={handleIncreaseQuantity}
          >
            +
          </button>
          <button
            className="bg-red-200 text-red-700 px-2 py-1 rounded-lg hover:bg-red-300 transition duration-300"
            onClick={handleDelete}
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;