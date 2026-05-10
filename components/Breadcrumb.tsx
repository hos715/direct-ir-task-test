// components/Breadcrumb.tsx
'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function Breadcrumb() {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);

  if (segments.length === 0) return null;

  // Persian mapping for URL segments
  const persianLabels: Record<string, string> = {
    benefits: 'مزایا',
    pricing: 'تعرفه‌ها',
    features: 'امکانات',
    demo: 'نسخه آزمایشی',
    'clothing-store': 'فروشگاه پوشاک',
    salon: 'آرایشگاه',
    restaurant: 'رستوران',
    'beauty-salon': 'آرایشگاه زیبایی',
  };

  return (
    <nav
      className='container mx-auto px-4 py-3 text-sm text-gray-500'
      aria-label='breadcrumb'
    >
      <ol className='flex flex-wrap'>
        <li>
          <Link href='/' className='hover:text-blue-600'>
            خانه
          </Link>
        </li>
        {segments.map((segment, index) => {
          const href = '/' + segments.slice(0, index + 1).join('/');
          const isLast = index === segments.length - 1;
          const label = persianLabels[segment] || decodeURIComponent(segment);
          return (
            <li key={href} className='flex items-center'>
              <span className='mx-2'>/</span>
              {isLast ? (
                <span className='text-gray-700'>{label}</span>
              ) : (
                <Link href={href} className='hover:text-blue-600'>
                  {label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
