import { PRODUCTS } from "@/lib/products";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductClient from "./ProductClient";
import { notFound } from "next/navigation";

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = PRODUCTS.find((p) => p.id === parseInt(id));

  if (!product) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <ProductClient product={product} />
      <Footer />
    </>
  );
}
