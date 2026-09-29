import posts from '../../posts.json';
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

export const metadata = { title: 'Blog posts | ordinarychat', description: 'Writing ideas, practical guidance, and clearer ways to communicate.' };

const date = value => new Intl.DateTimeFormat('en', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${value}T00:00:00Z`));
const link = post => `${basePath}/blog/${post.slug}/`;

function Card({ post, featured = false }) {
  return <article className={featured ? 'featured-post' : 'post-card'}>
    <p className="post-category">{post.category}</p>
    <h2 className="font-display"><a href={link(post)}>{post.title}</a></h2>
    <p className="post-description">{post.description}</p>
    <p className="post-meta"><time dateTime={post.date}>{date(post.date)}</time></p>
    <a className="post-link" href={link(post)} aria-label={`Read ${post.title}`}>Read post <span aria-hidden="true">→</span></a>
  </article>;
}

export default function BlogPage() {
  const featured = posts.find(post => post.featured) || posts[0];
  const remaining = posts.filter(post => post !== featured);
  const schema = { '@context': 'https://schema.org', '@type': 'Blog', name: 'ordinarychat journal', blogPost: posts.map(post => ({ '@type': 'BlogPosting', headline: post.title, description: post.description, datePublished: post.date, url: link(post.slug) })) };
  return <div className="blog-page"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    <header className="blog-nav"><a className="blog-brand font-display" href={`${basePath}/`}>ordinarychat</a><a className="blog-home" href={`${basePath}/`}>Home</a></header>
    <main><section className="blog-hero" aria-labelledby="blog-title"><p className="blog-eyebrow">ordinarychat journal</p><h1 id="blog-title" className="font-display">Ideas for writing with more clarity.</h1><p>Useful notes on writing, communicating, and making every word feel like your own.</p></section>
      <section className="blog-posts" aria-label="Blog posts">{featured && <Card post={featured} featured />}<div className="post-grid">{remaining.map(post => <Card key={post.slug} post={post} />)}</div></section></main>
    <footer className="blog-footer"><a href={`${basePath}/`}>ordinarychat</a></footer>
  </div>;
}
