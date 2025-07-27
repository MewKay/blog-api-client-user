import { useCallback, useEffect, useReducer } from "react";
import commentService from "@/services/comment.service";
import fetchReducer from "@/hooks/fetchReducer";

const useFetchComments = (postId) => {
  const [comments, dispatchComments] = useReducer(fetchReducer, {
    data: [],
    loading: false,
    error: null,
  });

  const updateComments = useCallback(async () => {
    dispatchComments({ type: "FETCH_INIT" });

    try {
      const updatedComments = await commentService.getAllByPostId(postId);
      dispatchComments({ type: "FETCH_SUCCESS", payload: updatedComments });
    } catch (error) {
      dispatchComments({ type: "FETCH_ERROR", payload: error });
    }
  }, [postId]);

  useEffect(() => {
    updateComments();
  }, [updateComments]);

  return {
    comments,
    updateComments,
  };
};

export default useFetchComments;
