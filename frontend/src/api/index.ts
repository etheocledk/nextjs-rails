import axios from "axios";

import baseUrl from "./baseUrl";

const axiosInstance = axios.create({
    baseURL: baseUrl,
    timeout: 10000,
});

type ApiOptions = {
    data?: Object,
    method?: "get" | "post" | "patch" | "delete",
    params?: Object,
}

export const api = async (url: string, options: ApiOptions = {}) => {
    const { data, method = "get", params } = options;
    const accessToken = localStorage.getItem("accessToken");

    try {
        const response  = await axiosInstance.request({
            url,
            method,
            data,
            params,
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
            responseType: "json",
        });

        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message || "API request failed");
        } else {
            throw new Error("API request failed");
        }
    }
}

export default api;