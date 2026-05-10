// app/layout.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';

// Metadata in Persian for SEO
export const metadata: Metadata = {
  title: {
    template: '%s | سامانه پیامک و وفاداری مشتریان',
    default: 'سامانه پیامک و وفاداری مشتریان | دایرکت.آی آر',
  },
  description:
    'افزایش فروش کسب‌وکارهای کوچک با ارسال پیامک‌های هدفمند، سیستم وفاداری مشتریان و نوبت‌دهی خودکار.',
  keywords: [
    'پیامک تبلیغاتی',
    'وفاداری مشتری',
    'نوبت‌دهی آنلاین',
    'کسب‌وکار کوچک',
  ],
  authors: [{ name: 'حسین خلیلی' }],
  openGraph: {
    title: 'سامانه پیامک و وفاداری مشتریان',
    description:
      'با ارسال پیامک مناسبتی، مشتریان خود را حفظ کنید و فروش را افزایش دهید.',
    url: 'https://yourdomain.com',
    siteName: 'دایرکت.آی آر',
    images: [
      { url: 'https://yourdomain.com/og-image.jpg', width: 1200, height: 630 },
    ],
    locale: 'fa_IR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'سامانه پیامک و وفاداری',
    description: 'افزایش فروش با پیامک هوشمند',
    images: ['https://yourdomain.com/twitter-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='fa' dir='rtl'>
      <body className='flex flex-col min-h-screen'>
        <Navbar />
        <main className='grow py-8 md:py-14 lg:py-18 flex flex-col'>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

// Navbar component - Persian text
function Navbar() {
  return (
    <nav
      className='bg-white shadow-md sticky top-0 z-50'
      aria-label='منوی اصلی'
    >
      <div className='container mx-auto px-4 py-3 flex justify-between items-center'>
        <Link href='/' className='flex items-center space-x-2'>
          {/* Logo placeholder - text in Persian */}
          <div className='w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold'>
            ل
          </div>
          <span className='text-xl font-bold text-gray-800'>
            دایرکت
          </span>
        </Link>
        <div className='hidden md:flex space-x-6'>
          <Link
            href='/benefits/clothing-store'
            className='text-gray-600 hover:text-blue-600'
          >
            مزایا
          </Link>
          <Link
            href='/pricing/clothing-store'
            className='text-gray-600 hover:text-blue-600'
          >
            تعرفه‌ها
          </Link>
          <Link
            href='/features/restaurant'
            className='text-gray-600 hover:text-blue-600'
          >
            امکانات
          </Link>
          <Link
            href='/demo/beauty-salon'
            className='text-gray-600 hover:text-blue-600'
          >
            نسخه آزمایشی
          </Link>
        </div>
        <button className='bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700'>
          شروع کنید
        </button>
      </div>
    </nav>
  );
}

// Footer component - Persian text
function Footer() {
  return (
    <footer className='bg-gray-800 text-white py-8 mt-12'>
      <div className='container mx-auto px-4 text-center'>
        <p>
          &copy; {new Date().getFullYear()} دایرکت_تست . تمامی حقوق محفوظ
          است.
        </p>
        <div className='flex justify-center space-x-4 mt-2'>
          <Link href='/privacy' className='text-gray-400 hover:text-white'>
            حریم خصوصی
          </Link>
          <Link href='/terms' className='text-gray-400 hover:text-white'>
            شرایط استفاده
          </Link>
        </div>
      </div>
    </footer>
  );
}
