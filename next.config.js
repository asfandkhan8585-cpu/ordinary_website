module.exports = {
  async redirects() {
    return [
      { source: '/blog.html', destination: '/blog', permanent: true },
      { source: '/index.html', destination: '/', permanent: true }
    ];
  }
};
