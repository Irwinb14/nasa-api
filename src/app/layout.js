import './globals.css';
import { Inter } from 'next/font/google';
import Head from 'next/head';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'NASA-APOD',
  description: 'Created by Bryan',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <Head>
        <link rel='shortcut icon' href='/favicon.ico' />
      </Head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
