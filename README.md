# Loyalty SMS Platform – Dynamic Pages with Next.js

A modern, SEO-friendly dynamic page system built for a hypothetical SaaS product that helps small businesses send SMS, manage customer loyalty, and automate appointments.

## 🚀 Tech Stack

- **Next.js 16.2.6** (App Router, Turbopack)
- **React 19.2.4**
- **TypeScript 5** (strict mode, no `any`)
- **Tailwind CSS 4** + Typography plugin
- **SQLite** via `sql.js` (pure JS, no native compilation)
- **Zod** – runtime validation (JSON schema & DB types)
- **Remark + Rehype** – server‑side Markdown to HTML

## ✨ Key Features

- ✅ Dynamic routes: `/[pageType]/[jobType]`
- ✅ **Server‑Side Rendering (SSR)** – full HTML in view‑source
- ✅ **Static Path Generation** (`generateStaticParams`) for SSG
- ✅ **Feature Flag** – switch between JSON file and SQLite via `DATA_SOURCE` env var
- ✅ **SEO ready** – dynamic `generateMetadata`, sitemap, robots.txt
- ✅ **Persian content** (Farsi) with RTL layout
- ✅ Responsive design + Skeleton loaders + Custom 404
- ✅ **Markdown support** (tables, lists, GFM, raw HTML) rendered on the server
- ✅ No `any` – full type safety with Zod and interfaces

## 📂 Project Structure

```
.
├── app/
│ ├── [pageType]/[jobType]/page.tsx # dynamic page
│ ├── layout.tsx # root layout with navbar/footer
│ ├── page.tsx # homepage
│ ├── not-found.tsx # custom 404
│ ├── sitemap.ts # auto‑generated sitemap
│ └── robots.ts # robots.txt
├── components/
│ ├── MarkdownRenderer.tsx # client‑side markdown (deprecated)
│ ├── ServerMarkdown.tsx # server‑side markdown renderer
│ └── Breadcrumb.tsx # RTL breadcrumb
├── lib/
│ ├── data/ # data abstraction layer
│ │ ├── types.ts # Zod schemas & interfaces
│ │ ├── json-provider.ts # JSON data source
│ │ ├── db-provider.ts # SQLite data source
│ │ └── data-factory.ts # factory with feature flag
│ └── db/ # SQLite implementation
│ ├── types.ts
│ └── sqlite-js.ts # pure JS SQLite wrapper
├── data/
│ └── content.json # fallback JSON data (Persian)
├── scripts/
│ └── seed-db.ts # seed database from JSON (uses Zod)
├── .env.local # DATA_SOURCE=json|db
└── public/ # static assets
```

## 🛠️ Getting Started

### 1. Clone & Install

`bash
git clone ...
npm install
``

### 2. Environment

Create `.env.local`:

``DATA_SOURCE=json # or 'db'`

### 3. Run with JSON (default)

`bash
npm run dev
`

### 4. Switch to SQLite

First, seed the database:

`bash
npm run seed
``

Then change `.env.local` to `DATA_SOURCE=db` and restart.

## 🧪 Scripts

- `npm run dev` – start dev server (Turbopack)
- `npm run build` – production build
- `npm run start` – start production server
- `npm run seed` – populate SQLite from `data/content.json`

## 📝 Architecture Highlights

- **Data source abstraction** – `DataSource` interface allows switching between JSON and DB without touching page components.
- **Factory pattern** – `getDataSource()` reads `DATA_SOURCE` once and returns the correct provider.
- **Zod validation** – JSON structure is validated at runtime; DB queries return strongly typed objects.
- **Server‑side Markdown** – Markdown is converted to HTML inside `ServerMarkdown` (Server Component) using Remark/Rehype pipeline. This ensures the final HTML appears in `view-source`.
- **RTL & Persian** – `html dir=\"rtl\"` and Persian labels in navbar, breadcrumb, and home page.
- **Static generation** – `generateStaticParams` pre‑builds all known routes at build time for better SEO and speed.

## 🧠 Why these libraries?

| Library           | Purpose                                                                          |
| ----------------- | -------------------------------------------------------------------------------- |
| `remark`          | Markdown AST parser                                                              |
| `remarkGfm`       | GitHub Flavored Markdown (tables, strikethrough, task lists)                     |
| `remarkRehype`    | Bridge from Markdown AST to HTML AST                                             |
| `rehypeStringify` | Serialize HTML AST to string                                                     |
| `rehypeRaw`       | Allow raw HTML inside Markdown                                                   |
| `sql.js`          | Pure JavaScript SQLite (no native compilation, works behind restricted networks) |
| `zod`             | Runtime type validation for JSON & DB input                                      |

## 🤔 Possible Improvements

- Add authentication (e.g., NextAuth)
- Add real database (PostgreSQL) with connection pooling
- Add caching layer (Redis) for frequent queries
- Write unit/integration tests (Jest, Vitest)

## 📄 License

MIT
