tailwind.config = {
  theme: {
    extend: {
      colors: { ink: '#10243A', paper: '#F8FBFF', sand: '#E7F1FA', olive: '#0A66C2', 'deep-olive': '#102B4A', clay: '#D84B47', mist: '#D9EBFB' },
      fontFamily: { display: ['Fraunces', 'Georgia', 'serif'], sans: ['Inter', 'system-ui', 'sans-serif'] },
      maxWidth: { '8xl': '88rem' },
      boxShadow: { card: '0 1px 2px rgba(32,32,30,0.04), 0 8px 30px rgba(32,32,30,0.06)', float: '0 2px 4px rgba(32,32,30,0.05), 0 20px 50px rgba(32,32,30,0.10)', chip: '0 1px 2px rgba(32,32,30,0.05)' }
    }
  }
};
