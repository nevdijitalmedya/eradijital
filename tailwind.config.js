/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#030712", // Derin gece mavisi/siyah
        surface: "#0b0f19",    // Kart yüzey rengi
        primary: {
          DEFAULT: "#6366f1", // Indigo
          hover: "#4f46e5",
        },
        secondary: {
          DEFAULT: "#06b6d4", // Cyan
          hover: "#0891b2",
        },
        accent: {
          DEFAULT: "#a855f7", // Mor
          hover: "#9333ea",
        },
        muted: "#94a3b8",      // Soluk metin gri
        border: "#1f2937",     // Koyu gri kenarlık
      },
      fontFamily: {
        sans: ["Outfit", "Inter", "sans-serif"],
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 6s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        }
      }
    },
  },
  plugins: [],
}
