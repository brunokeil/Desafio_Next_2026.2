import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { GraphQLClient, gql } from 'graphql-request';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nome, email, assunto, mensagem } = body;

    if (!nome || !email || !assunto || !mensagem) {
      return NextResponse.json({ error: 'Todos os campos são obrigatórios' }, { status: 400 });
    }

    // 1. Enviar para o Hygraph
    const hygraphEndpoint = process.env.HYGRAPH_ENDPOINT || '';
    const hygraphToken = process.env.HYGRAPH_TOKEN || '';

    if (hygraphEndpoint && hygraphToken) {
      const graphQLClient = new GraphQLClient(hygraphEndpoint, {
        headers: {
          authorization: `Bearer ${hygraphToken}`,
        },
      });

      // Aqui você deve usar o nome exato da mutation de acordo com o seu schema no Hygraph
      const mutation = gql`
        mutation CreateContact($nome: String!, $email: String!, $assunto: String!, $mensagem: String!) {
          createContato(
            data: { nome: $nome, email: $email, assunto: $assunto, mensagem: $mensagem }
          ) {
            id
          }
        }
      `;

      await graphQLClient.request(mutation, { nome, email, assunto, mensagem });
    } else {
      console.warn("Aviso: Hygraph credentials ausentes no .env");
    }

    // 2. Enviar email via Mailtrap
    const mailtrapUser = process.env.MAILTRAP_USER || '';
    const mailtrapPass = process.env.MAILTRAP_PASS || '';

    if (mailtrapUser && mailtrapPass) {
      const transporter = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: mailtrapUser,
          pass: mailtrapPass
        }
      });

      // Envia uma única notificação para o admin para evitar limite de taxa (1 email/s) no plano free do Mailtrap
      await transporter.sendMail({
        from: '"Site" <no-reply@nacaorn.com.br>',
        to: "admin@nacaorn.com.br", 
        replyTo: email,
        subject: `Novo Contato recebido: ${assunto}`,
        text: `Nova mensagem recebida de ${nome} (${email}):\n\n${mensagem}`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0a0a0a; color: #e6e6e6; padding: 40px 20px; min-height: 100vh;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #111111; border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; overflow: hidden; box-shadow: 0 10px 40px rgba(0,0,0,0.5);">
              
              <!-- Header -->
              <div style="background: linear-gradient(135deg, #d4171e, #8b0000); padding: 32px 24px; text-align: center;">
                <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 900; text-transform: uppercase; letter-spacing: -0.5px;">
                  Nação <span style="color: #f0d678;">Rubro-Negra</span>
                </h1>
                <p style="margin: 8px 0 0 0; color: rgba(255,255,255,0.8); font-size: 14px; font-weight: 500; text-transform: uppercase; letter-spacing: 2px;">
                  Novo Contato
                </p>
              </div>

              <!-- Content -->
              <div style="padding: 40px 32px;">
                
                <div style="margin-bottom: 24px;">
                  <p style="margin: 0 0 8px 0; font-size: 12px; color: #737373; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">Nome do Torcedor</p>
                  <p style="margin: 0; font-size: 16px; color: #ffffff; background-color: #080808; padding: 16px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.05);">${nome}</p>
                </div>
                
                <div style="margin-bottom: 24px;">
                  <p style="margin: 0 0 8px 0; font-size: 12px; color: #737373; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">E-mail para resposta</p>
                  <p style="margin: 0; font-size: 16px; color: #ffffff; background-color: #080808; padding: 16px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.05);">
                    <a href="mailto:${email}" style="color: #c9a84c; text-decoration: none;">${email}</a>
                  </p>
                </div>
                
                <div style="margin-bottom: 24px;">
                  <p style="margin: 0 0 8px 0; font-size: 12px; color: #737373; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">Assunto</p>
                  <p style="margin: 0; font-size: 16px; color: #ffffff; background-color: #080808; padding: 16px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.05); font-weight: 500;">${assunto}</p>
                </div>
                
                <div style="margin-bottom: 8px;">
                  <p style="margin: 0 0 8px 0; font-size: 12px; color: #737373; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">Mensagem</p>
                  <div style="margin: 0; font-size: 15px; color: #d4d4d4; background-color: #080808; padding: 20px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.05); line-height: 1.6; white-space: pre-wrap;">${mensagem}</div>
                </div>
                
              </div>

              <!-- Footer -->
              <div style="background-color: #080808; padding: 24px; text-align: center; border-top: 1px solid rgba(255,255,255,0.05);">
                <p style="margin: 0 0 8px 0; font-size: 12px; color: #525252;">
                  Este é um e-mail automático enviado a partir do formulário de contato.
                </p>
                <p style="margin: 0; font-size: 12px; color: #404040;">
                  &copy; ${new Date().getFullYear()} Nação Rubro-Negra
                </p>
              </div>
              
            </div>
          </div>
        `
      });
    } else {
      console.warn("Aviso: Mailtrap credentials ausentes no .env");
    }

    return NextResponse.json({ success: true, message: 'Mensagem enviada com sucesso!' });
  } catch (error) {
    console.error("Erro no envio do contato:", error);
    return NextResponse.json({ error: 'Erro ao enviar a mensagem' }, { status: 500 });
  }
}
