export const dynamic = 'force-dynamic';

import { getProducts } from '@/app/actions/productActions';
import ProductsClient from './ProductsClient';

export default async function ProductsPage() {
  const products = await getProducts();
  
  return <ProductsClient initialProducts={products} />;
}
