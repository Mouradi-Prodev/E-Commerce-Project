"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Form, Input, Button } from "@heroui/react";

import React from "react";
import { FormState } from "@/lib/categoryDefinition";
import { getCategoryById, updateCategory } from "@/actions/category";

interface Params {
    id: string;
}
interface Category {
    id: string;
    name: string;
    description: string;
}

export default function EditCategoryPage({ params: initialParams }: { params: Promise<Params> }) {
    const unwrappedParams = React.use(initialParams);
    const [category, setCategory] = useState<Category | null>(null);

    const [state, action, pending] = React.useActionState(
        async (state: FormState, formData: FormData) => {
            return updateCategory(state, formData, unwrappedParams?.id);
        },
        undefined
    );

    const router = useRouter();

    useEffect(() => {
        async function loadCategory() {
            if (!unwrappedParams) return;
            const data = await getCategoryById(unwrappedParams.id);
            setCategory(data);
        }
        loadCategory();
    }, [unwrappedParams]);

    return (
        <motion.div
            className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <h2 className="text-2xl font-bold mb-4">Edit Category</h2>

            {category && (
                <Form validationBehavior="native" action={action}>
                    {/* Name */}
                    <Input
                        name="name"
                        label="Category Name"
                        placeholder="Enter category name"
                        defaultValue={category.name}
                        isInvalid={!!state?.errors?.name}
                        errorMessage={state?.errors?.name?.[0]}
                    />

                    {/* Description */}
                    <Input
                        name="description"
                        label="Description"
                        placeholder="Enter description"
                        defaultValue={category.description}
                        isInvalid={!!state?.errors?.description}
                        errorMessage={state?.errors?.description?.[0]}
                    />

                    {/* Submit Button */}
                    <Button type="submit" color="primary" isDisabled={pending}>
                        {pending ? "Updating..." : "Update Category"}
                    </Button>
                </Form>
            )}

            {state?.message && <p className="text-green-600 mt-2">{state.message}</p>}
        </motion.div>
    );
}