"use client";

import { useEffect, useState } from "react";

import AuthModal from "@/components/patials/AuthModal";
import CreateModal from "@/components/patials/CreateModal";
// import SubscribeModal from "@/components/SubscribeModal";
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
      <CreateModal />
    </>
  );
};

export default ModalProvider;
