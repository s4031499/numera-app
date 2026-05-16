import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { UserProvider } from '@/contexts/UserContext';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'NUMERA — Thần Số Học Cá Nhân',
    template: '%s | NUMERA',
  },
  description:
    'Khám phá số chủ đạo, vận mệnh năm và tương hợp của bạn qua thần số học cá nhân. Nhập ngày sinh và tên để nhận lá số ngay lập tức.',
  keywords: [
    'thần số học', 'numerology', 'số chủ đạo', 'life path number',
    'vận mệnh', 'ngày sinh', 'lá số thần số học', 'NUMERA',
  ],
  authors: [{ name: 'NUMERA' }],
  creator: 'NUMERA',
  metadataBase: new URL('https://numera.vercel.app'),
  openGraph: {
    type: 'website',
    locale: 'vi_VN',
    url: 'https://numera.vercel.app',
    siteName: 'NUMERA',
    title: 'NUMERA — Thần Số Học Cá Nhân',
    description:
      'Khám phá số chủ đạo, vận mệnh năm và tương hợp của bạn qua thần số học cá nhân.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'NUMERA — Thần Số Học Cá Nhân',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NUMERA — Thần Số Học Cá Nhân',
    description: 'Khám phá số chủ đạo của bạn ngay hôm nay.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className={`${geistSans.variable} ${geistMono.variable} dark`}>
      <body className="antialiased bg-bg text-text">
        <UserProvider>{children}</UserProvider>
      </body>
    </html>
  );
}
