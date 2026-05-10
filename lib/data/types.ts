import { z } from 'zod';

// Schema for individual page content
export const PageContentSchema = z.object({
  title: z.string(),
  description: z.string(),
  markdownContent: z.string().optional(),
  image: z.string().optional(),
});

export type PageContent = z.infer<typeof PageContentSchema>;

// Schema for entire JSON data: pageType -> jobType -> content
export const JsonDataSchema = z.record(
  z.string(),
  z.record(z.string(), PageContentSchema),
);

export type JsonData = z.infer<typeof JsonDataSchema>;

// Abstract data source interface
export interface DataSource {
  getContent(pageType: string, jobType: string): Promise<PageContent | null>;
  getAllPaths?(): Promise<{ pageType: string; jobType: string }[]>;
}
