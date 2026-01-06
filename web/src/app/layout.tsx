// Home Page Layout
"use client";

import React from "react";
import "@/app/globals.css";
import Footer from "@/components/Footer/Footer";
import { AuthProvider } from "@/contexts/AuthContext";
import { SpeedInsights } from "@vercel/speed-insights/next"



export default function HomeLayout({ children, }: { children: React.ReactNode; }) {
  return (
    <html lang="en">
      <body className="flex flex-col">
        <AuthProvider>
          <main className={`transition-all duration-300 flex-1 overflow-x-hidden overflow-y-auto`}>
            {children}
          </main>
          <SpeedInsights />
          <Footer />
        </AuthProvider>
      </body >
    </html >
  );
}
