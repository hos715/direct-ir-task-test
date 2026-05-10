// lib/db/sqlite-js.ts
import initSqlJs, { Database } from 'sql.js';
import fs from 'fs';
import path from 'path';
import type { DbPageContent, DbPageContentInput } from './types';

const DB_PATH = path.join(process.cwd(), 'dev.db.sqlite');

let dbInstance: Database | null = null;

// Helper to get the correct path to the wasm file
function getWasmPath(): string {
  // Try to find the wasm file inside node_modules
  const possiblePaths = [
    path.join(process.cwd(), 'node_modules', 'sql.js', 'dist', 'sql-wasm.wasm'),
    path.join(
      __dirname,
      '..',
      '..',
      'node_modules',
      'sql.js',
      'dist',
      'sql-wasm.wasm',
    ),
    // Fallback to a public directory (if you copy it there)
    path.join(process.cwd(), 'public', 'sql-wasm.wasm'),
  ];
  for (const p of possiblePaths) {
    if (fs.existsSync(p)) return p;
  }
  // If not found, return the default relative path (will throw)
  return path.join(
    process.cwd(),
    'node_modules',
    'sql.js',
    'dist',
    'sql-wasm.wasm',
  );
}

// Get or initialize database instance
async function getDb(): Promise<Database> {
  if (dbInstance) return dbInstance;

  const wasmPath = getWasmPath();
  const SQL = await initSqlJs({
    locateFile: (file: string) => wasmPath,
  });

  let data: Uint8Array | null = null;
  if (fs.existsSync(DB_PATH)) {
    data = new Uint8Array(fs.readFileSync(DB_PATH));
  }
  dbInstance = new SQL.Database(data);
  return dbInstance;
}

// Save current database state to disk
async function saveDb(): Promise<void> {
  if (!dbInstance) return;
  const data = dbInstance.export();
  const buffer = Buffer.from(data);
  fs.writeFileSync(DB_PATH, buffer);
}

// Create table and indexes if not exists
export async function initDb(): Promise<void> {
  const db = await getDb();
  db.run(`
    CREATE TABLE IF NOT EXISTS page_contents (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      pageType TEXT NOT NULL,
      jobType TEXT NOT NULL,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      markdownContent TEXT,
      image TEXT,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(pageType, jobType)
    )
  `);
  db.run(`CREATE INDEX IF NOT EXISTS idx_pageType ON page_contents(pageType)`);
  await saveDb();
}

// Insert or replace a page content
export async function upsertPageContent(
  content: DbPageContentInput,
): Promise<void> {
  const db = await getDb();
  const stmt = db.prepare(`
    INSERT OR REPLACE INTO page_contents
    (pageType, jobType, title, description, markdownContent, image, updatedAt)
    VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
  `);
  stmt.run([
    content.pageType,
    content.jobType,
    content.title,
    content.description,
    content.markdownContent ?? null,
    content.image ?? null,
  ]);
  stmt.free();
  await saveDb();
}

// Fetch a single page content
export async function getPageContent(
  pageType: string,
  jobType: string,
): Promise<DbPageContent | null> {
  const db = await getDb();
  const result = db.exec(
    `SELECT * FROM page_contents WHERE pageType = ? AND jobType = ?`,
    [pageType, jobType],
  );
  if (result.length === 0 || result[0].values.length === 0) return null;

  const columns = result[0].columns;
  const row = result[0].values[0];
  const obj: Partial<DbPageContent> = {};

  for (let i = 0; i < columns.length; i++) {
    const col = columns[i];
    const value = row[i];
    switch (col) {
      case 'id':
        obj.id = value as number;
        break;
      case 'pageType':
      case 'jobType':
      case 'title':
      case 'description':
        obj[col] = value !== null ? String(value) : '';
        break;
      case 'markdownContent':
      case 'image':
        obj[col] = value !== null ? String(value) : null;
        break;
      case 'createdAt':
      case 'updatedAt':
        obj[col] = value !== null ? String(value) : new Date().toISOString();
        break;
    }
  }
  return obj as DbPageContent;
}

// Get all (pageType, jobType) pairs for static generation
export async function getAllPaths(): Promise<
  { pageType: string; jobType: string }[]
> {
  const db = await getDb();
  const result = db.exec(`SELECT pageType, jobType FROM page_contents`);
  if (result.length === 0) return [];
  const rows = result[0].values;
  return rows.map((row) => ({
    pageType: String(row[0]),
    jobType: String(row[1]),
  }));
}

// Close database (call on app shutdown if needed)
export async function closeDb(): Promise<void> {
  if (dbInstance) {
    await saveDb();
    dbInstance.close();
    dbInstance = null;
  }
}
