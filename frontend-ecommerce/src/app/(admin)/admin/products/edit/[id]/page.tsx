"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Form, Input, Switch, Button, Select, SelectItem } from "@heroui/react";
import { fetchCategories } from "@/actions/category";
import { getProductById, updateProduct } from "@/actions/product";
import React from "react";
import { FormState } from "@/lib/productDefinition";
import { set } from "zod";

interface Params {
    id: string;
}
interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
    quantity: number;
    imageUrl: string;
    active: boolean;
    category: {
        id: string;
        name: string;
    };
}

export default function EditProductPage({ params: initialParams }: { params: Promise<Params> }) {
    const unwrappedParams = React.use(initialParams);
    const [product, setProduct] = useState<Product | null>(null);

    const [originalImageUrl, setOriginalImageUrl] = useState<string | null>(null);

    const [state, action, pending] = React.useActionState(
        async (state: FormState, formData: FormData) => {
            return updateProduct(state, formData, unwrappedParams?.id, originalImageUrl);
        },
        undefined
    );
    const [categories, setCategories] = useState([]);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isActive, setIsActive] = useState<boolean>(false);
    const router = useRouter();

    useEffect(() => {
        async function loadCategories() {
            const data = await fetchCategories();
            setCategories(data);
        }
        loadCategories();
    }, []);

    useEffect(() => {
        async function loadProduct() {
            if (!unwrappedParams) return;
            const data = await getProductById(unwrappedParams.id);
            setProduct(data);
            setIsActive(data.active)
            setOriginalImageUrl(data.imageUrl);
        }
        loadProduct();
    }, [unwrappedParams]);

    return (
        <motion.div
            className="max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <div className="bg-white rounded-xl shadow-xl overflow-hidden">
                <div className="p-6 bg-gradient-to-r from-indigo-600 to-purple-600">
                    <h2 className="text-2xl font-bold text-white">Edit Product</h2>
                    <p className="text-indigo-100 mt-1">Update product information</p>
                </div>

                {product && (
                    <Form
                        validationBehavior="native"
                        action={action}
                        className="p-6 space-y-6 bg-white"
                    >
                        {/* Name */}
                        <Input
                            name="name"
                            label="Product Name"
                            placeholder="Enter product name"
                            defaultValue={product.name}
                            isInvalid={!!state?.errors?.name}
                            errorMessage={state?.errors?.name?.[0]}
                        />

                        {/* Price */}
                        <Input
                            name="price"
                            type="number"
                            label="Price"
                            placeholder="Enter price"
                            defaultValue={product.price.toString()}
                            step="0.01"
                            isInvalid={!!state?.errors?.price}
                            errorMessage={state?.errors?.price?.[0]}
                        />

                        {/* Description */}
                        <Input
                            name="description"
                            label="Description"
                            defaultValue={product.description}
                            placeholder="Enter description"
                            isInvalid={!!state?.errors?.description}
                            errorMessage={state?.errors?.description?.[0]}
                        />

                        {/* Quantity */}
                        <Input
                            name="quantity"
                            type="number"
                            label="Quantity"
                            defaultValue={product.quantity.toString()}
                            placeholder="Enter quantity"
                            isInvalid={!!state?.errors?.quantity}
                            errorMessage={state?.errors?.quantity?.[0]}
                        />

                        {/* Image URL */}
                        <Input
                            type="file"
                            name="imageUrl"
                            label="Image URL"
                            placeholder="Enter image URL"
                            isInvalid={!!state?.errors?.imageUrl}
                            errorMessage={state?.errors?.imageUrl?.[0]}
                            onChange={(e) => {
                                setSelectedFile(e.target.files?.[0] || null)
                            }}
                            accept="image/*"
                        />
                        <div className="space-y-4">
                            {selectedFile ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="rounded-lg overflow-hidden shadow-lg"
                                >
                                    <img
                                        src={URL.createObjectURL(selectedFile)}
                                        alt="New preview"
                                        className="w-full h-48 object-cover"
                                    />
                                </motion.div>
                            ) : originalImageUrl && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="relative rounded-lg overflow-hidden shadow-lg"
                                >
                                    <img
                                        src={"http://localhost:8080/" + originalImageUrl}
                                        alt="Current product"
                                        className="w-full h-48 object-cover"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setOriginalImageUrl(null)}
                                        className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                                    >
                                        ×
                                    </button>
                                </motion.div>
                            )}
                        </div>

                        {/* Active Status */}
                        <div className="flex items-center space-x-2">
                            <Switch name="activeSwitch" isSelected={isActive}
                                onValueChange={(isSelected) => setIsActive(isSelected)}
                            >Active</Switch>
                            <input type="hidden" name="active" value={isActive.toString()} />
                        </div>

                        {/* Category Dropdown */}
                        <Select name="category" label="Category" defaultSelectedKeys={[product?.category?.id]}>
                            {categories.length > 0 ? (
                                categories.map((category: { id: string; name: string }) => (
                                    <SelectItem key={category.id} value={category.id}>
                                        {category.name}
                                    </SelectItem>
                                ))
                            ) : (
                                <SelectItem key="none" isReadOnly>
                                    No categories available
                                </SelectItem>
                            )}
                        </Select>

                        {/* Action buttons */}
                        <div className="flex justify-end space-x-4 mt-8">
                            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                <Button
                                    type="button"
                                    color="secondary"
                                    onPress={() => router.back()}
                                    className="gradient-shadow"
                                >
                                    Cancel
                                </Button>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                <Button
                                    type="submit"
                                    color="primary"
                                    isDisabled={pending}
                                    className="gradient-shadow-blue"
                                >
                                    {pending ? "Updating..." : "Update Product"}
                                </Button>
                            </motion.div>
                        </div>
                    </Form>
                )}
            </div>
        </motion.div>
    );
}