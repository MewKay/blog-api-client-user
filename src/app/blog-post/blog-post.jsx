import { useParams } from "react-router-dom";
import Post from "@/features/post/post";
import sqids from "@/lib/sqids";

const BlogPost = () => {
  const { encodedId } = useParams();

  const postId = sqids.decode(encodedId);

  return (
    <main>
      <Post id={postId} />
    </main>
  );
};

export default BlogPost;
