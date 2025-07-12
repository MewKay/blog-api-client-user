import { Link, useLoaderData } from "react-router-dom";
import Post from "@/features/post/post";

const BlogPost = () => {
  const { post } = useLoaderData();

  return (
    <main>
      <Link to={"/"}>{"<--"} Back to blog list</Link>
      <Post post={post} />
    </main>
  );
};

export default BlogPost;
