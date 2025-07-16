import Layout from "./layout";
import Home from "./home/home";
import BlogPost from "./blog-post/blog-post";
import BlogPostBoundary from "./blog-post/blog-post.boundary";
import blogPostLoader from "./blog-post/blog-post.loader";
import Login from "./login/login";
import LoginAction from "./login/login.action";

const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "posts/:encodedId/:slug",
        element: <BlogPost />,
        errorElement: <BlogPostBoundary />,
        loader: blogPostLoader,
      },
    ],
  },
  {
    path: "/log-in",
    element: <Login />,
    action: LoginAction,
  },
];

export default routes;
