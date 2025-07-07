import { useEffect, useReducer } from "react";
import fetchReducer from "@/hooks/fetchReducer";
import postService from "@/services/post.service";

const useFetchPost = (id) => {
  const [post, dispatchPost] = useReducer(fetchReducer, {
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const getPost = async () => {
      dispatchPost({ type: "FETCH_INIT" });

      try {
        const postData = await postService.getById(id);
        dispatchPost({ type: "FETCH_SUCCESS", payload: postData });
      } catch (error) {
        dispatchPost({ type: "FETCH_ERROR", payload: error });
      }
    };

    getPost();
  }, [id]);

  const { data, loading, error } = post;

  return {
    post: data,
    loading,
    error,
  };
};

export default useFetchPost;
