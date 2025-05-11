// Home Page Layout

import React from "react";
import '@/app/globals.css'

export default function HomeLayout({ children, }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* Layout UI */}
        {/* Place children where you want to render a page or nested layout */}
        <main>{children}</main>
      </body>
    </html>
  )
}
