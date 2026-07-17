export const dynamic = 'force-dynamic';

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductClient from "./ProductClient";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const product = await prisma.product.findUnique({
    where: { id: parseInt(id) }
  });

  if (!product) {
    notFound();
  }

  // Map imageUrl to image to preserve ProductClient compatibility
  const mappedProduct = {
    ...product,
    image: product.imageUrl || "/product-1.jpg",
    badge: product.name.includes("Premium") ? "Premium" : null,
    category: product.category || "Tudo",
    description: product.description || ""
  };

  return (
    <>
      <Navbar />
      <ProductClient product={mappedProduct} />
      <Footer />
    </>
  );
}
