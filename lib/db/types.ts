
export type DbRow = Record<string, unknown>;

export interface DbPageContent {
  id: number;
  pageType: string;
  jobType: string;
  title: string;
  description: string;
  markdownContent: string | null;
  image: string | null;
  createdAt: string; // ISO date string
  updatedAt: string;
}

// Type for insert/update (without auto-generated fields)
export type DbPageContentInput = Omit<DbPageContent, 'id' | 'createdAt' | 'updatedAt'> & {
  markdownContent?: string | null;
  image?: string | null;
};
