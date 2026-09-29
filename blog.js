const blogDataUrl = 'posts.json';

function formatPostDate(date) {
  return new Intl.DateTimeFormat('en', { month: 'long', day: 'numeric', year: 'numeric' }).format(new Date(`${date}T00:00:00`));
}

function postLink(slug) {
  return `post.html?slug=${encodeURIComponent(slug)}`;
}

function postCard(post, featured = false) {
  const tag = `<p class="post-category">${post.category}</p>`;
  const meta = `<p class="post-meta"><time datetime="${post.date}">${formatPostDate(post.date)}</time><span aria-hidden="true">·</span>${post.readingTime}</p>`;
  return `<article class="${featured ? 'featured-post' : 'post-card'}">${tag}<h2 class="font-display"><a href="${postLink(post.slug)}">${post.title}</a></h2><p class="post-description">${post.description}</p>${meta}<a class="post-link" href="${postLink(post.slug)}" aria-label="Read ${post.title}">Read post <span aria-hidden="true">→</span></a></article>`;
}

function addBlogSchema(posts) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'ordinarychat journal',
    blogPost: posts.map((post) => ({ '@type': 'BlogPosting', headline: post.title, description: post.description, datePublished: post.date, url: postLink(post.slug) }))
  };
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(schema);
  document.head.append(script);
}

async function renderBlogIndex() {
  const response = await fetch(blogDataUrl);
  if (!response.ok) throw new Error('Unable to load blog posts.');
  const posts = await response.json();
  const featured = posts.find((post) => post.featured) || posts[0];
  const remaining = posts.filter((post) => post !== featured);
  document.getElementById('featured-post').innerHTML = featured ? postCard(featured, true) : '';
  document.getElementById('post-grid').innerHTML = remaining.map((post) => postCard(post)).join('');
  addBlogSchema(posts);
}

renderBlogIndex().catch(() => {
  document.getElementById('post-grid').innerHTML = '<p class="blog-error">Blog posts are unavailable right now.</p>';
});
