import Cookies from "js-cookie";

const TokenKey = "token";

export function getToken() {
    var token = sessionStorage.getItem("token");

    return token;
}

export function setToken(token) {
    return sessionStorage.setItem("token", token);
}

export function removeToken() {
    return sessionStorage.removeItem("token");
}