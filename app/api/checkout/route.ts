import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { items } = await request.json();

    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'Carrinho vazio' }, { status: 400 });
    }

    const pagseguroToken = process.env.PAGSEGURO_TOKEN;
    
    // Para teste, se não tiver token vamos retornar sucesso falso ou um erro claro
    if (!pagseguroToken) {
      console.warn("PAGSEGURO_TOKEN não configurado no .env.local");
      return NextResponse.json(
        { error: 'Token do PagSeguro não configurado no servidor (.env.local)' },
        { status: 500 }
      );
    }

    // Definindo ambiente (Sandbox vs Produção)
    const isSandbox = process.env.NODE_ENV !== 'production' || process.env.PAGSEGURO_ENV === 'sandbox';
    const baseUrl = isSandbox 
      ? 'https://sandbox.api.pagseguro.com/checkouts'
      : 'https://api.pagseguro.com/checkouts';

    // Formatando os itens para o padrão da API do PagSeguro (Valores em centavos)
    const formattedItems = items.map((item: any) => ({
      reference_id: String(item.id),
      name: String(item.name).substring(0, 64),
      quantity: item.quantity,
      unit_amount: Math.round(item.price * 100),
    }));

    const body = {
      reference_id: `PEDIDO-${Date.now()}`,
      items: formattedItems,
      customer_modifiable: true,
      payment_methods: [
        { type: "CREDIT_CARD" },
        { type: "BOLETO" },
        { type: "PIX" }
      ],
      redirect_url: 'https://www.nacaorn.com.br/sucesso', 
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
      return NextResponse.json({ error: 'Erro ao gerar checkout' }, { status: 500 });
    }

    // A URL de checkout é retornada na lista de links com rel="PAY"
    const checkoutUrl = data.links?.find((link: any) => link.rel === 'PAY')?.href;

    if (!checkoutUrl) {
      return NextResponse.json({ error: 'Link de pagamento não encontrado na resposta' }, { status: 500 });
    }

    return NextResponse.json({ url: checkoutUrl });
  } catch (error) {
    console.error("Erro interno ao criar checkout:", error);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}
