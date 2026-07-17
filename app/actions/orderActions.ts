"use server";

import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { decrypt } from "@/lib/session";

export async function getUserOrders() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session")?.value;
  if (!sessionCookie) return [];

  const session = await decrypt(sessionCookie);
  if (!session || !session.userId) return [];

  return await prisma.order.findMany({
    where: { userId: session.userId },
    include: {
      items: {
        include: {
          product: true
        }
      }
    },
    orderBy: { createdAt: 'desc' }
  });
}

export async function getOrderById(orderId: string) {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session")?.value;
  if (!sessionCookie) return null;

  const session = await decrypt(sessionCookie);
  if (!session || !session.userId) return null;

  return await prisma.order.findUnique({
    where: { 
      id: orderId,
      userId: session.userId 
    },
    include: {
      items: {
        include: {
          product: true
        }
      }
    }
  });
}
