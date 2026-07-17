"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function getProducts() {
  return await prisma.product.findMany({
    orderBy: { createdAt: 'desc' }
  })
}

export async function createProduct(formData: FormData) {
  const name = formData.get("name") as string
  const description = formData.get("description") as string
  const price = parseFloat(formData.get("price") as string)
  const stock = parseInt(formData.get("stock") as string, 10) || 0
  const imageUrl = formData.get("imageUrl") as string
  const category = formData.get("category") as string
  
  if (!name || isNaN(price)) throw new Error("Missing required fields")

  await prisma.product.create({
    data: { name, description, price, stock, imageUrl, category }
  })
  revalidatePath("/admin/products")
}

export async function updateProduct(id: number, formData: FormData) {
  const name = formData.get("name") as string
  const description = formData.get("description") as string
  const price = parseFloat(formData.get("price") as string)
  const stock = parseInt(formData.get("stock") as string, 10) || 0
  const imageUrl = formData.get("imageUrl") as string
  const category = formData.get("category") as string

  await prisma.product.update({
    where: { id },
    data: { name, description, price, stock, imageUrl, category }
  })
  revalidatePath("/admin/products")
}

export async function deleteProduct(id: number) {
  await prisma.product.delete({ where: { id } })
  revalidatePath("/admin/products")
}
