// import { DataSource, PageContent } from './types';

// export class DbDataSource implements DataSource {
//   async getContent(pageType: string, jobType: string): Promise<PageContent | null> {
//     // TODO: implement database connection (e.g., Prisma + PostgreSQL)
//     console.warn('Database not implemented; returning null');
//     return null;
//   }
// }




import { getPageContent, getAllPaths, initDb } from '@/lib/db/sqlite-js';
import { DataSource, PageContent } from './types';

export class DbDataSource implements DataSource {
  constructor() {
    // Ensure table exists when data source is created
    initDb().catch(console.error);
  }

  async getContent(pageType: string, jobType: string): Promise<PageContent | null> {
    const row = await getPageContent(pageType, jobType);
    if (!row) return null;
    return {
      title: row.title,
      description: row.description,
      markdownContent: row.markdownContent ?? undefined,
      image: row.image ?? undefined,
    };
  }

  async getAllPaths(): Promise<{ pageType: string; jobType: string }[]> {
    return await getAllPaths();
  }
}