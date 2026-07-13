"use server";

import { prisma } from "@/lib/prisma";
import { createSession, deleteSession, decrypt } from "@/lib/session";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";

export async function register(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!name || !email || !password) {
    return { error: "Todos os campos são obrigatórios." };
  }

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return { error: "E-mail já está em uso." };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  await createSession(user.id, user.email, user.name, user.photo);

  return { success: true };
}

export async function login(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "E-mail e senha são obrigatórios." };
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return { error: "Credenciais inválidas." };
  }

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return { error: "Credenciais inválidas." };
  }

  await createSession(user.id, user.email, user.name, user.photo);

  return { success: true };
}

export async function logout() {
  await deleteSession();
  return { success: true };
}

export async function getSessionUser() {
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;
  if (!session) return null;

  const payload = await decrypt(session);
  if (!payload) return null;

  return {
    email: payload.email,
    name: payload.name,
    photo: payload.photo,
  };
}
