import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

interface Category {
  id: string;
  name: string;
  description: string;
}

interface CategoryCardProps {
  category: Category;
}

const Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      staggerChildren: 0.1,
      when: "beforeChildren"
    }
  }
};

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  return (
    <Link href={`/categories/${category.id}`} passHref>
      <motion.div
        className="bg-white rounded-lg overflow-hidden cursor-pointer transition duration-300 p-4 gradient-shadow-blue flex flex-col justify-between w-full h-full"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        initial="hidden"
        animate="visible"
        variants={Variants}
      >
        <div>
          <h2 className="text-lg font-semibold mb-2">{category.name}</h2>
          <p className="text-gray-600 text-sm">
            {category.description?.slice(0, 100)}...
          </p>
        </div>
      </motion.div>
    </Link>
  );
};

export default CategoryCard;