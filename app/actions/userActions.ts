"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import bcrypt from "bcryptjs"

export async function getUsers() {
  return await prisma.user.findMany({
    orderBy: { createdAt: 'desc' }
  })
}

export async function createUser(formData: FormData) {
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  
  if (!name || !email || !password) throw new Error("Missing fields")

  const hashedPassword = await bcrypt.hash(password, 10)
  await prisma.user.create({
    data: { name, email, password: hashedPassword }
  })
  revalidatePath("/admin/users")
}

export async function updateUser(id: number, formData: FormData) {
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  const data: any = { name, email }
  if (password) {
    data.password = await bcrypt.hash(password, 10)
  }

  await prisma.user.update({
    where: { id },
    data
  })
  revalidatePath("/admin/users")
}

export async function deleteUser(id: number) {
  await prisma.user.delete({ where: { id } })
  revalidatePath("/admin/users")
}
