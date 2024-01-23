"use client";

import { useEffect, useState } from "react";

import AuthModal from "@/components/patials/AuthModal";
// import SubscribeModal from "@/components/SubscribeModal";
// import UploadModal from "@/components/UploadModal";
// import { ProductWithPrice } from "@/types_stripe";

interface ModalProviderProps {
  //   products: ProductWithPrice[];
}

const ModalProvider: React.FC<ModalProviderProps> = (
  {
    //   products
  }
) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <AuthModal />
      {/* <SubscribeModal products={products} /> */}
      {/* <UploadModal /> */}
    </>
  );
};

export default ModalProvider;
