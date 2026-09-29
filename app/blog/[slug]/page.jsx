import posts from '../../../posts.json';
import { notFound } from 'next/navigation';
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

export function generateStaticParams() { return posts.length ? posts.map(post => ({ slug: post.slug })) : [{ slug: '__empty' }]; }
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = posts.find(item => item.slug === slug);
  return post ? { title: `${post.title} | ordinarychat`, description: post.description } : {};
}

export default async function PostPage({ params }) {
  const { slug } = await params;
  const post = posts.find(item => item.slug === slug);
  if (!post) notFound();
  const date = new Intl.DateTimeFormat('en', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${post.date}T00:00:00Z`));
  const schema = { '@context': 'https://schema.org', '@type': 'BlogPosting', headline: post.title, description: post.description, datePublished: post.date, articleBody: post.content.join(' ') };
  return <div className="blog-page"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    <header className="blog-nav"><a className="blog-brand font-display" href={`${basePath}/`}>ordinarychat</a><a className="blog-home" href={`${basePath}/blog/`}>Blog posts</a></header>
    <main className="article"><article><a className="back-link" href={`${basePath}/blog/`}>← Blog posts</a><p className="post-category">{post.category}</p><h1 className="font-display">{post.title}</h1><p className="article-description">{post.description}</p><p className="post-meta"><time dateTime={post.date}>{date}</time></p><div className="article-content">{post.content.map((paragraph, index) => <p key={index}>{paragraph}</p>)}</div></article></main>
    <footer className="blog-footer"><a href={`${basePath}/`}>ordinarychat</a></footer>
  </div>;
}
