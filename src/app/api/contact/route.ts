import { NextResponse } from "next/server";

export const runtime = 'edge'; // ✅ Ahora sí funcionará en Cloudflare

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, company, message } = body;

    // Usamos Resend en lugar de Nodemailer para ser compatibles con Cloudflare Edge
    const RESEND_API_KEY = process.env.RESEND_API_KEY;

    // 1. Notificación para el equipo y 2. Confirmación para el cliente
    // Resend permite enviar correos mediante un simple fetch (HTTP)
    const sendEmail = async (to: string[], subject: string, html: string, fromName: string) => {
      return fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: `${fromName} <onboarding@resend.dev>`, // Una vez verifiques tu dominio en Resend, usa ceo@altumia.co
          to: to,
          subject: subject,
          html: html,
          reply_to: email
        }),
      });
    };

    const internalHtml = `
      <div style="font-family: sans-serif; padding: 20px; border: 1px solid #5d51e8; border-radius: 10px;">
        <h2 style="color: #5d51e8;">Reporte de nuevo contacto</h2>
        <p><strong>Cliente:</strong> ${name}</p>
        <p><strong>Empresa:</strong> ${company || 'No especificada'}</p>
        <p><strong>Email:</strong> ${email}</p>
        <hr style="border: 0; border-top: 1px solid #eee;" />
        <p><strong>Mensaje del cliente:</strong></p>
        <p style="background: #f4f4f4; padding: 15px; border-radius: 5px;">${message}</p>
      </div>
    `;

    const clientHtml = `
      <div style="font-family: sans-serif; max-width: 600px;">
        <p>Estimado/a ${name},</p>
        <p>Gracias por tu interés en <strong>Altumia</strong>. Hemos recibido tu mensaje sobre <strong>${company || 'tu proyecto'}</strong>.</p>
        <p>Personalmente me aseguraré de que nuestro equipo revise tu solicitud y te demos una respuesta en las próximas 24 horas.</p>
        <br />
        <p>Atentamente,</p>
        <p><strong>CEO | Altumia</strong></p>
      </div>
    `;

    // Envío paralelo compatible con Edge
    await Promise.all([
      sendEmail(['ceo@altumia.co', 'service@altumia.co'], `💼 Nueva oportunidad: ${company || name}`, internalHtml, "Altum CEO Office"),
      sendEmail([email], `Hola ${name}, gracias por contactarnos`, clientHtml, "CEO - Altumia")
    ]);

    return NextResponse.json({ success: true }, { status: 200 });

  } catch (error) {
    console.error("Edge Email Error:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}