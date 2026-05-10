import Link from 'next/link';

export default function HomePage() {
  const links = [
    { href: '/benefits/clothing-store', label: 'مزایای پیامکی برای فروشگاه پوشاک' },
    { href: '/benefits/salon', label: 'مزایای آرایشگاه و سالن زیبایی' },
    { href: '/pricing/clothing-store', label: 'تعرفه‌های فروشگاه پوشاک' },
    { href: '/features/restaurant', label: 'امکانات رستوران‌ها و کافی‌شاپ‌ها' },
    { href: '/demo/beauty-salon', label: 'نسخه آزمایشی رایگان آرایشگاه زیبایی' },
  ];

  return (
    <main className="container mx-auto p-4 text-center">
      <h1 className="text-4xl font-bold my-6">به سامانه لویالتی‌اس‌ام‌اس خوش آمدید</h1>
      <p className="text-gray-600 mb-8">مشتریان خود را با پیامک هدفمند حفظ کنید و فروش را افزایش دهید.</p>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {links.map((link) => (
          <Link key={link.href} href={link.href} className="block p-4 bg-white rounded-lg shadow hover:shadow-md text-gray-900 transition">
            {link.label}
          </Link>
        ))}
      </div>
    </main>
  );
}