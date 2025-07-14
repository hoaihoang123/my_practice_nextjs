"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=900&q=80",
    title: "Welcome to MyNext Blog",
    desc: "Nơi chia sẻ kiến thức về Next.js, React, Tailwind CSS và shadcn/ui.",
    cta: "Khám phá Blog",
    href: "/blog",
  },
  {
    image:
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=900&q=80",
    title: "Học lập trình hiện đại",
    desc: "Cập nhật xu hướng mới nhất về web development, UI/UX và công nghệ.",
    cta: "Xem bài viết mới",
    href: "/blog",
  },
  {
    image:
      "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=900&q=80",
    title: "Kết nối & Hợp tác",
    desc: "Liên hệ để cùng phát triển dự án hoặc chia sẻ kinh nghiệm.",
    cta: "Liên hệ ngay",
    href: "/contact",
  },
];

function mod(n: number, m: number) {
  return ((n % m) + m) % m;
}

export default function Home() {
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    const timer = setInterval(
      () => setCurrent((c) => (c + 1) % slides.length),
      5000
    );
    return () => clearInterval(timer);
  }, []);

  const prev = () => setCurrent((c) => mod(c - 1, slides.length));
  const next = () => setCurrent((c) => mod(c + 1, slides.length));

  // Calculate indices for left, center, right
  const leftIdx = mod(current - 1, slides.length);
  const rightIdx = mod(current + 1, slides.length);

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-50 to-indigo-100 flex flex-col items-center">
      {/* 3D Card Carousel Slider */}
      <div className="relative w-full h-[400px] md:h-[500px] mt-8 flex items-center justify-center select-none">
        {/* Slides */}
        <div className="w-full h-full flex items-center justify-center relative">
          {slides.map((slide, idx) => {
            let style =
              "absolute top-0 left-1/2 -translate-x-1/2 transition-all duration-700 ease-in-out ";
            if (idx === current) {
              style += "z-20 scale-100 opacity-100 shadow-2xl blur-0 ";
            } else if (idx === leftIdx) {
              style += "-translate-x-[60%] scale-90 opacity-60 blur-sm z-10 ";
            } else if (idx === rightIdx) {
              style += " scale-90 opacity-60 blur-sm z-10 ";
            } else {
              style += "opacity-0 pointer-events-none z-0 ";
            }
            return (
              <div
                key={idx}
                className={
                  style +
                  "w-full h-[400px] md:h-[500px] rounded-3xl overflow-hidden flex flex-col justify-end group"
                }
                style={{
                  boxShadow:
                    idx === current
                      ? "0 8px 40px 0 rgba(80,80,180,0.18)"
                      : undefined,
                }}
              >
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  draggable={false}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                <div className="relative z-10 p-8 pb-12 flex flex-col items-center text-center">
                  <h2 className="text-3xl md:text-5xl font-extrabold text-white drop-shadow mb-4 animate-fade-in">
                    {slide.title}
                  </h2>
                  <p className="text-lg md:text-2xl text-white/90 mb-6 animate-fade-in delay-200">
                    {slide.desc}
                  </p>
                  <Button
                    asChild
                    className="px-8 py-3 text-lg font-semibold animate-fade-in delay-300 shadow-lg"
                  >
                    <a href={slide.href}>{slide.cta}</a>
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
        {/* Arrow Buttons */}
        <button
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-indigo-100 text-indigo-700 rounded-full shadow-lg p-2 z-30 transition-all border border-indigo-100"
          onClick={prev}
          aria-label="Previous slide"
        >
          <ChevronLeft size={28} />
        </button>
        <button
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-indigo-100 text-indigo-700 rounded-full shadow-lg p-2 z-30 transition-all border border-indigo-100"
          onClick={next}
          aria-label="Next slide"
        >
          <ChevronRight size={28} />
        </button>
        {/* Dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-30">
          {slides.map((_, idx) => (
            <button
              key={idx}
              className={`w-3 h-3 rounded-full border-2 ${
                current === idx
                  ? "bg-indigo-600 border-indigo-600"
                  : "bg-white/80 border-white"
              }`}
              onClick={() => setCurrent(idx)}
              aria-label={`Chuyển đến slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
      {/* About Section */}
      <section className="w-full mx-auto mt-16 text-center px-4">
        <h3 className="text-2xl md:text-3xl font-bold text-indigo-700 mb-4">
          Về MyNext Blog
        </h3>
        <p className="text-lg text-gray-700 mb-6">
          MyNext Blog là nơi bạn có thể tìm thấy các bài viết chất lượng về
          Next.js, React, Tailwind CSS, UI/UX và nhiều chủ đề công nghệ khác.
          Chúng tôi chia sẻ kinh nghiệm thực tế, thủ thuật lập trình và cập nhật
          xu hướng mới nhất.
        </p>
      </section>
      {/* Features Section */}
      <section className="w-full mx-auto mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
        <div className="bg-white/90 rounded-xl shadow p-6 flex flex-col items-center text-center hover:shadow-lg transition-shadow">
          <span className="text-4xl text-indigo-600 mb-2">🚀</span>
          <h4 className="font-semibold text-lg mb-2">Kiến thức cập nhật</h4>
          <p className="text-gray-600">
            Bài viết luôn được cập nhật theo công nghệ mới nhất, giúp bạn không
            bị tụt hậu.
          </p>
        </div>
        <div className="bg-white/90 rounded-xl shadow p-6 flex flex-col items-center text-center hover:shadow-lg transition-shadow">
          <span className="text-4xl text-indigo-600 mb-2">💡</span>
          <h4 className="font-semibold text-lg mb-2">Thủ thuật thực chiến</h4>
          <p className="text-gray-600">
            Chia sẻ kinh nghiệm, tips & tricks giúp bạn giải quyết vấn đề thực
            tế nhanh chóng.
          </p>
        </div>
        <div className="bg-white/90 rounded-xl shadow p-6 flex flex-col items-center text-center hover:shadow-lg transition-shadow">
          <span className="text-4xl text-indigo-600 mb-2">🤝</span>
          <h4 className="font-semibold text-lg mb-2">Cộng đồng hỗ trợ</h4>
          <p className="text-gray-600">
            Kết nối, trao đổi và học hỏi cùng cộng đồng lập trình viên năng
            động.
          </p>
        </div>
      </section>
      {/* Call to Action */}
      <section className="w-full mx-auto mt-16 mb-20 text-center px-4">
        <h3 className="text-2xl md:text-3xl font-bold text-indigo-700 mb-4">
          Bắt đầu khám phá ngay!
        </h3>
        <p className="text-lg text-gray-700 mb-6">
          Khám phá các bài viết, chia sẻ kiến thức và kết nối với cộng đồng.
        </p>
        <Button asChild className="px-8 py-3 text-lg font-semibold">
          <a href="/blog">Đến Blog</a>
        </Button>
      </section>
    </div>
  );
}
