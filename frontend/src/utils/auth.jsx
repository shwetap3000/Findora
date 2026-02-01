export const getAccessToken = () => {
  return localStorage.getItem("accessToken");
};

export const isLoggedIn = () => {
  return !!localStorage.getItem("accessToken");
};

export const getUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};