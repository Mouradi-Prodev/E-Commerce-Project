import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

interface Category {
  id: string;
  name: string;
  description: string;
  image_url: string;
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
        className="bg-white rounded-xl overflow-hidden cursor-pointer transition-all duration-300 h-[280px] relative group"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        initial="hidden"
        animate="visible"
        variants={Variants}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />

        <img
          src={category.image_url}
          alt={category.name}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
        />

        <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
          <h2 className="text-xl font-bold text-white mb-2">
            {category.name}
          </h2>
          <p className="text-gray-200 text-sm line-clamp-2">
            {category.description}
          </p>
        </div>

        <div className="absolute top-4 right-4 z-20">
          <motion.div
            className="w-8 h-8 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center"
            whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </motion.div>
        </div>
      </motion.div>
    </Link>
  );
};

export default CategoryCard;