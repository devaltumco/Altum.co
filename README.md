# 🌐 Next.js 16 i18n Starter Template

Una plantilla moderna, ligera y robusta para aplicaciones web multilingües construida con **Next.js 16** y **React 19**.

Este proyecto está pre-configurado con un sistema de internacionalización (i18n) eficiente, soporte para modo oscuro/claro, y componentes de UI responsivos y animados. Ideal para arrancar proyectos globales rápidamente.

## ✨ Características Principales

* **⚡ Next.js 16 & React 19:** Utilizando las últimas versiones estables para el máximo rendimiento.
* **🌍 Internacionalización (i18n):** Implementado con `next-intl`.
    * Configuración lista para **Español** e **Inglés**.
    * **Client Provider Pattern:** Arquitectura optimizada para separar la carga de archivos de traducción y manejar componentes del cliente eficientemente.
* **🎨 UI Moderna:**
    * **Tailwind CSS v3.4:** Estilizado rápido y flexible.
    * **Dark/Light Mode:** Cambio de tema funcional y persistente usando `next-themes`.
    * **Framer Motion:** Animaciones suaves integradas.
    * **Lucide React:** Iconografía limpia y ligera.
* **📱 Responsive Design:**
    * Navbar adaptable con menú móvil y versión de escritorio.
    * Footer pre-diseñado.
    * Página de inicio (`index`) básica lista para modificar.
* **📐 TypeScript:** Tipado estático para un código más seguro y escalable.

## 🛠️ Tecnologías (Stack)

* [Next.js](https://nextjs.org/) (v16.0.0)
* [React](https://react.dev/) (v19.2.0)
* [Next-Intl](https://next-intl-docs.vercel.app/)
* [Tailwind CSS](https://tailwindcss.com/)
* [Framer Motion](https://www.framer.com/motion/)
* [Lucide React](https://lucide.dev/)

## 🚀 Empezando

Sigue estas instrucciones para obtener una copia del proyecto y ejecutarlo en tu máquina local.

### Prerrequisitos

Asegúrate de tener instalado Node.js (versión 20 o superior recomendada).

### Instalación

1.  **Clona el repositorio:**

```bash
git clone https://github.com/JohnDupartDev/web-page-multilingue.git
cd web-page-multilingue
Instala las dependencias:

Bash

npm install
# o
yarn install
# o
pnpm install
Ejecución
Para iniciar el servidor de desarrollo, ejecuta el siguiente comando.

Nota: El servidor está configurado por defecto en el puerto 3002.

Bash

npm run dev
Abre tu navegador en http://localhost:3002 para ver la aplicación.

📂 Estructura de Internacionalización
Este proyecto utiliza next-intl con un enfoque de Client Provider. Esto significa que las traducciones se gestionan de manera que permiten una hidratación correcta tanto en componentes de servidor como de cliente.

Soporte actual: Inglés (en) y Español (es).

Cambio de idioma: Totalmente funcional a través de la interfaz.

📜 Scripts Disponibles
npm run dev: Inicia el entorno de desarrollo en el puerto 3002.

npm run build: Compila la aplicación para producción.

npm run start: Inicia el servidor de producción.

npm run lint: Ejecuta ESLint para verificar la calidad del código.

🤝 Contribución
¡Las contribuciones son bienvenidas! Si tienes ideas para mejorar esta plantilla, siéntete libre de hacer un fork y enviar un Pull Request.

📄 Licencia
Este proyecto está bajo la Licencia MIT.