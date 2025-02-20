"use client";
import { motion } from "framer-motion";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";

const footerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            staggerChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
        opacity: 1,
        y: 0
    }
};

export default function Footer() {
    return (
        <motion.footer
            className="bg-gradient-to-r from-sky-900 to-sky-800 text-white"
            initial="hidden"
            whileInView="visible"
            variants={footerVariants}
            viewport={{ once: true }}
        >
            <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* About Section */}
                    <motion.div variants={itemVariants} className="space-y-4">
                        <h3 className="text-xl font-bold">About Us</h3>
                        <p className="text-sky-100 text-sm">
                            We provide the best products with the best quality at the best price.
                            Your satisfaction is our priority.
                        </p>
                    </motion.div>

                    {/* Quick Links */}
                    <motion.div variants={itemVariants} className="space-y-4">
                        <h3 className="text-xl font-bold">Quick Links</h3>
                        <ul className="space-y-2 text-sky-100">
                            <li><a href="#" className="hover:text-white transition-colors">Home</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Products</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Categories</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                        </ul>
                    </motion.div>

                    {/* Contact Info */}
                    <motion.div variants={itemVariants} className="space-y-4">
                        <h3 className="text-xl font-bold">Contact Info</h3>
                        <ul className="space-y-2 text-sky-100">
                            <li className="flex items-center gap-2">
                                <MapPin size={18} /> 123 Street, City, Country
                            </li>
                            <li className="flex items-center gap-2">
                                <Phone size={18} /> +1 234 567 890
                            </li>
                            <li className="flex items-center gap-2">
                                <Mail size={18} /> info@example.com
                            </li>
                        </ul>
                    </motion.div>

                    {/* Social Links */}
                    <motion.div variants={itemVariants} className="space-y-4">
                        <h3 className="text-xl font-bold">Follow Us</h3>
                        <div className="flex space-x-4">
                            <motion.a
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                href="#"
                                className="bg-sky-700 p-2 rounded-full hover:bg-sky-600 transition-colors"
                            >
                                <Facebook size={20} />
                            </motion.a>
                            <motion.a
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                href="#"
                                className="bg-sky-700 p-2 rounded-full hover:bg-sky-600 transition-colors"
                            >
                                <Instagram size={20} />
                            </motion.a>
                            <motion.a
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                href="#"
                                className="bg-sky-700 p-2 rounded-full hover:bg-sky-600 transition-colors"
                            >
                                <Twitter size={20} />
                            </motion.a>
                        </div>
                    </motion.div>
                </div>

                <motion.div
                    variants={itemVariants}
                    className="border-t border-sky-700 mt-8 pt-8 text-center text-sky-100"
                >
                    <p>&copy; {new Date().getFullYear()} Your Store. All rights reserved.</p>
                </motion.div>
            </div>
        </motion.footer>
    );
}
