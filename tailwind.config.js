import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    path.join(__dirname, 'index.html'),
    path.join(__dirname, 'src/**/*.{js,ts,jsx,tsx}'),
  ],
  theme: {
    extend: {
      colors: {
        obsidian: {
          DEFAULT: '#080A0F',
          950: '#040508',
          900: '#080A0F',
          850: '#0B0F17',
          800: '#0E131C',
        },
        graphite: {
          DEFAULT: '#111722',
          900: '#111722',
          850: '#141C2A',
          800: '#182130',
          700: '#232E42',
          600: '#334158',
        },
        stark: {
          DEFAULT: '#E62429',
          crimson: '#E62429',
          glow: '#FF3B41',
          dark: '#B0161A',
        },
        reactor: {
          DEFAULT: '#56D8FF',
          cyan: '#56D8FF',
          glow: '#86E3FF',
          dark: '#1E96C8',
        },
        silver: {
          DEFAULT: '#A9B2C0',
          muted: '#A9B2C0',
          light: '#D3D8E2',
          dark: '#687385',
        },
        pure: {
          white: '#F4F6FA',
        }
      },
      fontFamily: {
        display: ['"Rajdhani"', '"Barlow Condensed"', 'sans-serif'],
        sans: ['"Inter"', 'sans-serif'],
        mono: ['"IBM Plex Mono"', '"JetBrains Mono"', 'monospace'],
      },
      animation: {
        'spin-slow': 'spin 22s linear infinite',
        'spin-reverse-slow': 'spin-reverse 28s linear infinite',
        'spin-orbit': 'spin 12s linear infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        'pulse-glow-crimson': 'pulse-glow-crimson 3.5s ease-in-out infinite',
        'scanline': 'scanline 8s linear infinite',
        'radar-sweep': 'radar-sweep 4s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 7s ease-in-out 2s infinite',
        'hologram-shimmer': 'hologram-shimmer 4s ease infinite',
        'aurora': 'aurora 15s ease infinite',
        'beam': 'beam 3s ease-in-out infinite',
      },
      keyframes: {
        'spin-reverse': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(-360deg)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.45', filter: 'drop-shadow(0 0 15px rgba(86, 216, 255, 0.4))' },
          '50%': { opacity: '0.9', filter: 'drop-shadow(0 0 35px rgba(86, 216, 255, 0.85))' },
        },
        'pulse-glow-crimson': {
          '0%, 100%': { opacity: '0.4', filter: 'drop-shadow(0 0 15px rgba(230, 36, 41, 0.35))' },
          '50%': { opacity: '0.85', filter: 'drop-shadow(0 0 35px rgba(230, 36, 41, 0.75))' },
        },
        'scanline': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' },
        },
        'radar-sweep': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'hologram-shimmer': {
          '0%, 100%': { opacity: '0.8', filter: 'hue-rotate(0deg)' },
          '50%': { opacity: '1', filter: 'hue-rotate(15deg)' },
        },
        'aurora': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        'beam': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(200%)' },
        }
      },
      backgroundImage: {
        'grid-pattern': "linear-gradient(to right, rgba(86, 216, 255, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(86, 216, 255, 0.05) 1px, transparent 1px)",
        'dots-pattern': "radial-gradient(rgba(169, 178, 192, 0.15) 1px, transparent 1px)",
        'artistic-glow': "radial-gradient(ellipse at 50% 0%, rgba(86, 216, 255, 0.18) 0%, rgba(230, 36, 41, 0.08) 45%, transparent 70%)",
        'hologram-gradient': "linear-gradient(135deg, rgba(86, 216, 255, 0.2) 0%, rgba(230, 36, 41, 0.15) 50%, rgba(16, 185, 129, 0.15) 100%)",
      }
    },
  },
  plugins: [],
}
