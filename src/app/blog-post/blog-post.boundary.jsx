import { Link } from "react-router-dom";

const BlogPostBoundary = () => {
  return (
    <main>
      <p>
        Sorry, this post could not be found.
        <Link to={"/"}>Go back to the home page.</Link>
      </p>
    </main>
  );
};

export default BlogPostBoundary;
