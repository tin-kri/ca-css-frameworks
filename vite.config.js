export default {
  root: "./src",
  build: {
    outDir: "../dist",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        index: "/index.html",
        profile: "/profile/index.html",
        feed: "/feed/index.html",
      },
    },
  },
};
