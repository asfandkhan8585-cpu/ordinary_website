import { redirect } from 'next/navigation';
import posts from '../../posts.json';

export function GET(request) {
  const slug = new URL(request.url).searchParams.get('slug');
  if (posts.some(post => post.slug === slug)) redirect(`/blog/${slug}`);
  redirect('/blog');
}
