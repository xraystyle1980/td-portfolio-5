// styles/fonts.ts
import { Source_Serif_4 } from 'next/font/google';
import localFont from 'next/font/local';

export const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-source-serif',
});

export const cooper = localFont({
  src: '../public/fonts/Cooper-var.ttf',
  variable: '--font-cooper',
});