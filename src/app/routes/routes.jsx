import ROUTES_PATH from "./path";
import Layout from "../layout/layout";
import Home from "../pages/home/home";
import BlogPost from "../pages/blog-post/blog-post";
import BlogPostBoundary from "../pages/blog-post/blog-post.boundary";
import blogPostLoader from "../pages/blog-post/blog-post.loader";
import Login from "../pages/login/login";
import LoginAction from "../pages/login/login.action";

const routes = [
  {
    path: ROUTES_PATH.home,
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      {
        path: ROUTES_PATH.blogPost,
        element: <BlogPost />,
        errorElement: <BlogPostBoundary />,
        loader: blogPostLoader,
      },
    ],
  },
  {
    path: ROUTES_PATH.login,
    element: <Login />,
    action: LoginAction,
  },
];

export default routes;
