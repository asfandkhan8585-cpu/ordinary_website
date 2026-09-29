# ordinarychat website

The site is static and can be deployed by GitHub Pages after every push to `main`.

## Add a blog post

Open `posts.json` and add one object to the array. Use the existing posts as the template.

- `slug` must be unique and use lowercase words joined with hyphens.
- `title`, `description`, `date`, `readingTime`, and `category` appear on the index and article page.
- Set `featured` to `true` for one post to feature it at the top of the blog page.
- Add each article paragraph as a separate item in `content`.

Commit and push the updated `posts.json`. The blog index, article page, page title, description, and JSON-LD schema update automatically.
