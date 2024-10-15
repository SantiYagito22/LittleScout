import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#232946',
        main: '#b8c1ec',
        headline: '#fffffe',
        card_background: '#fffffe',
        card_heading: '#232946',
        card_paragraph: '#232946',
        paragraph: '#b8c1ec',
        button: '#eebbc3',
        button_text: '#232946',
        highlight: '#eebbc3',
        tertiary: '#eebbc3',
        stroke: '#121629',
        error_color: '#ff6b6b',
        success_color: '#76c7c1',
      },
    },
  },
  plugins: [],
}
export default config
