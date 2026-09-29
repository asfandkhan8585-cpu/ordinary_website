# ordinarychat website

This is a Next.js project. Run `npm install`, then `npm run dev` for local development. Use `npm run build` to check a production build and `npm start` to serve it.

The homepage is in `components/HomePage.jsx`, and blog routes are in `app/blog`. Shared styles are in `app/globals.css`.

## Add a blog post

Open `posts.json` and add one object to the array.

- `slug` must be unique and use lowercase words joined with hyphens.
- `title`, `description`, `date`, and `category` appear on the index and article page.
- Set `featured` to `true` for one post to feature it at the top of the blog page.
- Add each article paragraph as a separate item in `content`.

The blog index and article metadata are generated from this file during the build. The GitHub Actions workflow exports and deploys the static site to GitHub Pages on each push to `main`.

Netlify uses `netlify.toml` to build the same static export and publish the `out` directory.

The build generates `sitemap.xml`, separate page and blog sitemaps, and `robots.txt`. An article sitemap is generated when `posts.json` contains posts. Sitemap URLs use `SITE_URL` when set, Netlify's `URL` variable on Netlify, and the GitHub Pages URL for GitHub Pages builds.
