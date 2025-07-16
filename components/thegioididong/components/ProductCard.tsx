// components/ProductCard.tsx
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";

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

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Card className="group bg-white rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <CardContent className="p-4">
        {/* Product Image */}
        <div className="aspect-square mb-3 relative overflow-hidden rounded-lg">
          <Image
            src={product.images[0] || "/placeholder.jpg"}
            alt={product.title}
            fill
            className="object-contain group-hover:scale-105 transition-transform duration-300"
          />
          {/* Category Badge */}
          <Badge
            variant="secondary"
            className="absolute top-2 right-2 bg-white/90 text-slate-700 text-xs"
          >
            {product.category.name}
          </Badge>
        </div>

        {/* Product Info */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-800 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {product.title}
          </h3>

          <p className="text-xs text-gray-500 line-clamp-2">
            {product.description}
          </p>

          <div className="text-red-600 font-bold text-lg">
            {product.price.toLocaleString("vi-VN")}₫
          </div>

          <Button
            size="sm"
            className="w-full bg-red-600 hover:bg-red-700 text-white"
          >
            <Link href={`/thegioididong/products/detail/${product.id}`}>
              Xem chi tiết
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
