import Link from "next/link";
import Stripe from "stripe";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import Image from "next/image";
import { Button } from "./ui/button";

interface Props {
  product: Stripe.Product;
}

export const ProductCard = ({ product }: Props) => {
  const price = product.default_price as Stripe.Price;

  return (
    <Link href={`/products/${product.id}`} className="block h-full">
      <Card className="group hover:shadow-2xl transition duration-300 py-0 h-full flex flex-col border-gray-300 gap-0">
        {product.images && product.images[0] && (
          <div className="relative w-full h-80 flex items-center justify-center">
            <Image
              src={product.images[0]}
              alt={product.name}
              width={250}
              height={250}
              className="group-hover:opacity-70 transition-opacity duration-300"
            />
          </div>
        )}
        <CardHeader className="p-4 flex flex-col items-center">
          <CardTitle className="text-xl text-center font-bold text-gray-800">
            {product.name}
          </CardTitle>
          <CardContent className="w-full flex flex-col items-center">
            {product.description && (
              <p
                className="text-neutral-400 text-sm mb- tracking-tighter
"
              >
                {product.description.split(" ").slice(0, 10).join(" ")}
                {product.description.split(" ").length > 10 ? "..." : ""}
              </p>
            )}
            {price && price.unit_amount && (
              <p className="mt-2 text-center">
                {(price.unit_amount / 100).toFixed(2)}€
              </p>
            )}
            <Button className="my-6 bg-[#AC957D] text-white">
              View Details
            </Button>
          </CardContent>
        </CardHeader>
      </Card>
    </Link>
  );
};
