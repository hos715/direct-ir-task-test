import { initDb, upsertPageContent, closeDb } from '../lib/db/sqlite-js';
import rawData from '../data/content.json';
import { JsonDataSchema } from '../lib/data/types';
import type { DbPageContentInput } from '../lib/db/types';

async function seed() {
  console.log('Validating JSON data with Zod...');
  const result = JsonDataSchema.safeParse(rawData);
  if (!result.success) {
    console.error('Invalid JSON structure:', result.error.message);
    process.exit(1);
  }

  const validData = result.data;
  console.log('Initializing database...');
  await initDb();

  for (const [pageType, jobs] of Object.entries(validData)) {
    for (const [jobType, content] of Object.entries(jobs)) {
      const record: DbPageContentInput = {
        pageType,
        jobType,
        title: content.title,
        description: content.description,
        markdownContent: content.markdownContent || null,
        image: content.image || null,
      };
      await upsertPageContent(record);
      console.log(`✅ Inserted: ${pageType}/${jobType}`);
    }
  }

  await closeDb();
  console.log('🎉 Seeding completed successfully!');
}

seed().catch(err => {
  console.error('❌ Seeding error:', err);
  process.exit(1);
});