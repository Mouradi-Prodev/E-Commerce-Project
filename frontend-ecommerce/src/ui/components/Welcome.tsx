"use client"
import { motion } from "framer-motion"

export default function WelcomeBanner() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="relative w-full bg-gradient-to-r from-purple-600 via-indigo-500 to-blue-500 text-white py-20 px-6 md:px-12 lg:px-20 overflow-hidden rounded-2xl shadow-2xl"
    >
      <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-4xl md:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100"
        >
          Welcome to Our Store! 🛍️
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-6 text-xl md:text-2xl text-white/90 leading-relaxed"
        >
          Discover the best deals and latest trends. Shop now and enjoy exclusive discounts!
        </motion.p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-8 px-8 py-4 bg-white text-purple-600 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
        >
          Start Shopping
        </motion.button>
      </div>

      {/* Animated background elements */}
      <motion.div
        animate={{
          rotate: 360,
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute top-0 left-0 w-full h-full opacity-30"
      >
        <div className="absolute top-4 left-4 w-32 h-32 bg-white/20 rounded-full blur-xl"></div>
        <div className="absolute bottom-6 right-6 w-48 h-48 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-white/10 rounded-full blur-2xl"></div>
      </motion.div>

      {/* Floating particles */}
      <motion.div
        animate={{
          y: [-10, 10],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse"
        }}
        className="absolute inset-0"
      >
        <div className="absolute top-10 right-10 w-3 h-3 bg-white rounded-full"></div>
        <div className="absolute bottom-20 left-20 w-2 h-2 bg-white rounded-full"></div>
        <div className="absolute top-1/2 right-1/4 w-4 h-4 bg-white rounded-full"></div>
      </motion.div>
    </motion.section>
  );
}
