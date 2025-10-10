import PostItem from "./post-item/post-item";
import useFetchPosts from "./useFetchPosts";
import Loader from "@/components/loader/loader";
import { BookX } from "lucide-react";
import styles from "./post-list.module.css";

const PostList = () => {
  const { posts, loading, error } = useFetchPosts();

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <div className={styles.errorContainer}>
          <BookX />
          <p className={styles.errorMessage}>
            Something went wrong. Please try to refresh the page later.
          </p>
        </div>
      ) : (
        <ul className={styles.list}>
          {posts.map((post) => (
            <PostItem key={post.id} post={post} />
          ))}
        </ul>
      )}
    </>
  );
};

export default PostList;
