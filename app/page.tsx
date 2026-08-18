import Link from 'next/link';
import { prisma } from '@/lib/prisma';

/**
 * Homepage - Lists all blog posts with titles and excerpts
 * Uses React Server Component to fetch data directly
 */
export default async function HomePage() {
  // Fetch all posts from the database, ordered by creation date (newest first)
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">All Blog Posts</h1>

      {posts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg mb-4">No posts yet.</p>
          <Link
            href="/posts/new"
            className="text-blue-600 hover:text-blue-700 underline"
          >
            Create your first post
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {posts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <Link
                href={`/posts/${post.id}`}
                className="block"
              >
                <h2 className="text-xl font-semibold text-blue-600 hover:text-blue-700 mb-2">
                  {post.title}
                </h2>
                <p className="text-gray-600 mb-4">
                  {/* Show first 150 characters as excerpt */}
                  {post.content.length > 150
                    ? `${post.content.substring(0, 150)}...`
                    : post.content}
                </p>
                <time className="text-sm text-gray-400">
                  {new Date(post.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
              </Link>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
