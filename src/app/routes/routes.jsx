import paths from "./paths";
import Layout from "../layout/layout";
import Home from "../pages/home/home";
import BlogPost from "../pages/blog-post/blog-post";
import BlogPostBoundary from "../pages/blog-post/blog-post.boundary";
import blogPostLoader from "../pages/blog-post/blog-post.loader";
import Login from "../pages/login/login";
import LoginAction from "../pages/login/login.action";
import SignUp from "../pages/signup/signup";
import SignUpAction from "../pages/signup/signup.action";
import ErrorBoundary from "../layout/error-boundary/error-boundary";
import NotFound from "../pages/not-found/not-found";

const routes = [
  {
    path: paths.home.path,
    element: <Layout />,
    errorElement: <ErrorBoundary />,
    children: [
      { index: true, element: <Home /> },
      {
        path: paths.blogPost.path,
        element: <BlogPost />,
        errorElement: <BlogPostBoundary />,
        loader: blogPostLoader,
      },
    ],
  },
  {
    path: paths.login.path,
    element: <Login />,
    errorElement: <ErrorBoundary />,
    action: LoginAction,
  },
  {
    path: paths.signup.path,
    element: <SignUp />,
    errorElement: <ErrorBoundary />,
    action: SignUpAction,
  },
  {
    path: paths.notFound.path,
    element: <NotFound />,
  },
];

export default routes;
