import { NextResponse } from "next/server";

export const runtime = "edge";

/* =========================================================
   🔐 CONFIGURACIÓN DE SEGURIDAD
========================================================= */

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MAX_MESSAGE_LENGTH = 2000;
const MAX_BODY_SIZE = 10_000; // 10KB límite anti-DoS
const FETCH_TIMEOUT_MS = 8000;

/* =========================================================
   🔐 UTILIDADES
========================================================= */

const escapeHtml = (str: string) =>
  str.replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  }[char]!));

const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

/* =========================================================
   🚀 ENDPOINT EDGE BLINDADO
========================================================= */

export async function POST(req: Request) {
  try {
    /* =====================================================
       1️⃣ VALIDACIÓN DE CONTENT-TYPE
    ===================================================== */

    const contentType = req.headers.get("content-type");
    if (!contentType?.includes("application/json")) {
      return NextResponse.json(
        { success: false, error: "Invalid content type" },
        { status: 415 }
      );
    }

    /* =====================================================
       2️⃣ PROTECCIÓN ANTI-DOS (BODY SIZE LIMIT)
    ===================================================== */

    const rawText = await req.text();

    if (rawText.length > MAX_BODY_SIZE) {
      return NextResponse.json(
        { success: false, error: "Payload too large" },
        { status: 413 }
      );
    }

    let body: any;
    try {
      body = JSON.parse(rawText);
    } catch {
      return NextResponse.json(
        { success: false, error: "Invalid JSON payload" },
        { status: 400 }
      );
    }

    const { name, email, company, message, website } = body;

    /* =====================================================
       3️⃣ HONEYPOT INTELIGENTE (ANTI-BOT)
    ===================================================== */

    if (website) {
      await sleep(1500); // retraso para bots
      return NextResponse.json({ success: true }, { status: 200 });
    }

    /* =====================================================
       4️⃣ VALIDACIÓN DE TIPOS Y CAMPOS
    ===================================================== */

    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof message !== "string"
    ) {
      return NextResponse.json(
        { success: false, error: "Invalid input types" },
        { status: 400 }
      );
    }

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();
    const trimmedCompany =
      typeof company === "string" ? company.trim() : null;

    if (
      !trimmedName ||
      !trimmedEmail ||
      !trimmedMessage ||
      !emailRegex.test(trimmedEmail) ||
      trimmedMessage.length > MAX_MESSAGE_LENGTH
    ) {
      return NextResponse.json(
        { success: false, error: "Validation failed" },
        { status: 400 }
      );
    }

    /* =====================================================
       5️⃣ API KEY CHECK
    ===================================================== */

    const RESEND_API_KEY = process.env.RESEND_API_KEY;

    if (!RESEND_API_KEY) {
      console.error("❌ Missing RESEND_API_KEY");
      return NextResponse.json(
        { success: false, error: "Server configuration error" },
        { status: 500 }
      );
    }

    /* =====================================================
       6️⃣ SANITIZACIÓN
    ===================================================== */

    const safeName = escapeHtml(trimmedName);
    const safeCompany = trimmedCompany
      ? escapeHtml(trimmedCompany)
      : "No especificada";
    const safeMessage = escapeHtml(trimmedMessage);

    /* =====================================================
       7️⃣ ENVÍO CON TIMEOUT Y CONTROL REAL DE ABORT
    ===================================================== */

    const sendEmail = async (
      to: string[],
      subject: string,
      html: string,
      fromName: string
    ) => {
      const controller = new AbortController();
      const timeout = setTimeout(
        () => controller.abort(),
        FETCH_TIMEOUT_MS
      );

      try {
        const response = await fetch(
          "https://api.resend.com/emails",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${RESEND_API_KEY}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              from: `${fromName} <ceo@altumia.co>`,
              to,
              subject,
              html,
              reply_to: trimmedEmail,
            }),
            signal: controller.signal,
          }
        );

        if (!response.ok) {
          throw new Error(
            `Resend ${response.status}: ${await response.text()}`
          );
        }

        return true;
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") {
          throw new Error("Resend request timeout");
        }
        throw err;
      } finally {
        clearTimeout(timeout);
      }
    };

    /* =====================================================
       8️⃣ TEMPLATES
    ===================================================== */

    const internalHtml = `
      <div style="font-family:sans-serif;border:1px solid #5d51e8;padding:25px;border-radius:12px;">
        <h2 style="color:#5d51e8;margin-top:0;">🚀 Nuevo Lead AltumIA</h2>
        <p><strong>Nombre:</strong> ${safeName}</p>
        <p><strong>Empresa:</strong> ${safeCompany}</p>
        <p><strong>Email:</strong> ${trimmedEmail}</p>
        <hr style="margin:20px 0;">
        <p><strong>Mensaje:</strong></p>
        <div style="background:#f8f9fa;padding:15px;border-left:4px solid #5d51e8;">
          "${safeMessage}"
        </div>
      </div>`;

    const clientHtml = `
      <div style="font-family:sans-serif;line-height:1.6;">
        <p>Hola <strong>${safeName}</strong>,</p>
        <p>
          Hemos recibido tu consulta sobre 
          <strong>${safeCompany === "No especificada" ? "tu proyecto" : safeCompany}</strong>.
        </p>
        <p>Te contactaremos en menos de 24 horas.</p>
        <br>
        <p>Saludos,<br><strong>Oficina del CEO | Altumia</strong></p>
      </div>`;

    /* =====================================================
       9️⃣ ENVÍO ROBUSTO (allSettled + LÓGICA INTELIGENTE)
    ===================================================== */

    const results = await Promise.allSettled([
      sendEmail(
        ["ceo@altumia.co", "service@altumia.co"],
        `💼 Nuevo Lead: ${safeCompany}`,
        internalHtml,
        "AltumIA Sales"
      ),
      sendEmail(
        [trimmedEmail],
        "Recibimos tu mensaje - Altumia",
        clientHtml,
        "CEO Altumia"
      ),
    ]);

    const successCount = results.filter(
      (r) => r.status === "fulfilled"
    ).length;

    results.forEach((res, index) => {
      if (res.status === "rejected") {
        console.error(
          `Email ${index === 0 ? "Interno" : "Cliente"} error:`,
          res.reason
        );
      }
    });

    if (successCount === 0) {
      return NextResponse.json(
        { success: false, error: "Email service unavailable" },
        { status: 502 }
      );
    }

    /* =====================================================
       🔟 RESPUESTA FINAL CON HEADERS EXTRA
    ===================================================== */

    return new NextResponse(
      JSON.stringify({ success: true }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "X-Content-Type-Options": "nosniff",
          "X-Frame-Options": "DENY",
        },
      }
    );

  } catch (error) {
    console.error(
      "❌ Critical Edge Error:",
      error instanceof Error ? error.message : error
    );

    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
