"use client";
import useLoadImage from "@/hooks/useLoadImage";
import { Category } from "@/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { use } from "react";
import PlayButton from "./PlayButton";

interface CategoryProps {
  data: Category;
}

const CategoryItem: React.FC<CategoryProps> = ({ data }) => {
  const router = useRouter();
  const imageUrl = useLoadImage(data);
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  return (
    <div
      onClick={() =>
        // router.push(`/category/${data.id}`)
        console.log(data.id)
      }
      className="relative 
      group 
      items-center 
      justify-center 
      rounded-md 
      overflow-hidden 
      gap-x-4 
      text-white
      hover:bg-neutral-400/10 
      cursor-pointer 
      transition 
      min-w-28
      max-w-52
      select-none "
      style={{ backgroundColor: `#${randomColor}` }}
    >
      <div
        className="
          relative 
          aspect-square 
          w-full
          h-full 
          rounded-md 
          overflow-hidden
        "
      >
        <p className="absolute top-4 left-4 text-2xl font-semibold truncate w-full">
          {data.name}
        </p>

        <Image
          draggable={false}
          className="absolute -bottom-4 -right-4 w-24 h-24 rounded-sm overflow-hidden transform rotate-[30deg] group-hover:rotate-0 group-hover:scale-125 group-hover:-translate-x-10 group-hover:-translate-y-10 transition-all duration-500 ease-out"
          src={
            imageUrl && imageUrl.endsWith("null")
              ? "/liked.png"
              : imageUrl || "/liked.png"
          }
          width={400}
          height={400}
          alt="Image"
          priority={true}
        />
      </div>
    </div>
  );
};

export default CategoryItem;
