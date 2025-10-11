const paths = {
  home: { path: "/" },
  blogPost: {
    path: "posts/:encodedId/:slug",
    getHref: (encodedId, slug) => `/posts/${encodedId}/${slug}`,
  },
  login: { path: "/log-in" },
  signup: { path: "/sign-up" },
  notFound: { path: "*" },
  oneStepBack: { path: -1 },
};

export default paths;
