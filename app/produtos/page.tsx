export const dynamic = 'force-dynamic';

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Produtos from "@/components/Produtos";
import { getProducts } from "@/app/actions/productActions";

export default async function ProdutosPage() {
  const products = await getProducts();
  
  return (
    <>
      <Navbar />
      <Produtos initialProducts={products} />
      <Footer />
    </>
  );
}
