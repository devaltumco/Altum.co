"use server";

import { z } from "zod";

const contactSchema = z.object({
    name: z.string().min(2, "El nombre debe tener al menos 2 caracteres."),
    email: z.string().email("Correo electrónico inválido."),
    company: z.string().optional(),
    message: z.string().min(10, "El mensaje debe tener al menos 10 caracteres."),
});

export async function handleContact(input: z.infer<typeof contactSchema>) {
    const validatedInput = contactSchema.safeParse(input);
    
    if (!validatedInput.success) {
        return { 
          success: false, 
          message: "Datos inválidos.", 
          errors: validatedInput.error.flatten().fieldErrors 
        };
    }

    try {
        const { name, email, company, message } = validatedInput.data;

        // Usamos la API de Resend directamente con fetch para evitar errores de Webpack/Stream
        const response = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                from: "Altum Web <onboarding@resend.dev>", 
                to: ["info@altum.co"],
                reply_to: email,
                subject: `Nuevo mensaje de: ${name}`,
                html: `
                    <div style="font-family: sans-serif; max-width: 600px;">
                        <h2>Nuevo contacto recibido</h2>
                        <p><strong>Nombre:</strong> ${name}</p>
                        <p><strong>Email:</strong> ${email}</p>
                        <p><strong>Empresa:</strong> ${company || 'No especificada'}</p>
                        <p><strong>Mensaje:</strong></p>
                        <p style="white-space: pre-wrap;">${message}</p>
                    </div>
                `,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Resend API Error:", errorData);
            return { success: false, message: "Error al enviar el correo a través de la API." };
        }

        return { success: true, message: "¡Mensaje enviado con éxito!" };
    } catch (error) {
        console.error("Fetch Error:", error);
        return { success: false, message: "Error de conexión con el servidor de correos." };
    }
}