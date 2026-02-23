import axios from "axios";

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:4000/api",
  headers: {
    "Content-Type": "application/json"
  }
});

let isRefreshing = false;
let queue = [];

const processQueue = (token) => {
  queue.forEach((cb) => cb(token));
  queue = [];
};

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) {
        return Promise.reject(error);
      }

      if (isRefreshing) {
        return new Promise((resolve) => {
          queue.push((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(apiClient(originalRequest));
          });
        });
      }

      isRefreshing = true;
      try {
        const { data } = await axios.post(
          `${import.meta.env.VITE_API_URL || "http://localhost:4000/api"}/auth/refresh`,
          { refreshToken }
        );

        localStorage.setItem("accessToken", data.accessToken);
        apiClient.defaults.headers.common.Authorization = `Bearer ${data.accessToken}`;
        processQueue(data.accessToken);
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user");
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);
