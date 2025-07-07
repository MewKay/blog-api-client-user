import { useEffect, useReducer } from "react";
import postService from "@/services/post.service";
import fetchReducer from "@/hooks/fetchReducer";

const useFetchPosts = () => {
  const [posts, dispatchPosts] = useReducer(fetchReducer, {
    data: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    const getPosts = async () => {
      dispatchPosts({ type: "FETCH_INIT" });

      try {
        const postList = await postService.getAll();
        dispatchPosts({ type: "FETCH_SUCCESS", payload: postList });
      } catch (error) {
        dispatchPosts({ type: "FETCH_ERROR", payload: error });
      }
    };

    getPosts();
  }, []);

  const { data, loading, error } = posts;
  return {
    posts: data,
    loading,
    error,
  };
};

export default useFetchPosts;
