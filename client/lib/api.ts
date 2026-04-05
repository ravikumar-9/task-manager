import axios from "axios";
import { getToken, setToken, clearToken } from "./token";
import { toast } from "react-toastify";

const api = axios.create({
  baseURL: process.env.BASE_URL || "http://localhost:5000/api",
  withCredentials: true,
});

let isRefreshing = false;
let queue: any[] = [];

const processQueue = (token: string | null) => {
  queue.forEach((p) => {
    if (token) {
      p.resolve(token);
    } else {
      p.reject();
    }
  });
  queue = [];
};

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;

    if (error.response?.status === 401 && !original._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          queue.push({
            resolve: (token: string) => {
              original.headers.Authorization = `Bearer ${token}`;
              resolve(api(original));
            },
            reject,
          });
        });
      }

      original._retry = true;
      isRefreshing = true;

      try {
        const res = await axios.post(
          `http://localhost:5000/api/auth/refresh`,
          {},
          { withCredentials: true }
        );
        const newToken = res.data.accessToken;
        setToken(newToken);
        processQueue(newToken);

        original.headers.Authorization = `Bearer ${newToken}`;
        return api(original);
      } catch {
        processQueue(null);
        clearToken();
        toast.error("Session expired. Please log in again.", {
          position: "top-right",
          autoClose: 2000,
          onClose: () => {
            window.location.href = "/login";
          },
        }
        );
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;