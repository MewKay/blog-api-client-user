import PostItem from "./post-item/post-item";
import useFetchPosts from "./useFetchPosts";

const PostList = () => {
  const { posts, loading, error } = useFetchPosts();

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Something went wrong. Please try to refresh the page.</p>
      ) : (
        <ul>
          {posts.map((post) => (
            <PostItem key={post.id} post={post} />
          ))}
        </ul>
      )}
    </>
  );
};

export default PostList;
