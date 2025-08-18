import React from "react";
import { generatePageMetadata } from "@/lib/metadata";

export const metadata = generatePageMetadata(
  "WitchPaw - Tupah",
  "WitchPaw project by Tupah - Coming Soon!",
  "/projects/witchpaw"
);

export default function WitchPawPage() {
  return (
    <div>
      <h1 className="text-center relative text-3xl p-5 h-200">Coming Soon!</h1>
    </div>
  );
}
