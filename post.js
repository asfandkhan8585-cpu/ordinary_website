function articleDate(date) {
  return new Intl.DateTimeFormat('en', { month: 'long', day: 'numeric', year: 'numeric' }).format(new Date(`${date}T00:00:00`));
}

function setArticleMetadata(post) {
  document.title = `${post.title} | ordinarychat`;
  document.querySelector('meta[name="description"]').setAttribute('content', post.description);
  const schema = document.createElement('script');
  schema.type = 'application/ld+json';
  schema.textContent = JSON.stringify({ '@context': 'https://schema.org', '@type': 'BlogPosting', headline: post.title, description: post.description, datePublished: post.date, articleBody: post.content.join(' ') });
  document.head.append(schema);
}

async function renderArticle() {
  const slug = new URLSearchParams(window.location.search).get('slug');
  const response = await fetch('posts.json');
  if (!response.ok) throw new Error('Unable to load the post.');
  const posts = await response.json();
  const post = posts.find((item) => item.slug === slug);
  if (!post) throw new Error('Post not found.');
  setArticleMetadata(post);
  document.getElementById('article').innerHTML = `<article><a class="back-link" href="blog.html">← Blog posts</a><p class="post-category">${post.category}</p><h1 class="font-display">${post.title}</h1><p class="article-description">${post.description}</p><p class="post-meta"><time datetime="${post.date}">${articleDate(post.date)}</time><span aria-hidden="true">·</span>${post.readingTime}</p><div class="article-content">${post.content.map((paragraph) => `<p>${paragraph}</p>`).join('')}</div></article>`;
}

renderArticle().catch(() => {
  document.getElementById('article').innerHTML = '<p class="blog-error">This post is unavailable right now.</p>';
});
