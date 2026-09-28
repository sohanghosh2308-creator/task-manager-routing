/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        orbitron: ['Orbitron', 'sans-serif'],
        space: ['"Space Grotesk"', 'sans-serif'],
      },
      colors: {
        cyber: {
          bg: '#05070f',
          surface: '#0c1222',
          surfaceHover: '#131d36',
          border: 'rgba(56, 189, 248, 0.15)',
          borderHover: 'rgba(56, 189, 248, 0.4)',
          cyan: '#00f0ff',
          neon: '#06b6d4',
          purple: '#a855f7',
          pink: '#ec4899',
          emerald: '#10b981',
          amber: '#f59e0b',
          rose: '#f43f5e',
        }
      },
      boxShadow: {
        'glow-cyan': '0 0 20px -5px rgba(0, 240, 255, 0.35)',
        'glow-purple': '0 0 20px -5px rgba(168, 85, 247, 0.35)',
        'glow-emerald': '0 0 20px -5px rgba(16, 185, 129, 0.35)',
        'glow-rose': '0 0 20px -5px rgba(244, 63, 94, 0.35)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 12s linear infinite',
        'scanline': 'scanline 8s linear infinite',
      },
      keyframes: {
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' },
        }
      }
    },
  },
  plugins: [],
}
