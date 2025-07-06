import { useEffect, useReducer } from "react";
import postService from "@/services/post.service";

const postsReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_INIT":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "FETCH_SUCCESS":
      return {
        data: action.payload,
        loading: false,
        error: null,
      };
    case "FETCH_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload.message,
      };
    default:
      throw new Error("Unhandled type");
  }
};

const useFetchPosts = () => {
  const [posts, dispatchPosts] = useReducer(postsReducer, {
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
