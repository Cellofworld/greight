import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';

export const metadata: Metadata = {
  title: 'Blog App',
  description: 'A simple blog application built with Next.js and Prisma',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <nav className="flex items-center justify-between">
              <Link href="/" className="text-xl font-bold text-blue-600 hover:text-blue-700">
                Blog App
              </Link>
              <Link
                href="/posts/new"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                New Post
              </Link>
            </nav>
          </div>
        </header>

        {/* Main content area */}
        <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-8">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 mt-auto">
          <div className="max-w-4xl mx-auto px-4 py-4 text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} Blog App. Built with Next.js, Prisma & SQLite.
          </div>
        </footer>
      </body>
    </html>
  );
}
