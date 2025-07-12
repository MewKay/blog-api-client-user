import BlogPost from "./blog-post/blog-post";
import BlogPostBoundary from "./blog-post/blog-post.boundary";
import blogPostLoader from "./blog-post/blog-post.loader";
import Home from "./home/home";

const routes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/posts/:encodedId/:slug",
    element: <BlogPost />,
    errorElement: <BlogPostBoundary />,
    loader: blogPostLoader,
  },
];

export default routes;
