"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { User, LayoutDashboard, LogOut, Moon, Sun } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTheme } from '@/hooks/useTheme';
import { motion, AnimatePresence } from 'motion/react';


export function Header({ data }: { data: { title?: string, subtext: string, showLinks?: boolean, skinny?: boolean } }) {
  const { title, subtext, showLinks = true, skinny = false } = data;
  const { user, signOut } = useAuth();
  const router = useRouter();
  const [avatar, setAvatar] = useState<string>("/avatars/avatar1.png");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const isDark = theme === 'dark';
  const toggleTheme = () => setTheme(isDark ? 'light' : 'dark');

  useEffect(() => {
    if (user) {
      fetch("/api/profile")
        .then(res => res.json())
        .then(data => {
          if (data.avatar_url) {
            setAvatar(data.avatar_url);
          }
        })
        .catch(() => { });
    }
  }, [user]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={`flex items-center justify-between w-full px-10 bg-[#ffffff] shadow-sm dark:bg-[#1c1c1c] h-fit p-3 z-10`}>
      {/* Logo - Left side */}
      <div className="absolute left-10 hidden sm:flex items-center">
        <Link className={`relative ${skinny ? 'w-12 h-12' : 'w-20 h-20'}`} href="/">
          <Image src="/pictures/owl_logo.png" fill alt="Logo" />
        </Link>
      </div>
      {/* Left spacer to balance the layout */}
      <div className="hidden sm:flex w-24" />

      {/* Title*/}
      <div className="flex flex-col items-center justify-center flex-1">
        <h1 className={`text-black dark:text-white font-extrabold mb-2 tracking-wide text-2xl sm:text-${skinny ? 3 : 5}xl text-center whitespace-nowrap`}>
          {!skinny ? title : subtext}
        </h1>
        {!skinny ? (
          <h4 className="text-gray-600 dark:text-gray-300 italic text-center">
            {subtext}
          </h4>
        ) : <div />}

      </div>

      {/* Links - Right side */}
      {showLinks && (
        <div className="absolute flex right-10 text-gray-800 dark:text-white gap-5 items-center font-semibold">
          {/* <Link href="/about" className="hover:text-blue-500 dark:hover:text-purple-400 transition-colors">
            About
          </Link> */}

          <button
            type="button"
            className="flex items-center justify-center w-10 h-10"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            aria-pressed={mounted ? isDark : undefined}
            title={mounted ? `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode` : 'Toggle theme'}>
            <AnimatePresence mode="wait" initial={false}>
              {!mounted ? (
                <span className="w-5 h-5" aria-hidden />
              ) : theme === 'dark' ? (
                <motion.div
                  key="sun"
                  initial={{ rotate: -90, scale: 0, opacity: 0 }}
                  animate={{ rotate: 0, scale: 1, opacity: 1 }}
                  exit={{ rotate: 90, scale: 0, opacity: 0 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                >
                  <Sun className="w-5 h-5" />
                </motion.div>
              ) : (
                <motion.div
                  key="moon"
                  initial={{ rotate: 90, scale: 0, opacity: 0 }}
                  animate={{ rotate: 0, scale: 1, opacity: 1 }}
                  exit={{ rotate: -90, scale: 0, opacity: 0 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                >
                  <Moon className="w-5 h-5" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>

          <Link href="/blog" className="hover:text-blue-500 dark:hover:text-purple-400 transition-colors">
            Blogs
          </Link>
          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-purple-400 transition-colors"
              >
                <Image
                  src={avatar}
                  alt="Profile"
                  fill
                  className="object-cover"
                />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-[#2a2a2a] rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-50">
                  <Link
                    href="/profile"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-3 px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <User size={18} />
                    Profile
                  </Link>
                  <Link
                    href="/dashboard"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-3 px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <LayoutDashboard size={18} />
                    Creator Dashboard
                  </Link>
                  <button
                    onClick={async () => {
                      setDropdownOpen(false);
                      await signOut();
                      router.push('/');
                    }}
                    className="flex items-center gap-3 px-4 py-2 w-full text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <LogOut size={18} />
                    Log Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link href="/login" className="hover:text-blue-500 dark:hover:text-purple-400 transition-colors">
              Login
            </Link>
          )}
        </div>
      )}
      {/* Right spacer to balance the layout */}
      <div className="hidden sm:flex w-24" />
    </div>
  );
}

interface HeaderProps {
  title: string;
  subtext: string;
}
