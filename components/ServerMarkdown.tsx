// This is a Server Component (no 'use client')

import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import rehypeRaw from 'rehype-raw'; // optional: to allow raw HTML inside markdown

interface Props {
  content: string;
}

export default async function ServerMarkdown({ content }: Props) {
  // Convert markdown to HTML on the server
  const processed = await remark()
    .use(remarkGfm) // support tables, strikethrough, etc.
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw) // allow raw HTML inside markdown (optional)
    .use(rehypeStringify)
    .process(content);

  const html = processed.toString();

  return (
    <div
      className='prose prose-lg max-w-none'
      dir='rtl'
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
