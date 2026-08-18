'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';

/**
 * Create a new blog post
 * @param formData - Form data containing title and content
 */
export async function createPost(formData: FormData) {
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;

  // Server-side validation
  if (!title || !title.trim()) {
    throw new Error('Title is required');
  }

  if (!content || !content.trim()) {
    throw new Error('Content is required');
  }

  try {
    // Create the post in the database using Prisma
    const post = await prisma.post.create({
      data: {
        title: title.trim(),
        content: content.trim(),
      },
    });

    // Revalidate the homepage to show the new post
    revalidatePath('/');
    
    // Redirect to the new post's detail page
    redirect(`/posts/${post.id}`);
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
}

/**
 * Update an existing blog post
 * @param id - Post ID
 * @param formData - Form data containing title and content
 */
export async function updatePost(id: number, formData: FormData) {
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;

  // Server-side validation
  if (!title || !title.trim()) {
    throw new Error('Title is required');
  }

  if (!content || !content.trim()) {
    throw new Error('Content is required');
  }

  try {
    // Update the post in the database using Prisma
    await prisma.post.update({
      where: { id },
      data: {
        title: title.trim(),
        content: content.trim(),
      },
    });

    // Revalidate the post detail page and homepage
    revalidatePath(`/posts/${id}`);
    revalidatePath('/');
    
    // Redirect to the updated post's detail page
    redirect(`/posts/${id}`);
  } catch (error) {
    console.error('Error updating post:', error);
    throw error;
  }
}

/**
 * Delete a blog post
 * @param id - Post ID
 */
export async function deletePost(id: number) {
  try {
    // Delete the post from the database using Prisma
    await prisma.post.delete({
      where: { id },
    });

    // Revalidate the homepage
    revalidatePath('/');
    
    // Redirect to homepage after deletion
    redirect('/');
  } catch (error) {
    console.error('Error deleting post:', error);
    throw error;
  }
}
