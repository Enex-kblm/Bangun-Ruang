import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Bangun Ruang 3D | Belajar Geometri Secara Visual',
  description: 'Lihat dan pelajari bangun ruang 3D seperti kubus dan balok dengan visual interaktif. Mudah dipahami, cocok untuk pelajar!',
  keywords: [
    'bangun ruang',
    'geometri 3D',
    'kubus',
    'balok',
    'visual interaktif',
    'belajar matematika',
  ],
  authors: [{ name: 'gtwuuyyy_', url: 'https://bangun-ruang.vercel.app' }],
  viewport: 'width=device-width, initial-scale=1, maximum-scale=5',
  themeColor: '#ffffff',
  openGraph: {
    title: 'Bangun Ruang 3D | Belajar Geometri Secara Visual',
    description:
      'Pelajari kubus dan balok dalam bentuk 3D interaktif. Lihat diagonal bidang dan diagonal ruang dengan mudah!',
    url: 'https://bangun-ruang.vercel.app',
    siteName: 'Bangun Ruang 3D',
    images: [
      {
        url: '/thumbnail.png', // taruh gambar preview di folder public
        width: 1200,
        height: 630,
        alt: 'Tampilan 3D Bangun Ruang',
      },
    ],
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bangun Ruang 3D | Belajar Geometri Secara Visual',
    description:
      'Visualisasi interaktif kubus dan balok untuk memahami geometri ruang dengan mudah.',
    images: ['/thumbnail.png'],
    creator: '@gtwuuyyy_',
  },
  icons: {
    icon: '/cube.ico',
    shortcut: '/cube.ico',
    apple: '/cube.png',
  },
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className={inter.className} suppressHydrationWarning>{children}</body>
    </html>
  );
}