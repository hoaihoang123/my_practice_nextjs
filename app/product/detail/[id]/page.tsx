import { Product } from "@/types/product";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

export async function generateStaticParams() {
  const response = await fetch("https://server.aptech.io/online-shop/products");
  const products: Product[] = await response.json();

  return products.slice(0, 10).map((product) => ({
    id: product.id.toString(),
  }));
}

export const dynamicParams = true;

async function getProduct(id: string): Promise<Product> {
  const response = await fetch(
    `https://server.aptech.io/online-shop/products/${id}`,
    {
      cache: "force-cache",
    }
  );

  if (!response.ok) {
    throw new Error("Product not found");
  }

  return response.json();
}

export default async function Index({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProduct(id);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Navigation Header */}
      <div className="bg-white/70 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center space-x-4">
            <Link href="/product/dashboard">
              <Button
                variant="outline"
                size="sm"
                className="bg-white/80 hover:bg-white"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <div className="flex items-center space-x-2">
              <Package className="w-5 h-5 text-slate-600" />
              <span className="text-slate-600">Product Details</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Image */}
          <Card className="overflow-hidden border-0 bg-white/70 backdrop-blur-sm">
            <CardContent className="p-0">
              {product.image ? (
                <div className="relative aspect-square w-full">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
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
                      {product.name}
                    </CardTitle>
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
                      (4.8 • 124 reviews)
                    </span>
                  </div>

                  <div className="text-4xl font-bold text-green-600">
                    ${product.price.toFixed(2)}
                  </div>

                  {product.stock !== undefined && (
                    <div className="flex items-center space-x-2">
                      <Package className="w-4 h-4 text-slate-600" />
                      <Badge
                        variant={product.stock > 0 ? "default" : "destructive"}
                        className="text-sm"
                      >
                        {product.stock > 0
                          ? `${product.stock} units in stock`
                          : "Out of stock"}
                      </Badge>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Description */}
            <Card className="border-0 bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl">Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-700 leading-relaxed">
                  {product.description ||
                    "No description available for this product."}
                </p>
              </CardContent>
            </Card>

            {/* Product Details */}
            <Card className="border-0 bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl">Product Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm font-medium text-slate-600">
                        Product ID
                      </span>
                      <p className="text-slate-900 font-medium">
                        #{product.id}
                      </p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-slate-600">
                        Price
                      </span>
                      <p className="text-slate-900 font-medium">
                        ${product.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {product.stock !== undefined && (
                      <div>
                        <span className="text-sm font-medium text-slate-600">
                          Stock
                        </span>
                        <p className="text-slate-900 font-medium">
                          {product.stock} units
                        </p>
                      </div>
                    )}
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
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg"
                    disabled={product.stock === 0}
                  >
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Add to Cart
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="bg-white/80 hover:bg-white"
                  >
                    <Truck className="w-5 h-5 mr-2" />
                    Quick Order
                  </Button>
                </div>

                <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center space-x-2">
                    <Truck className="w-5 h-5 text-green-600" />
                    <span className="text-sm font-medium text-green-700">
                      Free shipping on orders over $50
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
}
