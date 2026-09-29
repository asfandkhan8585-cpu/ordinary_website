import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const posts = JSON.parse(await readFile(new URL('../posts.json', import.meta.url), 'utf8'));
const pagesUrl = 'https://asfandkhan8585-cpu.github.io/ordinary_website/';
const siteUrl = new URL(process.env.SITE_URL || (process.env.GITHUB_PAGES === 'true' ? pagesUrl : process.env.URL || pagesUrl));
const base = siteUrl.href.endsWith('/') ? siteUrl.href : `${siteUrl.href}/`;
const out = fileURLToPath(new URL('../out/', import.meta.url));
const escapeXml = value => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&apos;');
const absolute = path => escapeXml(new URL(path, base).href);
const xml = body => `<?xml version="1.0" encoding="UTF-8"?>\n${body}\n`;
const urlset = paths => xml(`<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${paths.map(path => `  <url><loc>${absolute(path)}</loc></url>`).join('\n')}\n</urlset>`);

const maps = [
  ['sitemap-pages.xml', ['']],
  ['sitemap-blog.xml', ['blog/']]
];
if (posts.length) maps.push(['sitemap-posts.xml', posts.map(post => `blog/${encodeURIComponent(post.slug)}/`)]);

for (const [filename, paths] of maps) {
  await writeFile(join(out, filename), urlset(paths));
}
const index = xml(`<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${maps.map(([filename]) => `  <sitemap><loc>${absolute(filename)}</loc></sitemap>`).join('\n')}\n</sitemapindex>`);
await writeFile(join(out, 'sitemap.xml'), index);
await writeFile(join(out, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${new URL('sitemap.xml', base).href}\n`);
