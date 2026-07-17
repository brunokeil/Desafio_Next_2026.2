export const dynamic = 'force-dynamic';

import Navbar from "@/components/Navbar";
import LandingPage from "@/components/LandingPage";
import Footer from "@/components/Footer";
import { getProducts } from "@/app/actions/productActions";

export default async function Home() {
  const products = await getProducts();
  
  return (
    <>
      <Navbar />
      <LandingPage initialProducts={products.slice(0, 4)} />
      <Footer />
    </>
  );
}
