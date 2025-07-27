import sqids from "@/lib/sqids";
import postService from "@/services/post.service";
import { redirect } from "react-router-dom";

const blogPostLoader = async ({ params }) => {
  const { encodedId, slug } = params;
  const postId = sqids.decode(encodedId);

  const post = await postService.getById(postId);

  if (post.slug !== slug) {
    return redirect(`/posts/${encodedId}/${post.slug}`);
  }

  return { post, postId };
};

export default blogPostLoader;
