"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail, Lock, Loader2 } from "lucide-react";
import React from "react";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Animate on mount
  React.useEffect(() => {
    setMounted(true);
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 1500);
  }

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-slate-100">
      <div
        className={`w-full max-w-md bg-white/90 rounded-2xl shadow-2xl p-8 flex flex-col items-center backdrop-blur-md border border-transparent focus-within:border-indigo-400 transition-all duration-300
        ${mounted ? "animate-fade-in-up" : "opacity-0"}`}
        style={{ animationDelay: "100ms" }}
      >
        <h1 className="text-3xl font-extrabold text-indigo-700 mb-2">
          Login Page
        </h1>
        <p className="text-gray-600 mb-8">
          Đăng nhập để tiếp tục khám phá nội dung hấp dẫn!
        </p>
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-400">
              <Mail size={18} />
            </span>
            <Input
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
              className="bg-white/80 pl-10 border transition-colors duration-200 focus:border-indigo-500"
            />
          </div>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-400">
              <Lock size={18} />
            </span>
            <Input
              name="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              className="bg-white/80 pl-10 border transition-colors duration-200 focus:border-indigo-500"
            />
          </div>
          <Button
            type="submit"
            className="w-full font-semibold text-base bg-gradient-to-r from-indigo-500 to-blue-500 hover:scale-105 hover:from-blue-500 hover:to-indigo-500 transition-transform duration-200 shadow-md flex items-center justify-center gap-2"
            disabled={loading}
          >
            {loading && <Loader2 className="animate-spin" size={18} />}
            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
          </Button>
        </form>
        <div className="w-full flex justify-between mt-4 text-sm">
          <a href="#" className="text-indigo-600 hover:underline">
            Quên mật khẩu?
          </a>
          <a href="#" className="text-indigo-600 hover:underline">
            Đăng ký tài khoản
          </a>
        </div>
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
