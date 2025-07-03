const BASE_URL = import.meta.env.VITE_APP_API_URL;

const request = async function fetchDataFromAPIWithHeaders(
  endpoint,
  options = {},
) {
  const apiUrl = `${BASE_URL}${endpoint}`;

  const headers = { "Content-Type": "application/json" };

  const config = {
    headers,
    mode: "cors",
    ...options,
  };

  try {
    const response = await fetch(apiUrl, config);

    if (!response.ok) {
      const errorMessage = (await response.json()).error;
      throw new Error(
        `API Response status ${response.status}${errorMessage ? " : " + errorMessage : ""}`,
      );
    }

    return response.json();
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

const api = {
  get: (endpoint) => request(endpoint),
  post: (endpoint, body) =>
    request(endpoint, { method: "POST", body: JSON.stringify(body) }),
  put: (endpoint, body) =>
    request(endpoint, { method: "PUT", body: JSON.stringify(body) }),
  delete: (endpoint) => request(endpoint, { method: "DELETE" }),
};

export default api;
