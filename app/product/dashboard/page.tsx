import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/types/product";
import { Eye, ShoppingCart, TrendingUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

async function getProducts(): Promise<Product[]> {
  try {
    const response = await fetch(
      "https://server.aptech.io/online-shop/products"
      // {
      //   cache: "force-cache", // SSG thuần
      // }
      // {
      //   next: {
      //     revalidate: 20, // ISR - Rebuild page mỗi 20 giây (nếu có request)
      //   },
      // }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    return response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}
export default async function ProductDashboard() {
  const products = await getProducts();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="mx-auto max-w-7xl">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Product Dashboard
              </h1>
              <p className="mt-2 text-lg text-slate-600">
                Discover and manage your amazing products
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-green-500" />
              <Badge
                variant="secondary"
                className="bg-green-100 text-green-700"
              >
                {products.length} Products
              </Badge>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="border-0 bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100">Total Products</p>
                  <p className="text-3xl font-bold">{products.length}</p>
                </div>
                <ShoppingCart className="h-8 w-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100">Avg Price</p>
                  <p className="text-3xl font-bold">
                    $
                    {products.length > 0
                      ? (
                          products.reduce((sum, p) => sum + p.price, 0) /
                          products.length
                        ).toFixed(0)
                      : "0"}
                  </p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-r from-orange-500 to-orange-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100">In Stock</p>
                  <p className="text-3xl font-bold">
                    {products.filter((p) => (p.stock || 0) > 0).length}
                  </p>
                </div>
                <Eye className="h-8 w-8 text-orange-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <Card
              key={product.id}
              className="group overflow-hidden border-0 bg-white/70 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25"
            >
              <CardHeader className="p-0">
                {product.image && (
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    <div className="absolute top-3 right-3">
                      <Badge
                        variant="secondary"
                        className="bg-white/90 text-slate-700 backdrop-blur-sm"
                      >
                        ${product.price.toFixed(0)}
                      </Badge>
                    </div>
                  </div>
                )}
              </CardHeader>

              <CardContent className="p-6">
                <div className="space-y-3">
                  <div>
                    <CardTitle className="line-clamp-2 text-lg font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                      {product.name}
                    </CardTitle>
                    {product.description && (
                      <CardDescription className="mt-2 line-clamp-2 text-slate-600">
                        {product.description}
                      </CardDescription>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl font-bold text-green-600">
                          ${product.price.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    {product.stock !== undefined && (
                      <Badge
                        variant={product.stock > 0 ? "default" : "destructive"}
                        className="text-xs"
                      >
                        {product.stock > 0 ? `${product.stock} left` : "Out"}
                      </Badge>
                    )}
                  </div>

                  <Link
                    href={`/product/detail/${product.id}`}
                    className="block"
                  >
                    <Button
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transition-all duration-300 hover:from-blue-700 hover:to-purple-700 hover:shadow-xl"
                      size="sm"
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      View Details
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {products.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="rounded-full bg-slate-100 p-6">
              <ShoppingCart className="h-12 w-12 text-slate-400" />
            </div>
            <h3 className="mt-4 text-xl font-semibold text-slate-900">
              No products found
            </h3>
            <p className="mt-2 text-slate-600">
              Start by adding some amazing products to your inventory.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
