"use client";
import React, { use, useEffect, useState } from "react";
// import { useMediaQuery } from "usehooks-ts";

const CategoryInfo = ({ category }: { category: any }) => {
  return (
    <div
      className="
                    flex 
                    flex-col 
                    md:flex-row 
                    items-center 
                    gap-x-5
                    md:p-4
                  "
    >
      <div className="flex flex-col gap-y-2 mt-4 m-2 md:m-0">
        <p className="hidden md:block font-semibold text-sm">Category</p>
        <h1
          className="
                        text-white 
                        text-5xl 
                        lg:text-7xl 
                        font-bold
                      "
        >
          {category.name}
        </h1>
        <h3 className="text-neutral-200 hover:text-neutral-200 transition select-none">
          {category.description}
        </h3>
      </div>
    </div>
  );
};

export default CategoryInfo;
