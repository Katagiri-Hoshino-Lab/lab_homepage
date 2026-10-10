import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#0f172a',
          900: '#0f172a',
          800: '#1e293b',
          700: '#334155',
          600: '#475569',
        },
        paper: '#ffffff',
        line: '#e2e8f0',
        muted: '#475569',
        nu: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        signal: '#93c5fd',
      },
      fontFamily: {
        sans: ['"Noto Sans JP"', 'system-ui', '-apple-system', '"Segoe UI"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      maxWidth: {
        site: '1100px',
      },
    },
  },
  plugins: [],
} satisfies Config
