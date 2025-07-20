import sqids from "@/lib/sqids";
import commentService from "@/services/comment.service";
import postService from "@/services/post.service";
import { redirect } from "react-router-dom";

const blogPostLoader = async ({ params }) => {
  const { encodedId, slug } = params;
  const postId = sqids.decode(encodedId);

  const post = await postService.getById(postId);

  if (post.slug !== slug) {
    return redirect(`/posts/${encodedId}/${post.slug}`);
  }

  const comments = await commentService.getAllByPostId(postId);

  return { post, comments };
};

export default blogPostLoader;
