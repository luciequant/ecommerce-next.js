"use client";

import Stripe from "stripe";
import { Card, CardContent, CardTitle } from "./ui/card";
import { useEffect, useState } from "react";
import Image from "next/image";

interface Props {
  products: Stripe.Product[];
}

export const Carousel = ({ products }: Props) => {
  const [current, setCurrent] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % products.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [products.length]);

  const currentProduct = products[current];

  const price = currentProduct.default_price as Stripe.Price;

  return (
    <Card className="relative overflow-hidden rounded-lg shadow-md border border-gray-300">
      {currentProduct.images && currentProduct.images[0] && (
        <div className="relative w-full h-80 flex items-center justify-center">
          <Image
            src={currentProduct.images[0]}
            alt={currentProduct.name}
            width={350}
            height={350}
            objectFit="cover"
          />
        </div>
      )}

      <CardContent className=" flex flex-col items-center justify-center">
        <CardTitle className="text-3xl font-bold mb-2 text-neutral-400">
          {currentProduct.name}
        </CardTitle>
        {price && price.unit_amount && (
          <p className="text-xl">{(price.unit_amount / 100).toFixed(2)}€</p>
        )}
      </CardContent>
    </Card>
  );
};
