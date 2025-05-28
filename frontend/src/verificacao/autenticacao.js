import jwtDecode from "jwt-decode";

export function getToken() {
  return localStorage.getItem("token");
}

export function getUsuarioLogado() {
  const token = getToken();
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    return decoded;
  } catch (err) {
    return null;
  }
}

export function isLogado() {
  return !!getToken();
}