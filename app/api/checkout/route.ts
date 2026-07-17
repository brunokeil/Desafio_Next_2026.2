import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';
import { decrypt } from '@/lib/session';

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("session")?.value;
    if (!sessionCookie) {
      return NextResponse.json({ error: 'Não autorizado. Faça login.' }, { status: 401 });
    }
    
    const session = await decrypt(sessionCookie);
    if (!session || !session.userId) {
      return NextResponse.json({ error: 'Sessão inválida.' }, { status: 401 });
    }

    const { items } = await request.json();

    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'Carrinho vazio' }, { status: 400 });
    }

    // Calcular o total
    const subtotal = items.reduce((acc: number, item: any) => acc + item.price * item.quantity, 0);
    const frete = items.length > 0 ? 29.90 : 0;
    const total = subtotal + frete; // Simplify by not applying coupon here, but in a real app we'd validate it

    // Criar o pedido no banco
    const order = await prisma.order.create({
      data: {
        userId: session.userId,
        total: total,
        status: "payment_pending",
        items: {
          create: items.map((item: any) => ({
            productId: item.id,
            quantity: item.quantity,
            price: item.price,
            size: item.size
          }))
        }
      }
    });

    return NextResponse.json({ url: `/sucesso?orderId=${order.id}` });
  } catch (error) {
    console.error("Erro interno ao criar checkout:", error);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}
