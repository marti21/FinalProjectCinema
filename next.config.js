const withNextIntl = require('next-intl/plugin')();
 
module.exports = withNextIntl({
  images: {
    domains: ['image.tmdb.org'],
  },
});