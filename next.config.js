module.exports = {
  output: 'export',
  trailingSlash: true,
  basePath: process.env.GITHUB_PAGES === 'true' ? '/ordinary_website' : ''
};
