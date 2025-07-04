import PostItem from "./post-item/post-item";
import useFetchPosts from "./useFetchPosts";

const PostList = () => {
  const { posts } = useFetchPosts();

  return (
    <ul>
      {posts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </ul>
  );
};

export default PostList;
