import axios from 'axios';
// import * as yup from "yup";
// import { ProductRequestSchema, ProductResponseSchema } from "../schemas";

const axiosClient = axios.create({
  //   baseURL: process.env.REACT_APP_API_BASE_URL || "https://api.example.com",
  baseURL: 'https://dummyjson.com',

  timeout: 10000, // Thời gian timeout
});

// Request Interceptor: Thay đổi header hoặc validate data trước khi gửi
axiosClient.interceptors.request.use(
  async (config) => {
    // Thêm token vào header
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Nếu đây là request cần validate schema
    // if (config.data && config.url?.includes("/products")) {
    //     try {
    //         await ProductRequestSchema.validate(config.data, { abortEarly: false });
    //     } catch (error) {
    //         if (error instanceof yup.ValidationError) {
    //             throw new Error(`Request validation failed: ${error.errors.join(", ")}`);
    //         }
    //     }
    // }

    return config;
  },
  (error) => Promise.reject(error),
);

// Response Interceptor: Validate data trả về hoặc xử lý lỗi chung
axiosClient.interceptors.response.use(
  async (response) => response.data, // Chỉ trả về dữ liệu
  // if (response.config.url?.includes("/products")) {
  //     try {
  //         await ProductResponseSchema.validate(response.data, { abortEarly: false });
  //     } catch (error) {
  //         if (error instanceof yup.ValidationError) {
  //             throw new Error(`Response validation failed: ${error.errors.join(", ")}`);
  //         }
  //     }
  // }
  // (response.data), // Chỉ trả về dữ liệu
  (error) => {
    if (error.response) {
      // Xử lý lỗi HTTP cụ thể
      if (error.response.status === 401) {
        console.error('Unauthorized! Redirecting to login...');
        // Ví dụ: Redirect đến trang login
        window.location.href = '/login';
      } else if (error.response.status === 403) {
        console.error(
          "Forbidden! You don't have permission to access this resource.",
        );
      }
    } else if (error.request) {
      // Lỗi khi không nhận được phản hồi từ server
      console.error('No response from server!');
    } else {
      // Các lỗi khác
      console.error('Axios error:', error.message);
    }

    // throw error;
    return Promise.reject(error);
  },
);

export default axiosClient;
