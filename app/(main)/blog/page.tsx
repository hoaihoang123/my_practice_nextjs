"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const posts = [
  {
    id: 1,
    title: "How to Build a Beautiful Blog with Next.js & shadcn/ui",
    description:
      "A step-by-step guide to creating a modern blog using Next.js, Tailwind CSS, and shadcn/ui components.",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
    author: {
      name: "Jane Doe",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    date: "2024-07-10",
    tags: ["Next.js", "shadcn/ui", "TailwindCSS"],
  },
  {
    id: 2,
    title: "10 Tips for Clean React Code",
    description:
      "Improve your React codebase with these essential tips for maintainability and performance.",
    image:
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
    author: {
      name: "John Smith",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    date: "2024-07-08",
    tags: ["React", "Best Practices"],
  },
  {
    id: 3,
    title: "Understanding Server Components in Next.js 13",
    description:
      "Learn the difference between server and client components and how to use them effectively.",
    image:
      "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=600&q=80",
    author: {
      name: "Alice Lee",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    },
    date: "2024-07-05",
    tags: ["Next.js", "Server Components"],
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-100 py-12 px-4 md:px-8">
      <div className="max-w-3xl mx-auto mb-10 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-indigo-700 mb-4 drop-shadow-sm">
          Blog
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Chia sẻ kiến thức về Next.js, React, Tailwind CSS và shadcn/ui
        </p>
        <div className="flex items-center gap-2 justify-center">
          <Input
            placeholder="Tìm kiếm bài viết..."
            className="max-w-xs bg-white/80"
          />
          <Button>Search</Button>
        </div>
      </div>
      <div className="max-w-6xl mx-auto grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Card
            key={post.id}
            className="group transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl bg-white/90 border-0 shadow-md py-0"
          >
            <div className="overflow-hidden rounded-t-xl">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <CardHeader className="pb-2 pt-4">
              <CardTitle className="text-xl font-bold text-indigo-800 group-hover:text-indigo-600 transition-colors duration-200">
                {post.title}
              </CardTitle>
              <CardDescription>{post.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2 pb-1">
              {post.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="bg-indigo-100 text-indigo-700"
                >
                  {tag}
                </Badge>
              ))}
            </CardContent>
            <CardFooter className="flex items-center justify-between pt-2 border-t border-gray-100">
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage
                    src={post.author.avatar}
                    alt={post.author.name}
                  />
                  <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                </Avatar>
                <span className="text-sm text-gray-700 font-medium">
                  {post.author.name}
                </span>
              </div>
              <span className="text-xs text-gray-400">
                {new Date(post.date).toLocaleDateString()}
              </span>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
