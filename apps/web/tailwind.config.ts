import type { Config } from 'tailwindcss';

const tileColors = {
  2:   '#eee4da',
  4:   '#ede0c8',
  8:   '#f2b179',
  16:  '#f59563',
  32:  '#f67c5f',
  64:  '#f65e3b',
  128: '#edcf72',
  256: '#edcc61',
  512: '#edc850',
  1024:'#edc53f',
  2048:'#edc22e',
} as const;

export default {
  content: {
    files: [
      './index.html',
      './src/**/*.{ts,tsx,js,jsx}',
      '../../packages/core/src/**/*.{ts,tsx}',
    ],
  },

  theme: {
    extend: {
      colors: { tile: tileColors },
    },
  },
  plugins: [],
} satisfies Config;
