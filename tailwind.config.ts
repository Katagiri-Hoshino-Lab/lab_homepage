import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#0c1311',
          900: '#0c1311',
          800: '#131c19',
          700: '#1d2925',
          600: '#2c3a35',
        },
        paper: '#f6f5f0',
        line: '#e2e0d8',
        muted: '#5a635f',
        nu: {
          50: '#eef8f2',
          100: '#d6efe0',
          200: '#a8dcbd',
          300: '#6cc596',
          400: '#35a872',
          500: '#178a57',
          600: '#006b3f',
          700: '#005a34',
          800: '#00472a',
          900: '#003620',
        },
        signal: '#4fe3a0',
      },
      fontFamily: {
        sans: ['"Noto Sans JP"', 'system-ui', '-apple-system', '"Segoe UI"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      maxWidth: {
        site: '76rem',
      },
    },
  },
  plugins: [],
} satisfies Config
