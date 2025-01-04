/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      fontWeight: {
        thin: "100",
        extraLight: "200",
        light: "300",
        normal: "400",
        medium: "500",
        semiBold: "600",
        bold: "700",
        extraBold: "800",
        black: "900",
      },
      colors: {
        black: {
          DEFAULT: "#100b00",
          100: "#030200",
          200: "#060400",
          300: "#090600",
          400: "#0c0800",
          500: "#100b00",
          600: "#724e00",
          700: "#d59200",
          800: "#ffc039",
          900: "#ffe09c",
        },
        blue: {
          DEFAULT: "#4562d9",
          100: "#0a112f",
          200: "#13235f",
          300: "#1d348e",
          400: "#2745be",
          500: "#4562d9",
          600: "#6a82e0",
          700: "#8fa1e8",
          800: "#b4c0f0",
          900: "#dae0f7",
        },
        white: {
          DEFAULT: "#f6f8ff",
          100: "#001664",
          200: "#002bc8",
          300: "#2d5aff",
          400: "#91a9ff",
          500: "#f6f8ff",
          600: "#f7f9ff",
          700: "#f9faff",
          800: "#fbfcff",
          900: "#fdfdff",
        },
      },
      fontSize: {
        xs: "0.75rem", // 12px
        sm: "0.875rem", // 14px
        base: "1rem", // 16px
        lg: "1.125rem", // 18px
        xl: "1.25rem", // 20px
        "2xl": "1.5rem", // 24px
        "3xl": "1.875rem", // 30px
        "4xl": "2.25rem", // 36px
        "5xl": "3rem", // 48px
        "6xl": "3.75rem", // 60px
        "7xl": "4.5rem", // 72px
        "8xl": "6rem", // 96px
        "9xl": "8rem", // 128px
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
