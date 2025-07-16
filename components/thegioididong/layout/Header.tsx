import React from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { MapPin, Search, ShoppingCart, User } from "lucide-react";

const Header = () => {
  return (
    <header className="w-full">
      <div className="container mx-auto px-4 flex items-center justify-center space-x-4">
        <Image
          src="https://cdnv2.tgdd.vn/mwg-static/tgdd/Banner/bd/26/bd260331dfc577627b0c955e027cdaba.png"
          alt="The Gioi Di Dong Banner"
          height={100}
          width={200}
          className="h-16 w-auto object-contain"
        />
      </div>
      <div className="bg-yellow-400 py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                <span className="text-yellow-400 font-bold text-xs">⚡</span>
              </div>
              <span className="text-black font-bold text-xl">
                thegioididong
              </span>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-md mx-8">
              <div className="relative">
                <Input
                  placeholder="Bạn tìm gì..."
                  className="w-full pl-4 pr-10 py-2 rounded-lg border-0 bg-white"
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
            </div>

            {/* User Actions */}
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-1 text-black hover:text-gray-700 cursor-pointer">
                <User className="w-4 h-4" />
                <span className="text-sm">Đăng nhập</span>
              </div>
              <div className="flex items-center space-x-1 text-black hover:text-gray-700 cursor-pointer">
                <ShoppingCart className="w-4 h-4" />
                <span className="text-sm">Giỏ hàng</span>
              </div>
              <div className="flex items-center space-x-1 text-black hover:text-gray-700 cursor-pointer">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">Hồ Chí Minh</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-yellow-500 py-3">
        <div className="container mx-auto px-4">
          <nav className="flex items-center justify-around space-x-8 text-black">
            <div className="flex items-center space-x-1 hover:text-gray-700 cursor-pointer">
              <span>📱</span>
              <span className="text-sm font-medium">Điện thoại</span>
            </div>
            <div className="flex items-center space-x-1 hover:text-gray-700 cursor-pointer">
              <span>💻</span>
              <span className="text-sm font-medium">Laptop</span>
            </div>
            <div className="flex items-center space-x-1 hover:text-gray-700 cursor-pointer">
              <span>🎧</span>
              <span className="text-sm font-medium">Phụ kiện</span>
            </div>
            <div className="flex items-center space-x-1 hover:text-gray-700 cursor-pointer">
              <span>⌚</span>
              <span className="text-sm font-medium">Smartwatch</span>
            </div>
            <div className="flex items-center space-x-1 hover:text-gray-700 cursor-pointer">
              <span>🏠</span>
              <span className="text-sm font-medium">Đồng hồ</span>
            </div>
            <div className="flex items-center space-x-1 hover:text-gray-700 cursor-pointer">
              <span>📱</span>
              <span className="text-sm font-medium">Tablet</span>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
