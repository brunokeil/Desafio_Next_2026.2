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
        status: "confirmed",
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

    const pagseguroToken = process.env.PAGSEGURO_TOKEN;
    if (!pagseguroToken) {
      console.warn("PAGSEGURO_TOKEN não configurado. Redirecionando para sucesso.");
      return NextResponse.json({ url: `/sucesso?orderId=${order.id}` });
    }

    const isSandbox = process.env.NODE_ENV !== 'production' || process.env.PAGSEGURO_ENV === 'sandbox';
    const baseUrl = isSandbox 
      ? 'https://sandbox.api.pagseguro.com/checkouts'
      : 'https://api.pagseguro.com/checkouts';

    const formattedItems = items.map((item: any) => ({
      reference_id: String(item.id),
      name: String(item.name).substring(0, 64),
      quantity: item.quantity,
      unit_amount: Math.round(item.price * 100),
    }));

    const body = {
      reference_id: String(order.id),
      items: formattedItems,
      customer_modifiable: true,
      payment_methods: [
        { type: "CREDIT_CARD" },
        { type: "BOLETO" },
        { type: "PIX" }
      ],
      redirect_url: `http://localhost:3000/sucesso?orderId=${order.id}`, 
    };

    const response = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${pagseguroToken}`,
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Erro na resposta do PagSeguro:", data);
      return NextResponse.json({ url: `/sucesso?orderId=${order.id}` });
    }

    const checkoutUrl = data.links?.find((link: any) => link.rel === 'PAY')?.href;

    if (!checkoutUrl) {
      return NextResponse.json({ url: `/sucesso?orderId=${order.id}` });
    }

    return NextResponse.json({ url: checkoutUrl });
  } catch (error) {
    console.error("Erro interno ao criar checkout:", error);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}
