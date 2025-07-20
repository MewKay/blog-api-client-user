import api from "./api-client";

const authService = {
  login: async (credentials) => {
    const response = await api.post("/login", credentials);

    localStorage.setItem("user", JSON.stringify(response.user));
    localStorage.setItem("token", response.token);

    return response;
  },
  logout: () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  },
  signup: (body) => api.post("/signup", body),
  getUser: () => JSON.parse(localStorage.getItem("user")),
};

export default authService;
