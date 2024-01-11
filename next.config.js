/** @type {import('next').NextConfig} */

module.exports = {
  async rewrites() {
    return [
      // {
      //   source: '/',
      //   destination: '/pages/home',
      // },
      {
        source: "/portfolio",
        destination: "/pages/portfolio",
      },
      {
        source: "/coinsummary",
        destination: "/pages/coinsummary",
      }
    ];
  },
};
