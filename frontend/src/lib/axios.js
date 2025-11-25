// api.js
const BASE_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5001/api"
    : "/api";

const api = (path, options) => fetch(BASE_URL + path, options);

export default api;
