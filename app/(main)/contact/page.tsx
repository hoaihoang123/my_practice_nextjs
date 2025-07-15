"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useState } from "react";

const contactInfo = {
  email: "contact@myblog.com",
  phone: "+84 123 456 789",
  address: "123 Đường Blog, Quận 1, TP. Hồ Chí Minh",
  avatar: "https://randomuser.me/api/portraits/men/75.jpg",
  name: "Admin Blog",
};

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 2000);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-slate-100 py-12 px-4 md:px-8 flex flex-col items-center">
      <div className="max-w-2xl mx-auto mb-10 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-indigo-700 mb-2 drop-shadow-sm">
          Liên hệ
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Bạn có câu hỏi hoặc muốn hợp tác? Hãy gửi tin nhắn cho chúng tôi!
        </p>
      </div>
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Contact Info */}
        <Card className="flex flex-col items-center justify-center bg-white/90 border-0 shadow-md">
          <CardHeader className="flex flex-col items-center pt-8 pb-4">
            <Avatar className="size-20 mb-2">
              <AvatarImage src={contactInfo.avatar} alt={contactInfo.name} />
              <AvatarFallback>{contactInfo.name[0]}</AvatarFallback>
            </Avatar>
            <CardTitle className="text-xl font-bold text-indigo-800">
              {contactInfo.name}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3 items-center text-gray-700">
            <div className="flex items-center gap-2">
              <span className="font-semibold">Email:</span>
              <span>{contactInfo.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold">Điện thoại:</span>
              <span>{contactInfo.phone}</span>
            </div>
            <div className="flex items-center gap-2 text-center">
              <span className="font-semibold">Địa chỉ:</span>
              <span>{contactInfo.address}</span>
            </div>
          </CardContent>
        </Card>
        {/* Contact Form */}
        <Card className="bg-white/90 border-0 shadow-md">
          <CardHeader className="pt-8 pb-4">
            <CardTitle className="text-xl font-bold text-indigo-800">
              Gửi tin nhắn
            </CardTitle>
          </CardHeader>
          <form onSubmit={handleSubmit} autoComplete="off">
            <CardContent className="flex flex-col gap-4">
              <Input
                name="name"
                placeholder="Họ và tên"
                value={form.name}
                onChange={handleChange}
                required
                className="bg-white/80"
              />
              <Input
                name="email"
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                required
                className="bg-white/80"
              />
              <textarea
                name="message"
                placeholder="Nội dung tin nhắn..."
                value={form.message}
                onChange={handleChange}
                required
                rows={5}
                className="rounded-md border border-input bg-white/80 px-3 py-2 text-base shadow-xs focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] outline-none resize-none"
              />
            </CardContent>
            <CardFooter className="flex justify-end pt-2">
              <Button
                type="submit"
                className="px-8 py-2 font-semibold text-base transition-transform duration-200 active:scale-95"
                disabled={submitted}
              >
                {submitted ? "Đã gửi!" : "Gửi"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
