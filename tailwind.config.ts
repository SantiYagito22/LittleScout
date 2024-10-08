import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        headline: "var(--primary-color)",
        card_background:"var(card-background)",
        card_heading: "var(--card-heading)",
        paragraph: "var(--paragraph)",
        button: "var(--button)",
        button_text: "var(button-text)",
        highlight: "var(--highlight)",
        tertiary: "var(--tertiary)",
        stroke: "var(--stroke)",
        error_color: "var(-error)",
        success_color: "var(--success-color)"
      },
    },
  },
  plugins: [],
};
export default config;
