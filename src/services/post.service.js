import api from "./api-client";

const postService = {
  getAll: () => api.get("/posts"),
  getById: (id) => api.get(`/posts/${id}`),
};

export default postService;
