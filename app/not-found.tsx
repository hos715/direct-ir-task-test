import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center grow">
      <h1 className="text-4xl font-bold mb-4">۴۰۴</h1>
      <h2 className="text-2xl mb-4">صفحه مورد نظر یافت نشد</h2>
      <p className="text-gray-600 mb-6">نوع صفحه یا شغل نامعتبر است.</p>
      <Link href="/" className="text-blue-600 hover:underline">
        بازگشت به خانه
      </Link>
    </div>
  );
}