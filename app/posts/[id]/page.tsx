import Link from 'next/link';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { deletePost } from '@/app/actions';

/**
 * Post Detail Page - Displays full title and content of a single post
 * Uses React Server Component to fetch data directly
 */
export default async function PostDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const postId = parseInt(id, 10);

  // Fetch the post from the database
  const post = await prisma.post.findUnique({
    where: { id: postId },
  });

  // Return 404 if post not found
  if (!post) {
    notFound();
  }

  return (
    <article className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
      {/* Header with title and actions */}
      <div className="flex items-start justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900">{post.title}</h1>
        <div className="flex gap-2">
          <Link
            href={`/posts/${post.id}/edit`}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm"
          >
            Edit
          </Link>
          <form action={deletePost.bind(null, post.id)}>
            <button
              type="submit"
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors text-sm"
              onClick={(e) => {
                if (!confirm('Are you sure you want to delete this post?')) {
                  e.preventDefault();
                }
              }}
            >
              Delete
            </button>
          </form>
        </div>
      </div>

      {/* Post metadata */}
      <div className="mb-6 text-sm text-gray-500">
        <time>
          Published on{' '}
          {new Date(post.createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </time>
        {post.updatedAt.getTime() !== post.createdAt.getTime() && (
          <span className="ml-4">
            Last updated{' '}
            {new Date(post.updatedAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </span>
        )}
      </div>

      {/* Post content */}
      <div className="prose max-w-none">
        <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
          {post.content}
        </p>
      </div>

      {/* Back link */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <Link
          href="/"
          className="text-blue-600 hover:text-blue-700 underline"
        >
          ← Back to all posts
        </Link>
      </div>
    </article>
  );
}
