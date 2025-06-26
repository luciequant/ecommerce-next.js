import { stripe } from "@/lib/stripe";
import { ProductList } from "@/components/product-list";

export default async function ProductsPage() {
  const products = await stripe.products.list({
    expand: ["data.default_price"],
  });

  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold leading-non tracking-tight text-foreground text-center mb-6">
        All Beauty Products
      </h1>
      <ProductList products={products.data} />
    </div>
  );
}
