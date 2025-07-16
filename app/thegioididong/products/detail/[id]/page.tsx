import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  ShoppingCart,
  Heart,
  Share2,
  Star,
  Package,
  Truck,
} from "lucide-react";
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
    slug: string;
    image: string;
  };
  images: string[];
  creationAt: string;
  updatedAt: string;
}

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export const dynamicParams = true;

export async function generateStaticParams() {
  const response = await fetch("https://api.escuelajs.co/api/v1/products");
  const products: Product[] = await response.json();

  return products.slice(0, 10).map((product) => ({
    id: product.id.toString(),
  }));
}

async function getProduct(id: string): Promise<Product> {
  const response = await fetch(
    `https://api.escuelajs.co/api/v1/products/${id}`,
    {
      cache: "force-cache",
    }
  );

  if (!response.ok) {
    throw new Error("Product not found");
  }

  return response.json();
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { id } = await params;

  try {
    const product = await getProduct(id);

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        {/* Navigation Header */}
        <div className="bg-white/70 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center space-x-4">
              <Link href="/thegioididong/products">
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-white/80 hover:bg-white"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Quay lại danh sách
                </Button>
              </Link>
              <div className="flex items-center space-x-2">
                <Package className="w-5 h-5 text-slate-600" />
                <span className="text-slate-600">Chi tiết sản phẩm</span>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Product Images */}
            <Card className="overflow-hidden border-0 bg-white/70 backdrop-blur-sm">
              <CardContent className="p-0">
                {product.images && product.images.length > 0 ? (
                  <div className="space-y-4">
                    {/* Main Image */}
                    <div className="relative aspect-square w-full">
                      <Image
                        src={product.images[0]}
                        alt={product.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    </div>

                    {/* Thumbnail Images */}
                    {product.images.length > 1 && (
                      <div className="grid grid-cols-4 gap-2 p-4">
                        {product.images.slice(1, 5).map((image, index) => (
                          <div
                            key={index}
                            className="relative aspect-square rounded-lg overflow-hidden"
                          >
                            <Image
                              src={image}
                              alt={`${product.title} ${index + 2}`}
                              fill
                              className="object-cover hover:scale-105 transition-transform cursor-pointer"
                              sizes="25vw"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="aspect-square w-full bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center">
                    <Package className="w-24 h-24 text-slate-400" />
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Product Information */}
            <div className="space-y-6">
              {/* Header */}
              <Card className="border-0 bg-white/70 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        {product.title}
                      </CardTitle>
                      <Badge
                        variant="secondary"
                        className="bg-blue-100 text-blue-700"
                      >
                        {product.category.name}
                      </Badge>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Heart className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-5 h-5 fill-yellow-400 text-yellow-400"
                          />
                        ))}
                      </div>
                      <span className="text-sm text-slate-600">
                        (4.8 • 124 đánh giá)
                      </span>
                    </div>

                    <div className="text-4xl font-bold text-red-600">
                      {product.price.toLocaleString("vi-VN")}₫
                    </div>

                    <div className="flex items-center space-x-2">
                      <Package className="w-4 h-4 text-slate-600" />
                      <Badge variant="default" className="text-sm">
                        Còn hàng
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Description */}
              <Card className="border-0 bg-white/70 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-xl">Mô tả sản phẩm</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-700 leading-relaxed">
                    {product.description}
                  </p>
                </CardContent>
              </Card>

              {/* Product Details */}
              <Card className="border-0 bg-white/70 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-xl">Thông tin chi tiết</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="flex justify-between items-center py-2 border-b border-slate-200">
                      <span className="font-medium text-slate-600">
                        Mã sản phẩm:
                      </span>
                      <span className="text-slate-900">#{product.id}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-slate-200">
                      <span className="font-medium text-slate-600">
                        Danh mục:
                      </span>
                      <span className="text-slate-900">
                        {product.category.name}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-slate-200">
                      <span className="font-medium text-slate-600">Giá:</span>
                      <span className="text-slate-900 font-bold">
                        {product.price.toLocaleString("vi-VN")}₫
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="font-medium text-slate-600">
                        Ngày tạo:
                      </span>
                      <span className="text-slate-900">
                        {new Date(product.creationAt).toLocaleDateString(
                          "vi-VN"
                        )}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <Card className="border-0 bg-white/70 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-lg"
                    >
                      <ShoppingCart className="w-5 h-5 mr-2" />
                      Thêm vào giỏ hàng
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      className="bg-white/80 hover:bg-white border-red-600 text-red-600 hover:text-red-700"
                    >
                      Mua ngay
                    </Button>
                  </div>

                  <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center space-x-2">
                      <Truck className="w-5 h-5 text-green-600" />
                      <span className="text-sm font-medium text-green-700">
                        Miễn phí vận chuyển cho đơn hàng trên 500.000₫
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching product:", error);
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
            <Package className="w-8 h-8 text-red-400" />
          </div>
          <h1 className="text-2xl font-bold text-red-600 mb-2">
            Không tìm thấy sản phẩm
          </h1>
          <p className="text-gray-600 mb-4">
            Sản phẩm bạn tìm kiếm không tồn tại hoặc đã bị xóa.
          </p>
          <Link href="/thegioididong/products">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Quay lại danh sách
            </Button>
          </Link>
        </div>
      </div>
    );
  }
}
