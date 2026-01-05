// Navigation icon

import React from "react";
import Link from "next/link";
import Image from "next/image";

export function NavIcon({ data, size = "16", onClick }: Props) {
  const { title, cover_image_id, link } = data;

  const inner = (
    <div
      onClick={onClick}>
      <div className="cursor-pointer flex flex-col items-center justify-center h-fit rounded-2xl">
        <div className="relative w-full h-30 rounded-3xl overflow-hidden">
          <Image
            src={cover_image_id ? `/api/media/${cover_image_id}` : "/pictures/blog/default.png"}
            alt={title ?? "Blog cover"}
            className={`object-contain p-3`}
            fill
            unoptimized // working on this bad solution but i dont have time to set up a cdn and convet my images to webp etc..
          />
        </div>
        <p className="relative text-1xl text-center font-bold">{title}</p>
      </div>
    </div>
  );

  if (link) {
    return (
      <Link href={link} {...(onClick ? { scroll: false } : {})} >
        {inner}
      </Link>
    );
  }
  return inner;
}

export interface NavIconProps {
  id: string;
  title: string;
  cover_image_id: string;
  link?: string;
}

type Props = {
  data: NavIconProps;
  className?: string;
  size?: string;
  onClick?: () => void;
};
