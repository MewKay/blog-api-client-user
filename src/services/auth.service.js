import api from "./api-client";

const authService = {
  login: (body) => api.post("/login", body),
  signup: (body) => api.post("/signup", body),
};

export default authService;
