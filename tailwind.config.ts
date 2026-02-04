import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class", 
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}", // Agregado para detectar HomeIndex
    "./components/**/*.{js,ts,jsx,tsx,mdx}", // Agregado por seguridad
    "./app/**/*.{js,ts,jsx,tsx,mdx}", // Agregado por seguridad
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(262626)",
        altum: {
          bgsegundary:"#262626",
          violeta: "#5D3FD3",
          aqua: "#3AF2CE",
          gris: "#D7D7D7",
          negro: "#000000",
        },
      },
    },
  },
  plugins: [],
};
export default config;