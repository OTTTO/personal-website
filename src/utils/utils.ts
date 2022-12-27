export function authenticationCheck() {
  const token = localStorage.getItem("token");
  if (token) {
    const decoded = parseJwt(token);
    console.log(decoded.exp * 1000);
    return decoded.exp * 1000 > new Date().getTime();
  }
  return false;
}

function parseJwt(token: string) {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace("-", "+").replace("_", "/");
  return JSON.parse(window.atob(base64));
}
