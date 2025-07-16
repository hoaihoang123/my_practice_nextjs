import React from "react";
import CategoryTabs from "@/components/thegioididong/components/CategoryTabs";
import ProductCard from "@/components/thegioididong/components/ProductCard";

interface Product {
  id: number;
  title: string;
  slug: string;
  price: number;
  description: string;
  category: {
    id: number;
    name: string;
  };
  images: string[];
}
async function getProducts(): Promise<Product[]> {
  try {
    const response = await fetch("https://api.escuelajs.co/api/v1/products", {
      next: { revalidate: 60 }, // Revalidate every 60 seconds
    });
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    return response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

const page = async () => {
  const products = await getProducts();

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-white py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">
            Khuyến mãi Online
          </h1>

          <div className="flex items-center space-x-4 mb-6">
            <div className="bg-red-500 text-white px-4 py-2 text-sm font-bold rounded-md">
              <div className="font-bold">FLASH SALE</div>
              <div className="text-xs">GIÁ SỐC</div>
            </div>
            <div className="bg-orange-500 text-white px-4 py-2 text-sm font-bold rounded-md">
              <div className="font-bold">ONLINE ONLY</div>
              <div className="text-xs">GIẢM ĐẾN 35%</div>
            </div>
          </div>

          {/* Category Tabs */}
          <CategoryTabs />

          {/* Timer Section */}
          <div className="flex justify-around  items-center space-x-4 mb-8">
            <div className="bg-orange-500 text-white px-6 py-3 rounded-lg text-center">
              <div className="font-bold">Sắp diễn ra</div>
              <div className="text-xl font-bold">09:00</div>
            </div>
            <div className="text-center">
              <div className="text-gray-600">Sắp diễn ra</div>
              <div className="font-bold">12:00</div>
            </div>
            <div className="text-center">
              <div className="text-gray-600">Sắp diễn ra</div>
              <div className="font-bold">15:00</div>
            </div>
            <div className="text-center">
              <div className="text-gray-600">Sắp diễn ra</div>
              <div className="font-bold">18:00</div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
