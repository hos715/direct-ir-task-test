import rawData from '@/data/content.json';
import { DataSource, PageContent, JsonDataSchema, JsonData } from './types';

export class JsonDataSource implements DataSource {
  private data: JsonData;

  constructor() {
    // Validate JSON structure at runtime (no `any`)
    const result = JsonDataSchema.safeParse(rawData);
    if (!result.success) {
      throw new Error('Invalid JSON data: ' + result.error.message);
    }
    this.data = result.data;
  }

  async getContent(
    pageType: string,
    jobType: string,
  ): Promise<PageContent | null> {
    const page = this.data[pageType];
    if (!page) return null;
    const content = page[jobType];
    return content || null;
  }

  async getAllPaths(): Promise<{ pageType: string; jobType: string }[]> {
    const paths: { pageType: string; jobType: string }[] = [];
    for (const pageType in this.data) {
      for (const jobType in this.data[pageType]) {
        paths.push({ pageType, jobType });
      }
    }
    return paths;
  }
}
