"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const products = [
  {
    id: 1,
    name: "Next.js T-Shirt",
    price: "$29.99",
    image:
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80",
    desc: "Áo thun chất lượng cao, in logo Next.js cực chất.",
  },
  {
    id: 2,
    name: "React Mug",
    price: "$14.99",
    image:
      "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=400&q=80",
    desc: "Ly sứ in logo React, giữ nhiệt tốt, thiết kế hiện đại.",
  },
  {
    id: 3,
    name: "Tailwind Cap",
    price: "$19.99",
    image:
      "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
    desc: "Mũ lưỡi trai phong cách, phối màu Tailwind, cực ngầu.",
  },
  {
    id: 4,
    name: "shadcn/ui Sticker Pack",
    price: "$9.99",
    image:
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
    desc: "Bộ sticker shadcn/ui dán laptop, sổ tay, điện thoại.",
  },
];

export default function ProductsPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-50 to-indigo-100 py-12 px-4">
      <div className="max-w-4xl mx-auto mb-10 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-indigo-700 mb-4 drop-shadow-sm">
          Product Page
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Khám phá các sản phẩm công nghệ cực chất dành cho dev!
        </p>
      </div>
      <div className="max-w-6xl mx-auto grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product, i) => (
          <Card
            key={product.id}
            className={`flex flex-col h-full bg-white/90 border-0 shadow-md hover:shadow-2xl hover:border-indigo-400 transition-all duration-300 group
              ${mounted ? `animate-fade-in-up` : "opacity-0"}`}
            style={{ animationDelay: `${i * 120}ms` }}
          >
            <div className="overflow-hidden rounded-t-xl relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-indigo-700/30 via-transparent to-transparent opacity-0 group-hover:opacity-80 transition-opacity duration-500 pointer-events-none" />
            </div>
            <CardHeader className="pb-2 pt-4">
              <CardTitle className="text-lg font-bold text-indigo-800 group-hover:text-indigo-600 transition-colors duration-200">
                {product.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="text-indigo-600 font-semibold text-xl mb-2">
                {product.price}
              </div>
              <div className="text-gray-600 text-sm mb-2">{product.desc}</div>
            </CardContent>
            <CardFooter className="pt-2">
              <Button className="w-full bg-gradient-to-r from-indigo-500 to-blue-500 hover:scale-105 hover:from-blue-500 hover:to-indigo-500 transition-transform duration-200 shadow-md">
                View
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      {/* Animation keyframes */}
      <style jsx global>{`
        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(40px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.7s cubic-bezier(0.39, 0.575, 0.565, 1) both;
        }
      `}</style>
    </div>
  );
}
