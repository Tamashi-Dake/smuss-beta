"use client";

import Box from "@/components/shared/Box";

interface ErrorProps {
  error: Error;
}

const Error: React.FC<ErrorProps> = ({ error }) => {
  return (
    <Box classname="h-full flex items-center justify-center">
      <h1 className="text-red-400 text-6xl">Error</h1>
      <p>{error.message}</p>
    </Box>
  );
};

export default Error;
