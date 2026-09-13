/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0a0d14",      // Hallmark Precision Dark Ground (never pure #000)
        surface: {
          DEFAULT: "#111622",      // Primary surface
          elevated: "#171e2e",     // Elevated card / module
          hover: "#1c2436",        // Hover state
        },
        primary: {
          DEFAULT: "#2563eb",      // Electric Cobalt signal
          hover: "#1d4ed8",
          active: "#1e40af",
          subtle: "rgba(37, 99, 235, 0.12)",
        },
        signal: {
          blue: "#3b82f6",
          emerald: "#10b981",      // Operational status
          amber: "#f59e0b",
        },
        ink: {
          DEFAULT: "#f1f5f9",      // Primary text
          muted: "#94a3b8",        // Secondary body text
          faint: "#64748b",        // Tertiary labels / metadata
        },
        border: {
          DEFAULT: "rgba(255, 255, 255, 0.08)",  // Hairline rule
          strong: "rgba(255, 255, 255, 0.16)",
          cobalt: "rgba(37, 99, 235, 0.4)",
        },
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        sans: ["'Inter'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      borderRadius: {
        sm: "4px",
        DEFAULT: "6px",
        md: "8px",
        lg: "10px",
        xl: "14px",
      },
      boxShadow: {
        hairline: "inset 0 0 0 1px rgba(255, 255, 255, 0.08)",
        card: "0 1px 3px 0 rgba(0, 0, 0, 0.4), 0 1px 2px -1px rgba(0, 0, 0, 0.4)",
        elevated: "0 8px 24px -4px rgba(0, 0, 0, 0.6)",
      },
    },
  },
  plugins: [],
}