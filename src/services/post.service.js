import api from "./api-client";

const postService = {
  getAll: () => api.get("/posts"),
};

export default postService;
