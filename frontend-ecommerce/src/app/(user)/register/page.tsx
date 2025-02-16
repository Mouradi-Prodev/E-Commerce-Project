"use client";
import React, { useState } from "react";
import { Form, Input, Button } from "@heroui/react";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";


const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.5,
            staggerChildren: 0.1,
            when: "beforeChildren"
        }
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            stiffness: 120,
            damping: 12
        }
    },
};

export default function RegisterForm() {
    const { signup } = useAuth();
    const [submitted, setSubmitted] = useState(null);
    const [error, setError] = useState(null);
    const [state, action, pending] = React.useActionState<{
        errors?: {
            name?: string[],
            email?: string[],
            password?: string[],
            confirmPassword?: string[],
            address?: string[],
            city?: string[],
            phone?: string[]
        },
    }>(signup, undefined)


    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-sky-100 via-blue-50 to-indigo-100">
            <motion.div
                className="w-full max-w-xl p-8 rounded-xl shadow-2xl bg-white/90 backdrop-blur-lg border border-white/20"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.h2
                    className="text-4xl font-extrabold text-center mb-10 bg-gradient-to-r from-sky-600 to-blue-800 bg-clip-text text-transparent"
                    variants={itemVariants}
                >
                    Create Account
                </motion.h2>

                <Form validationBehavior="native" action={action}>
                    {/* Full Name */}
                    <motion.div variants={itemVariants}>
                        <Input
                            isRequired
                            label="Full Name"
                            labelPlacement="outside"
                            type="text"
                            name="name"
                            id="name"
                            placeholder="John Doe"
                            className="w-full mb-6 [&_input]:focus:ring-2 [&_input]:focus:ring-sky-500/50"
                            variant="bordered"
                            radius="lg"
                            classNames={{
                                inputWrapper: "w-[350px] group hover:border-sky-400 transition-colors",
                                label: "text-sky-800 font-medium"
                            }}
                        />
                        {state?.errors?.name && <p>{state.errors.name}</p>}
                    </motion.div>

                    {/* Email */}
                    <motion.div variants={itemVariants}>
                        <Input
                            isRequired
                            label="Email"
                            labelPlacement="outside"
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Enter your email"
                            errorMessage="Please enter a valid email address"
                            className="mb-6  [&_input]:focus:ring-2 [&_input]:focus:ring-sky-500/50"
                            variant="bordered"
                            radius="lg"
                            classNames={{
                                inputWrapper: "group w-[350px] hover:border-sky-400 transition-colors",
                                label: "text-sky-800 font-medium"
                            }}
                        />
                        {state?.errors?.email && <p>{state.errors.email}</p>}
                    </motion.div>

                    {/* Password */}
                    <motion.div variants={itemVariants}>
                        <Input
                            isRequired
                            label="Password"
                            labelPlacement="outside"
                            type="password"
                            name="password"
                            id="password"
                            placeholder="••••••••"
                            errorMessage="Password must be at least 4 characters"
                            minLength={4}
                            className="mb-6 [&_input]:focus:ring-2 [&_input]:focus:ring-sky-500/50"
                            variant="bordered"
                            radius="lg"
                            classNames={{
                                inputWrapper: "group w-[350px] hover:border-sky-400 transition-colors",
                                label: "text-sky-800 font-medium"
                            }}
                        />
                        {state?.errors?.password && <p>{state.errors.password}</p>}
                    </motion.div>

                    {/* Confirm Password */}
                    <motion.div variants={itemVariants}>
                        <Input
                            isRequired
                            label="Confirm Password"
                            labelPlacement="outside"
                            type="password"
                            name="confirmPassword"
                            id="confirmPassword"
                            placeholder="••••••••"
                            minLength={4}
                            className="mb-6 [&_input]:focus:ring-2 [&_input]:focus:ring-sky-500/50"
                            variant="bordered"
                            radius="lg"
                            classNames={{
                                inputWrapper: "group w-[350px] hover:border-sky-400 transition-colors",
                                label: "text-sky-800 font-medium"
                            }}
                        />
                        {state?.errors?.confirmPassword && <p>{state.errors.confirmPassword}</p>}
                    </motion.div>

                    {/* Address */}
                    <motion.div variants={itemVariants}>
                        <Input
                            isRequired
                            label="Address"
                            labelPlacement="outside"
                            type="text"
                            name="address"
                            id="address"
                            placeholder="Street name and number"
                            className="w-full mb-6 [&_input]:focus:ring-2 [&_input]:focus:ring-sky-500/50"
                            variant="bordered"
                            radius="lg"
                            classNames={{
                                inputWrapper: "w-[350px] group hover:border-sky-400 transition-colors",
                                label: "text-sky-800 font-medium"
                            }}
                        />
                        {state?.errors?.address&& <p>{state.errors.address}</p>}
                    </motion.div>

                    {/* City */}
                    <motion.div variants={itemVariants}>
                        <Input
                            isRequired
                            label="City"
                            labelPlacement="outside"
                            type="text"
                            name="city"
                            id="city"
                            placeholder="Your city"
                            className="w-full mb-6 [&_input]:focus:ring-2 [&_input]:focus:ring-sky-500/50"
                            variant="bordered"
                            radius="lg"
                            classNames={{
                                inputWrapper: "w-[350px] group hover:border-sky-400 transition-colors",
                                label: "text-sky-800 font-medium"
                            }}
                        />
                        {state?.errors?.city && <p>{state.errors.city}</p>}
                    </motion.div>

                    {/* Phone Number */}
                    <motion.div variants={itemVariants}>
                        <Input
                            isRequired
                            label="Phone Number"
                            labelPlacement="outside"
                            type="tel"
                            name="phone"
                            id="phone"
                            placeholder="+1 (555) 123-4567"
                            className="w-full mb-6 [&_input]:focus:ring-2 [&_input]:focus:ring-sky-500/50"
                            variant="bordered"
                            radius="lg"
                            pattern="[+]{0,1}[0-9\s-]+"
                            inputMode="tel"
                            classNames={{
                                inputWrapper: "w-[350px] group hover:border-sky-400 transition-colors",
                                label: "text-sky-800 font-medium"
                            }}
                        />
                        {state?.errors?.phone && <p>{state.errors.phone}</p>}
                    </motion.div>

                    {/* Submit Button */}
                    <motion.div variants={itemVariants}>
                        <motion.button
                            disabled={pending}
                            type="submit"
                            className="w-full bg-gradient-to-br from-sky-600 to-blue-700 text-white font-semibold py-3 rounded-xl 
                  hover:from-sky-700 hover:to-blue-800 transition-all duration-300 shadow-lg shadow-sky-100"
                            whileHover={{
                                scale: 1.02,
                                boxShadow: "0px 5px 15px rgba(14, 165, 233, 0.3)"
                            }}
                            whileTap={{
                                scale: 0.98,
                                boxShadow: "0px 2px 5px rgba(14, 165, 233, 0.2)"
                            }}
                            style={{ width: "calc(100% + 2rem)" }}
                        >
                            {(pending ? "Creating Account..." : "Create Account")}
                        </motion.button>
                    </motion.div>
                </Form>

                {submitted && (
                    <motion.div
                        className="mt-6 p-4 text-center text-sky-800 bg-sky-50 rounded-lg border border-sky-100"
                        variants={itemVariants}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        <p className="font-medium">Form Submitted:</p>
                        <code className="text-sm">{JSON.stringify(submitted)}</code>
                    </motion.div>
                )}

                {error && (
                    <motion.div
                        className="mt-6 p-4 text-center text-red-600 bg-red-50 rounded-lg border border-red-100"
                        variants={itemVariants}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        <p className="font-medium">Error: {error}</p>
                    </motion.div>
                )}
            </motion.div>
        </div>
    );
}