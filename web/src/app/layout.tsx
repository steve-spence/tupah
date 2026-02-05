// Home Page Layout
"use client";

import React from "react";
import Script from "next/script";
import "@/app/globals.css";
import Footer from "@/components/Footer/Footer";
import { AuthProvider } from "@/contexts/AuthContext";
import { SpeedInsights } from "@vercel/speed-insights/next"



export default function HomeLayout({ children, }: { children: React.ReactNode; }) {
  return (
    <html lang="en">

      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-QFVRS8FXBP"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-QFVRS8FXBP');
          `}
        </Script>
      </head>
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
