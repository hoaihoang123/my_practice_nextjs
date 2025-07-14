"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-white/80 border-t mt-16 py-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-4 gap-2">
        <div className="text-gray-500 text-sm">
          © {new Date().getFullYear()} MyNext Blog. All rights reserved.
        </div>
        <div className="flex gap-4 text-sm">
          <Link
            href="/home"
            className="hover:text-indigo-700 transition-colors"
          >
            Home
          </Link>
          <Link
            href="/blog"
            className="hover:text-indigo-700 transition-colors"
          >
            Blog
          </Link>
          <Link
            href="/contact"
            className="hover:text-indigo-700 transition-colors"
          >
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
