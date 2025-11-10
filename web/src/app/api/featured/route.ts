import { NextResponse } from "next/server";

export async function GET() {
  const featuredPosts = [
    {
      id: "blog1",
      title: "Dark vs Light Mode",
      bg_path: "/pictures/blog/dark-vs-light.png",
      link: "blog/dark-mode-vs-light-mode",
    },
    {
      id: "blog2",
      title: "What I wish I knew...",
      bg_path: "/pictures/blog/tailwind-cheatsheet.png",
      link: "blog/things-i-wish-i-knew-before-tailwind",
    },
    {
      id: "blog3",
      title: "AI Buzz",
      bg_path: "/pictures/blog/ai-buzz.png",
      link: "blog/why-ai-is-just-buzz",
    },
    {
      id: "blog4",
      title: "The Best First Mic",
      bg_path: "/pictures/blog/mv7-1.jpg",
      link: "blog/the-best-first-mic",
    },
    {
      id: "blog5",
      title: "Why Solo Leveling",
      bg_path: "/pictures/blog/solo_leveling.png",
      link: "blog/why-solo-leveling",
    },
    {
      id: "blog6",
      title: "The First Post",
      bg_path: "/pictures/blog/first_post.jpg",
      link: "blog/the-first-post",
    },
    {
      id: "blog7",
      title: "Getting started with Python",
      bg_path: "/pictures/blog/python.png",
      link: "blog/getting-started-with-python",
    },
  ];

  return NextResponse.json(featuredPosts);
}