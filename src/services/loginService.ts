// I need create a new function called login to handle login request. This function will have the following signature:

import { LoginRequest, LoginResponse } from "../schemas";
import axiosClient from "./axiosClient";

// Function name: login
const login = async (loginData: LoginRequest): Promise<LoginResponse> => {
  if (loginData) {
    // call the login api
    const response: any = await axiosClient.post("/auth/login", {
      username: "emilys",
      password: "emilyspass",
    });

    return {
      accessToken: response.accessToken,
      user: {
        id: response.id,
        username: response.username,
        email: response.email,
        role: response.role,
      },
    };
  }
  return {
    accessToken: "",
    user: {
      id: 0,
      username: "",
      email: "",
      role: "",
    },
  };
};

export { login };
