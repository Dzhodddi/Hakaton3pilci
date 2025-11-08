import axios from "axios";

export const AUTH_API_BASE = "http://localhost:3000";
export const PROMPT_API_BASE = "http://localhost:8000"

export const auth_api = axios.create({
    baseURL: AUTH_API_BASE,
    withCredentials: true,
});

export const prompt_api = axios.create({
    baseURL: PROMPT_API_BASE,
    withCredentials: true,
});