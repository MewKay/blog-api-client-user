import api from "./api-client";

const commentService = {
  getAllByPostId: (postId) => api.get(`/posts/${postId}/comments`),
  createOne: ({ postId, text }, token) =>
    api.post(`/posts/${postId}/comments`, { text }, token),
};

export default commentService;
