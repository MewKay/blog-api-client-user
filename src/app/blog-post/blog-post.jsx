import { Link, useParams } from "react-router-dom";
import Post from "@/features/post/post";
import sqids from "@/lib/sqids";

const BlogPost = () => {
  const { encodedId } = useParams();

  const postId = sqids.decode(encodedId);

  if (!postId) {
    return (
      <main>
        <p>
          Sorry, this post could not be found.
          <Link to={"/"}>Go back to the home page.</Link>
        </p>
      </main>
    );
  }

  return (
    <main>
      <Link to={"/"}>{"<--"} Back to blog list</Link>
      <Post id={postId} />
    </main>
  );
};

export default BlogPost;
