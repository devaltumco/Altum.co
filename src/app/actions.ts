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
        // Llamamos a nuestro Route Handler interno
        const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || ''}/api/contact`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(validatedInput.data),
        });

        const result = await response.json();

        if (result.success) {
            return { success: true, message: "¡Mensaje enviado con éxito!" };
        } else {
            return { success: false, message: "Error en el servidor de correos." };
        }
    } catch (error) {
        console.error("Fetch Error:", error);
        return { success: false, message: "Error de conexión." };
    }
}