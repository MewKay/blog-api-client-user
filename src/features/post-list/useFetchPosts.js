import { useState, useEffect } from "react";
import postService from "@/services/post.service";

const useFetchPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getPosts = async () => {
      setLoading(true);

      try {
        const postList = await postService.getAll();
        setPosts(postList);
        setLoading(false);
        setError(null);
      } catch (error) {
        setLoading(false);
        setError(error.message);
      }
    };

    getPosts();
  }, []);

  return {
    posts,
    loading,
    error,
  };
};

export default useFetchPosts;
