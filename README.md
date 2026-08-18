# Blog App

A full-stack blog web application built with Next.js (App Router), TypeScript, and SQLite using Prisma ORM.

## Features

- **Homepage** (`/`) – Lists all blog posts with titles and excerpts (first 150 characters)
- **Post Detail Page** (`/posts/[id]`) – Displays full title and content of a single post
- **Create Post Page** (`/posts/new`) – Form to create new blog posts
- **Edit Post Page** (`/posts/[id]/edit`) – Pre-filled form to update existing posts
- **Delete Functionality** – Delete button on the post detail page

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Database**: SQLite
- **ORM**: Prisma
- **Styling**: Tailwind CSS

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Prisma Database

Generate the Prisma client and run migrations:

```bash
npx prisma migrate dev --name init
```

This will:
- Create the SQLite database file (`dev.db`)
- Generate the Prisma Client
- Apply the initial migration

### 3. Start the Development Server

```bash
npm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000)

## Project Structure

```
├── app/
│   ├── actions.ts          # Server actions for CRUD operations
│   ├── globals.css         # Global styles with Tailwind
│   ├── layout.tsx          # Root layout with header and footer
│   ├── page.tsx            # Homepage (lists all posts)
│   └── posts/
│       ├── new/
│       │   └── page.tsx    # Create post form
│       └── [id]/
│           ├── page.tsx    # Post detail page
│           └── edit/
│               └── page.tsx # Edit post form
├── lib/
│   └── prisma.ts           # Prisma client singleton
├── prisma/
│   └── schema.prisma       # Prisma schema with Post model
├── .env                    # Environment variables (DATABASE_URL)
├── next.config.js          # Next.js configuration
├── tailwind.config.ts      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
└── package.json
```

## Database Schema

The `Post` model includes:

- `id` – Auto-increment integer primary key
- `title` – String (required)
- `content` – Text (required)
- `createdAt` – DateTime, defaults to now
- `updatedAt` – DateTime, automatically updated on changes

## Server Actions

All mutations (create, update, delete) are handled using Next.js Server Actions in `app/actions.ts`:

- `createPost(formData)` – Creates a new post
- `updatePost(id, formData)` – Updates an existing post
- `deletePost(id)` – Deletes a post

Each action includes server-side validation to ensure both title and content are provided.

## License

ISC
