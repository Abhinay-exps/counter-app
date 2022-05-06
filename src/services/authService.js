import http from "./httpService";
import jwtDecode from "jwt-decode";

const apiEndpoint = "/auth";

http.setJwt(getJwt());

export async function login(email, password) {
  const { data: jwt } = await http.post(apiEndpoint, { email, password });
  localStorage.setItem("token", jwt);
}
export function loginWithJwt(token) {
  localStorage.setItem("token", token);
}
export function logout() {
  localStorage.removeItem("token");
}
export function getJwt() {
  return localStorage.getItem("token");
}
export function getCurrentUser() {
  try {
    const token = localStorage.getItem("token");
    return jwtDecode(token);
  } catch (error) {
    return null;
  }
}

export default {
  login,
  loginWithJwt,
  getCurrentUser,
  getJwt,
  logout,
};
