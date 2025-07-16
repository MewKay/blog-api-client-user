import api from "./api-client";

const authService = {
  login: async (credentials) => {
    const response = await api.post("/login", credentials);

    localStorage.setItem("user", JSON.stringify(response.user));
    localStorage.setItem("token", response.token);

    return response;
  },
  signup: (body) => api.post("/signup", body),
};

export default authService;
