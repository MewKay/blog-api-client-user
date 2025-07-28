import commentService from "@/services/comment.service";
import fetchReducer from "@/hooks/fetchReducer";
import { createContext, useCallback, useEffect, useReducer } from "react";
import PropTypes from "prop-types";

const BlogCommentsContext = createContext({
  postId: null,
  comments: { data: [], loading: true, error: null },
  updateComments: () => {},
});

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

const BlogCommentsProvider = ({ children, postId }) => {
  const { comments, updateComments } = useFetchComments(postId);

  return (
    <BlogCommentsContext.Provider value={{ postId, comments, updateComments }}>
      {children}
    </BlogCommentsContext.Provider>
  );
};

BlogCommentsProvider.propTypes = {
  children: PropTypes.node,
  postId: PropTypes.number.isRequired,
};

export { BlogCommentsContext, BlogCommentsProvider };
