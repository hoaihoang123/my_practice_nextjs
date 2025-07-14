"use client";

import * as React from "react";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/home", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/products", label: "Products" },
  { href: "/contact", label: "Contact" },
  { href: "/login", label: "Login" },
];
export default function Header() {
  const pathname = usePathname();
  return (
    <header className="w-full bg-white/80 shadow-sm sticky top-0 z-30 backdrop-blur">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-2xl text-indigo-700"
        >
          <span>MyNext Blog</span>
        </Link>
        <NavigationMenu viewport={false}>
          <NavigationMenuList>
            {navLinks.map((link) => (
              <NavigationMenuItem key={link.href}>
                <NavigationMenuLink
                  asChild
                  className={
                    pathname === link.href
                      ? "text-indigo-700 font-bold underline"
                      : "text-gray-700 hover:text-indigo-700"
                  }
                >
                  <Link href={link.href}>{link.label}</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  );
}
