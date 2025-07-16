"use client";
import { Category } from "@/types/category";
import React from "react";

async function getCategories(): Promise<Category[]> {
  try {
    const response = await fetch("https://api.escuelajs.co/api/v1/categories");
    if (!response.ok) {
      throw new Error("Failed to fetch categories");
    }
    const data: Category[] = await response.json();
    console.log("Fetched categories:", data);
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}
const CategoryTabs = () => {
  const [categories, setCategories] = React.useState<Category[]>([]);

  React.useEffect(() => {
    const fetchCategories = async () => {
      const categories = await getCategories();
      setCategories(categories);
    };
    fetchCategories();
  }, []);

  return (
    <div className="flex flex-wrap justify-around  items-center space-x-8 mb-6">
      {categories.map((category) => (
        <button
          key={category.id}
          className="text-gray-600 hover:text-blue-600 font-medium pb-2"
        >
          {category.name}
        </button>
      ))}
    </div>
  );
};

export default CategoryTabs;
