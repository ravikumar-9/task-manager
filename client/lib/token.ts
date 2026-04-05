let accessToken: string | null = null;

export const setToken = (token: string) => {
  localStorage.setItem("accessToken", token);
};

export const getToken = () => {
  if (!accessToken) {
    accessToken = localStorage.getItem("accessToken");
  }
  return accessToken;
};

export const clearToken = () => {
  accessToken = null;
  localStorage.removeItem("accessToken");
};