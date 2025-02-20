"use client";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    Link,
    Input,
    DropdownItem,
    DropdownTrigger,
    Dropdown,
    DropdownMenu,
    Avatar,
} from "@heroui/react";
import { useAuth } from "@/context/AuthContext";
import { ShoppingBasket, User } from "lucide-react";


const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 20,
            staggerChildren: 0.1
        }
    }
};

const navItemVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            type: "spring",
            stiffness: 150,
            damping: 15
        }
    }
};

const searchVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 }
};

export const AcmeLogo = () => {
    return (
        <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
            <path
                clipRule="evenodd"
                d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
                fill="currentColor"
                fillRule="evenodd"
            />
        </svg>
    );
};

export const SearchIcon = ({ size = 24, strokeWidth = 1.5, width = 24, height = 24, className, ...props }: { size?: number, strokeWidth?: number, width?: number, height?: number, className?: string }) => {
    return (
        <svg
            aria-hidden="true"
            fill="none"
            focusable="false"
            height={height || size}
            role="presentation"
            viewBox="0 0 24 24"
            width={width || size}
            className={className}
            {...props}
        >
            <path
                d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={strokeWidth}
            />
            <path
                d="M22 22L20 20"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={strokeWidth}
            />
        </svg>
    );
};

export default function Nav() {
    const pathname = usePathname();
    const router = useRouter();
    const [isClient, setIsClient] = React.useState(false);
    const { user, logoutUser, itemsCount } = useAuth();
    React.useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) return null;

    const routes = [
        { path: '/allproducts', label: 'All Products' },
        { path: '/categories', label: 'Categories' },
    ];

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={navVariants}
            className="fixed top-0 w-full z-50"
        >
            <Navbar className="bg-white/80 backdrop-blur-md border-b border-white/20 shadow-sm">
                <NavbarContent justify="start">
                    <motion.div variants={navItemVariants}>
                        <NavbarBrand className="mr-4">
                            <motion.div
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                whileTap={{ scale: 0.9 }}
                                className="cursor-pointer"
                                onClick={() => router.push('/')}
                            >
                                <AcmeLogo />
                            </motion.div>
                            <motion.p
                                className="hidden sm:block font-bold bg-gradient-to-r from-sky-600 to-blue-700 bg-clip-text text-transparent"
                                whileHover={{ x: 5 }}
                                onClick={() => router.push('/')}
                            >
                                MOURADI
                            </motion.p>
                        </NavbarBrand>
                    </motion.div>

                    <NavbarContent className="hidden sm:flex gap-4">
                        {routes.map((route) => (
                            <motion.div key={route.path} variants={navItemVariants}>
                                <NavbarItem>
                                    <motion.div
                                        whileHover={{ y: -2 }}
                                        className="relative"
                                    >
                                        <Link
                                            className="text-sky-800 font-medium"
                                            href="#"
                                            onPress={() => router.push(route.path)}
                                        >
                                            {route.label}
                                            {pathname === route.path && (
                                                <motion.div
                                                    layoutId="navunderline"
                                                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-sky-500 to-blue-600"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                />
                                            )}
                                        </Link>
                                    </motion.div>
                                </NavbarItem>
                            </motion.div>
                        ))}
                    </NavbarContent>
                </NavbarContent>

                <NavbarContent justify="end">
                    <motion.div variants={navItemVariants}>
                        <motion.div
                            variants={searchVariants}
                            initial="rest"
                            whileHover="hover"
                            whileTap="tap"
                        >
                            <Input
                                classNames={{
                                    base: "max-w-full sm:max-w-[14rem]",
                                    inputWrapper: "bg-white/50 hover:bg-white/80 transition-all duration-300 shadow-sm hover:shadow-md",
                                }}
                                placeholder="Search..."
                                startContent={<SearchIcon className="text-sky-500" />}
                                endContent={
                                    <motion.div
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        className="bg-sky-100 p-1 rounded-full cursor-pointer"
                                    >
                                        <kbd className="text-xs text-sky-600">⌘K</kbd>
                                    </motion.div>
                                }
                            />
                        </motion.div>
                    </motion.div>

                    {itemsCount > 0 && (
                        <motion.div
                            variants={navItemVariants}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="relative cursor-pointer"
                            onClick={() => router.push("/cart")}
                        >
                            <ShoppingBasket className="text-sky-800 hover:text-sky-600 transition-colors" />
                            <motion.span
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center"
                            >
                                {itemsCount}
                            </motion.span>
                        </motion.div>
                    )}

                    <AnimatePresence>
                        {user ? (
                            <motion.div
                                variants={navItemVariants}
                                whileHover={{ scale: 1.05 }}
                            >
                                <Dropdown>
                                    <DropdownTrigger>
                                        <User size={24} className="text-sky-800 hover:text-sky-600 transition-colors cursor-pointer" />
                                    </DropdownTrigger>
                                    <DropdownMenu
                                        aria-label="Profile Actions"
                                        variant="flat"
                                        className="bg-white/90 backdrop-blur-lg border border-white/20"
                                    >
                                        <DropdownItem key="profile" className="h-14 gap-2 bg-sky-50">
                                            <p className="font-semibold text-sky-800">Signed in as</p>
                                            <p className="font-semibold text-sky-600">{user?.email}</p>
                                        </DropdownItem>

                                        <DropdownItem
                                            key="logout"
                                            className="text-red-600  hover:bg-red-50"
                                            onPress={() => {
                                                logoutUser && logoutUser();
                                            }}
                                        >
                                            Log Out
                                        </DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                            </motion.div>
                        ) : (
                            <motion.div variants={navItemVariants} className="flex items-center gap-4">
                                {[
                                    { path: '/login', label: 'Login' },
                                    { path: '/register', label: 'Register' }
                                ].map((item) => (
                                    <motion.div
                                        key={item.path}
                                        whileHover={{ y: -2 }}
                                        whileTap={{ y: 0 }}
                                    >
                                        <Link
                                            className="relative px-4 py-2 text-sky-800 font-medium hover:text-sky-600"
                                            href="#"
                                            onPress={() => router.push(item.path)}
                                        >
                                            {item.label}
                                            {pathname === item.path && (
                                                <motion.div
                                                    layoutId="auth-underline"
                                                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-sky-500 to-blue-600"
                                                />
                                            )}
                                        </Link>
                                    </motion.div>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </NavbarContent>
            </Navbar>
        </motion.div>
    );
}