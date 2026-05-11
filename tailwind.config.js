/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#111827',
        muted: '#64748b',
        surface: '#f8fafc',
        line: '#e2e8f0',
        accent: '#2563eb',
        emerald: '#059669',
      },
      boxShadow: {
        soft: '0 20px 60px rgba(15, 23, 42, 0.08)',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
