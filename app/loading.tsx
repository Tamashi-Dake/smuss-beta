"use client";
import Lottie from "lottie-react";
import loadingAnimation from "@/public/loading.json";
const Loading: React.FC = () => {
  return (
    <div className="text-center w-full">
      <Lottie
        animationData={loadingAnimation}
        loop={true}
        className="size-80 mx-auto"
      />
      <p className="text-sm text-gray-400">Please wait</p>
    </div>
  );
};

export default Loading;
