import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { items } = await request.json();

    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'Carrinho vazio' }, { status: 400 });
    }

    // SIMULATED PAGSEGURO CHECKOUT:
    // As we cannot pay via PagSeguro without a valid token in this sandbox,
    // we simulate a successful checkout generation by directly returning the success URL.
    
    return NextResponse.json({ url: '/sucesso' });
  } catch (error) {
    console.error("Erro interno ao criar checkout:", error);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}
