import BlogPost from "./blog-post/blog-post";
import Home from "./home/home";

const routes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/posts/:encodedId/:slug",
    element: <BlogPost />,
  },
];

export default routes;
