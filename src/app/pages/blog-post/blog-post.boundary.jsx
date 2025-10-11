import paths from "@/app/routes/paths";
import BadRequestError from "@/lib/errors/bad-request.error";
import NotFoundError from "@/lib/errors/not-found.error";
import { Link, useRouteError } from "react-router-dom";

const BlogPostBoundary = () => {
  const error = useRouteError();

  if (error instanceof BadRequestError || error instanceof NotFoundError) {
    return (
      <main>
        <p>
          Sorry, this post could not be found.
          <Link to={paths.home.path}>Go back to the home page.</Link>
        </p>
      </main>
    );
  }

  throw error;
};

export default BlogPostBoundary;
