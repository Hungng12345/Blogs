import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      /* ===== COLOR SYSTEM (LIGHT CLEAN – SAAS STYLE) ===== */
      colors: {
        bgDark: "#F8FAFC",      // nền tổng (trắng xám – SaaS)
        bgSoft: "#F1F5F9",      // nền section
        cardDark: "#FFFFFF",   // card trắng
        borderSoft: "#E5E7EB", // border nhẹ

        neonBlue: "#2563EB",   // primary blue (rõ, không chói)
        neonOrange: "#F59E0B", // accent cam
      },

      /* ===== FONT SIZE (TO HƠN MẶC ĐỊNH) ===== */
      fontSize: {
        xs: ["12px", "18px"],
        sm: ["14px", "22px"],
        base: ["16.5px", "26px"],   // ⬅ chữ body to & dễ đọc
        lg: ["18px", "28px"],
        xl: ["20px", "30px"],
        "2xl": ["24px", "34px"],
        "3xl": ["30px", "40px"],
        "4xl": ["36px", "46px"],
        "5xl": ["44px", "54px"],
      },

      /* ===== FONT WEIGHT (CHỐNG MỜ) ===== */
      fontWeight: {
        normal: "500",     // body text không còn mỏng
        medium: "600",
        semibold: "700",
        bold: "800",
        extrabold: "900",
      },

      /* ===== LETTER SPACING (ĐẸP CHO HEADING) ===== */
      letterSpacing: {
        tight: "-0.02em",
        tighter: "-0.035em",
      },

      /* ===== SHADOW (MỊN – SẠCH – SAAS) ===== */
      boxShadow: {
        soft: "0 4px 12px rgba(0,0,0,0.06)",
        card: "0 8px 24px rgba(0,0,0,0.08)",
        hover: "0 12px 32px rgba(0,0,0,0.12)",
      },

      /* ===== BORDER RADIUS (HIỆN ĐẠI) ===== */
      borderRadius: {
        xl: "14px",
        "2xl": "18px",
        "3xl": "22px",
      },
    },
  },
  plugins: [],
};

export default config;
