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
        paper: '#f5f6f5',
        line: '#dcdfdc',
        muted: '#5c6360',
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
      },
      fontFamily: {
        sans: ['"Noto Sans JP"', 'system-ui', '-apple-system', '"Segoe UI"', 'sans-serif'],
      },
      maxWidth: {
        site: '72rem',
      },
      // 角丸は控えめにする（丸いアバターなどは rounded-full を使う）
      borderRadius: {
        sm: '2px',
        DEFAULT: '2px',
        md: '3px',
        lg: '3px',
        xl: '4px',
      },
    },
  },
  plugins: [],
} satisfies Config
