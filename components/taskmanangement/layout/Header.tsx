"use client";

import React from "react";
import Link from "next/link";
import { Bell, User, Plus, Menu, Home, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { signOut, useSession } from "next-auth/react";

const Header = () => {
  const { data: session, status } = useSession();

  const handleLogout = async () => {
    try {
      await signOut({
        redirect: true,
        callbackUrl: "/login",
      });
    } catch (error) {
      console.error("❌ Logout error:", error);
    }
  };
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left section - Logo & Navigation */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="lg:hidden">
              <Menu className="h-5 w-5" />
            </Button>

            <Link
              href="/taskmanagement"
              className="flex items-center space-x-2"
            >
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">TM</span>
              </div>
              <span className="hidden sm:block font-semibold text-gray-900">
                TaskManager
              </span>
            </Link>

            {/* Breadcrumb */}
            <nav className="hidden md:flex items-center space-x-2 text-sm text-gray-500">
              <Home className="h-4 w-4" />
              <React.Fragment>
                <Link
                  href=""
                  className="text-gray-900 font-medium hover:text-gray-700"
                >
                  Home
                </Link>
              </React.Fragment>
            </nav>
          </div>

          {/* Right section - Actions & User */}
          <div className="flex items-center space-x-4">
            {/* Create New Task Button */}
            <Button size="sm" className="hidden sm:flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>New Task</span>
            </Button>

            {/* Notifications */}
            <div className="relative">
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-5 w-5" />
                <Badge
                  variant="destructive"
                  className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                >
                  3
                </Badge>
              </Button>
            </div>

            {/* Settings */}

            {/* User Profile */}
            <div className="flex items-center space-x-3">
              <div className="hidden md:block text-right">
                <p className="text-sm font-medium text-gray-900">
                  {session?.user?.email || "User"}
                </p>
                <p className="text-xs text-gray-500">
                  {status === "loading"
                    ? "Loading..."
                    : status === "authenticated"
                    ? "Authenticated"
                    : "Guest"}
                </p>
              </div>
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-blue-100 text-blue-600">
                  <User className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
            </div>
            {status === "authenticated" && (
              <Button
                variant="ghost"
                size="sm"
                className="hidden md:flex items-center hover:bg-gray-100 cursor-pointer"
                onClick={handleLogout}
              >
                <LogOut className="h-5 w-5" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
