"use client";

import Box from "@/components/shared/Box";

interface ErrorProps {
  error: Error;
}

const Error: React.FC<ErrorProps> = ({ error }) => {
  return (
    <Box classname="h-full flex flex-col items-center justify-center">
      <h1 className="text-red-400 text-6xl font-extrabold">
        Oops! Something went wrong
      </h1>
      <p className="text-white">{error.message}</p>
    </Box>
  );
};

export default Error;
