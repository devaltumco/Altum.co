/* eslint-disable @typescript-eslint/no-explicit-any */
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  // Obtenemos el locale solicitado
  const requested = await requestLocale;

  // CORRECCIÓN: Usamos .includes en lugar de hasLocale para evitar el error de importación
  const locale = (requested && routing.locales.includes(requested as any))
    ? requested
    : routing.defaultLocale;

  // Cargamos los mensajes base (layout.json)
  // Nota: Asegúrate de que la ruta sea correcta según tu estructura
 const layoutMessages = (await import(`../../messages/${locale}/layout.json`)).default;
  const blogMessages = (await import(`../../messages/${locale}/Blog.json`)).default;

  return {
    locale,
    messages: {
      ...layoutMessages,
      ...blogMessages,
    },
  };
});