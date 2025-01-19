// styles/fonts.ts
import { Space_Grotesk } from 'next/font/google';
import localFont from 'next/font/local';

export const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space',
});

export const forceMajeure = localFont({
  src: [
    {
      path: '../public/fonts/forcemajeure-omj0-webfont.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/forcemajeure-omj0-webfont.woff',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-force',
  display: 'swap',
});