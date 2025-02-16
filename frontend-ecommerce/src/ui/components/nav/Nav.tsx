"use client";
import { motion } from "framer-motion";
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

const navItemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            stiffness: 120,
            damping: 12
        }
    }
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
            className="w-full"
        >
            <Navbar

                className="bg-white/90 backdrop-blur-lg border-white/20"
                classNames={{
                    wrapper: "w-full px-3 sm:px-8",
                }}
            >
                <NavbarContent justify="start">
                    <motion.div variants={navItemVariants}>
                        <NavbarBrand className="mr-4 gap-2">
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                className="cursor-pointer"
                                onClick={() => router.push('/')}
                            >
                                <AcmeLogo />
                            </motion.div>
                            <motion.p
                                className="hidden sm:block font-bold text-sky-800 cursor-pointer"
                                whileHover={{ x: 5 }}
                                onClick={() => router.push('/')}
                            >
                                MOURADI
                            </motion.p>
                        </NavbarBrand>
                    </motion.div>

                    <NavbarContent className="hidden sm:flex gap-3">
                        {routes.map((route) => (
                            <motion.div key={route.path} variants={navItemVariants}>
                                <NavbarItem isActive={pathname === route.path}>
                                    <Link
                                        className="relative cursor-pointer  text-sky-800 hover:text-sky-600 transition-colors"
                                        underline="none"
                                        href='#'
                                        onPress={() => router.push(route.path)}
                                    >
                                        <motion.p
                                            className="hidden sm:block "
                                            whileHover={{ y: -5 }}

                                        >
                                            {route.label}
                                        </motion.p>

                                        {pathname === route.path && (
                                            <motion.div
                                                className="absolute bottom-0 left-0 w-full h-0.5 bg-sky-500"
                                                layoutId="nav-underline"
                                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                            />
                                        )}
                                    </Link>
                                </NavbarItem>
                            </motion.div>
                        ))}
                    </NavbarContent>
                </NavbarContent>

                <NavbarContent as="div" className="items-center" justify="end">
                    <motion.div variants={navItemVariants}>
                        <Input
                            classNames={{
                                base: "max-w-full sm:max-w-[12rem] h-10",
                                mainWrapper: "h-full",
                                input: "text-small text-sky-800",
                                inputWrapper: "h-full bg-white/50 border border-sky-100 hover:border-sky-300 focus-within:border-sky-500 transition-colors",
                            }}
                            placeholder="Search..."
                            size="sm"
                            startContent={<SearchIcon size={18} width={18} height={18} className="text-sky-500" />}
                            type="search"
                        />
                    </motion.div>
                    {itemsCount > 0 && (
                        <motion.div variants={navItemVariants} className="relative cursor-pointer" onClick={() => router.push("/cart")}>
                            <ShoppingBasket size={24} className="text-sky-800 hover:text-sky-600 transition-colors" />
                            <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                                {itemsCount}
                            </span>
                        </motion.div>
                    )}
                    {user ?
                        (<motion.div variants={navItemVariants}>
                            <Dropdown placement="bottom-end">
                                <DropdownTrigger>
                                    {/* <Avatar
                                        isBordered
                                        as="button"
                                        className="transition-transform hover:scale-105 border-sky-500"
                                        color="primary"
                                        name="Jason Hughes"
                                        size="sm"
                                        src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                                    /> */}
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
                        </motion.div>) :
                        (
                            <motion.div variants={navItemVariants} className="flex items-center space-x-4">
                                <Link
                                    className="relative text-sky-800 hover:text-sky-600 transition-colors"
                                    underline="none"
                                    href='#'
                                    onPress={() => router.push('/login')}
                                >
                                    <motion.p
                                        className="hidden sm:block  cursor-pointer"
                                        whileHover={{ y: -5 }}
                                    >
                                        Login
                                    </motion.p>
                                    {pathname === "/login" && (
                                        <motion.div
                                            className="absolute bottom-0 left-0 w-full h-0.5 bg-sky-500"
                                            layoutId="nav-underline"
                                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                        />
                                    )}

                                </Link>
                                <Link
                                    className="relative text-sky-800 hover:text-sky-600 transition-colors"
                                    underline="none"
                                    href='#'
                                    onPress={() => router.push('/register')}
                                >
                                    <motion.p
                                        className="hidden sm:block  cursor-pointer"
                                        whileHover={{ y: -5 }}
                                    >
                                        Register
                                    </motion.p>
                                    {pathname === "/register" && (
                                        <motion.div
                                            className="absolute bottom-0 left-0 w-full h-0.5 bg-sky-500"
                                            layoutId="nav-underline"
                                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                        />
                                    )}
                                </Link>
                            </motion.div>
                        )}
                </NavbarContent>
            </Navbar>
        </motion.div>
    );
}