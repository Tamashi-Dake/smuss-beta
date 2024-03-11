"use client";
import useLoadImage from "@/hooks/useLoadImage";
import { Category } from "@/types";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface CategoryProps {
  data: Category;
}

const CategoryItem: React.FC<CategoryProps> = ({ data }) => {
  const router = useRouter();
  const imageUrl = useLoadImage(data);
  return (
    <div
      onClick={() => router.push(`/category/${data.id}`)}
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
      max-w-60
      select-none "
      style={{ backgroundColor: data.color }}
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
        <p className="p-4 text-2xl font-semibold truncate w-full">
          {data.name}
        </p>

        <Image
          draggable={false}
          className="absolute -bottom-4 -right-4 size-20 lg:size-24 rounded-sm overflow-hidden transform rotate-[30deg] group-hover:rotate-0 group-hover:scale-125 group-hover:-translate-x-9 group-hover:-translate-y-9 transition-all duration-500 ease-out"
          src={
            imageUrl && imageUrl.endsWith("null")
              ? "/liked.png"
              : imageUrl || "/liked.png"
          }
          width={400}
          height={400}
          alt="Image"
        />
      </div>
    </div>
  );
};

export default CategoryItem;
