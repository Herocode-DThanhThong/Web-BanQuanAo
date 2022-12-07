import { ListResponse } from "../interfaces/index";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import jwt_decode from "jwt-decode";
import { Token, User } from "@/interfaces/index";

interface RefreshTokenResponse {
  user: User;
  accessToken: string;
}

const axiosInstance = axios.create({
  baseURL: process.env.BASE_URL,
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  async (config: AxiosRequestConfig) => {
    // Do something before request is sent

    // Get access Token from localStorage
    const accessToken = localStorage.getItem(process.env.TOKEN_NAME as string)
      ? JSON.parse(
          localStorage.getItem(process.env.TOKEN_NAME as string) as string
        )
      : null;

    // Attach token to headers
    if (config && config.headers && accessToken) {
      config.headers["Authorization"] = "Bearer " + accessToken;
    }

    // URL list don't refresh token
    const urlNoRefreshTokenList = [
      "/auth/register",
      "/auth/login",
      "/products",
    ];

    if (config.url && !urlNoRefreshTokenList.includes(config.url)) {
      const date = new Date();

      // AccessToken exist
      if (accessToken) {
        const decodedToken = jwt_decode<Token>(accessToken);

        // AccessToken expires
        if (decodedToken.exp < date.getTime() / 1000) {
          try {
            const { data } = await refreshToken();

            // Update accessToken to localStorage
            localStorage.setItem(
              process.env.TOKEN_NAME as string,
              JSON.stringify(data?.accessToken)
            );

            // Update token of headers when refresh token
            if (config && config.headers) {
              config.headers["Authorization"] = "Bearer " + data?.accessToken; // cập nhật lại token mới cho header
            }
          } catch (error) {
            // Refresh token expires
            // Remove accessToken
            //console.log(error);
            localStorage.removeItem(process.env.TOKEN_NAME as string);
          }
        }
      }
    }

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

const refreshToken = async (): Promise<ListResponse<RefreshTokenResponse>> => {
  const results = await axios.post(
    `${process.env.BASE_URL}/auth/accessToken`,
    {}, // Dùng phương thức post kết hợp với withCredentials thì phải đưa thêm cái data dô
    {
      withCredentials: true, // Vì khi call api thì có gắn cookie dô nên dùng đoạn code này để cho phép nó
    }
  );

  return {
    data: {
      user: results.data.data.user as User,
      accessToken: results.data.data.accessToken as string,
    },
    message: results.data.message as string,
  };
};

// Add a response interceptor
axiosInstance.interceptors.response.use(
  function (response: AxiosResponse) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data

    return response.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger

    return Promise.reject(error);
  }
);

export default axiosInstance;
