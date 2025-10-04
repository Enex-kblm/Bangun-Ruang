import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Bangun Ruang - Website Edukasi Interaktif Geometri 3D',
  description: 'Pelajari geometri bangun ruang secara interaktif dengan visualisasi 3D real-time. Eksplorasi kubus dan balok dengan perhitungan volume dan luas permukaan.',
  keywords: ['geometri', 'bangun ruang', 'matematika', 'edukasi', '3D', 'kubus', 'balok'],
  authors: [{ name: 'Bangun Ruang Team' }],
  viewport: 'width=device-width, initial-scale=1, maximum-scale=5',
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
