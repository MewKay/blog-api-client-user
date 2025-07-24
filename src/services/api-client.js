const BASE_URL = import.meta.env.VITE_APP_API_URL;

const request = async function fetchDataFromAPIWithHeaders(
  endpoint,
  options = {},
  authToken = undefined,
) {
  const apiUrl = `${BASE_URL}${endpoint}`;

  const headers = {
    "Content-Type": "application/json",
  };

  if (authToken) {
    headers["Authorization"] = `Bearer ${authToken}`;
  }

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
  get: (endpoint, authToken = undefined) => request(endpoint, {}, authToken),
  post: (endpoint, body, authToken = undefined) =>
    request(
      endpoint,
      { method: "POST", body: JSON.stringify(body) },
      authToken,
    ),
  put: (endpoint, body, authToken = undefined) =>
    request(endpoint, { method: "PUT", body: JSON.stringify(body) }, authToken),
  delete: (endpoint, authToken = undefined) =>
    request(endpoint, { method: "DELETE" }, authToken),
};

export default api;
