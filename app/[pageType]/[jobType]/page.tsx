import { getDataSource } from '@/lib/data/data-factory';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

import Image from 'next/image';
import Breadcrumb from '@/components/Breadcrumb';
import ServerMarkdown from '@/components/ServerMarkdown';

type Props = {
  params: Promise<{ pageType: string; jobType: string }>;
};

// Generate dynamic metadata in Persian
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { pageType, jobType } = await params;
  const dataSource = getDataSource();
  const content = await dataSource.getContent(pageType, jobType);

  if (!content) {
    return { title: 'صفحه یافت نشد' };
  }

  return {
    title: content.title,
    description: content.description,
    openGraph: {
      title: content.title,
      description: content.description,
      images: content.image ? [content.image] : [],
    },
  };
}

// Generate static paths
export async function generateStaticParams() {
  const dataSource = getDataSource();
  if (dataSource.getAllPaths) {
    const paths = await dataSource.getAllPaths();
    return paths.map((p) => ({
      pageType: p.pageType,
      jobType: p.jobType,
    }));
  }
  return [];
}

export default async function DynamicPage({ params }: Props) {
  const { pageType, jobType } = await params;
  const dataSource = getDataSource();
  const content = await dataSource.getContent(pageType, jobType);

  if (!content) notFound();

  return (
    <>
      <Breadcrumb />
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <article className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold mb-4">{content.title}</h1>
          {content.image && (
            <div className="relative w-full h-64 mb-6">
              <Image src={content.image} alt={content.title} fill className="object-cover rounded-md" priority />
            </div>
          )}
          <p className="text-gray-600 mb-6 text-lg">{content.description}</p>

          {/* ✅ NO Suspense - direct server-side rendering */}
          {content.markdownContent && (
            <ServerMarkdown content={content.markdownContent} />
          )}
        </article>
      </main>
    </>
  );
}