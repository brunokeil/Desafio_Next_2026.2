import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seeding process...');
  
  // Create Admin User
  const hashedPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@admin.com' },
    update: {},
    create: {
      name: 'Admin',
      email: 'admin@admin.com',
      password: hashedPassword,
    },
  });
  console.log(`Admin created/exists: ${admin.email}`);

  // Create 50 Products
  console.log('Creating 50 products...');
  const productsToCreate = Array.from({ length: 50 }).map((_, i) => {
    const isSpecial = i % 10 === 0; // Every 10th product is special
    const category = ['Camisas', 'Agasalhos', 'Shorts', 'Acessórios'][i % 4];
    
    return {
      name: `${category} Premium ${i + 1}`,
      description: `Description for ${category} ${i + 1}. Fabricado com os melhores materiais do mercado. ${isSpecial ? 'Edição especial e limitada!' : ''}`,
      price: Number((Math.random() * 300 + 50).toFixed(2)), // Random price between 50 and 350
      stock: Math.floor(Math.random() * 100) + 5,
      imageUrl: `/product-${(i % 4) + 1}.jpg`,
    };
  });

  const createdProducts = await prisma.product.createMany({
    data: productsToCreate,
  });

  console.log(`Successfully created ${createdProducts.count} products!`);
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
