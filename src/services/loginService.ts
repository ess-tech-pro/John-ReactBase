// I need create a new function called login to handle login request. This function will have the following signature:

import { LoginRequest, LoginResponse, LoginResponseSchema } from '../schemas';
import axiosClient from './axiosClient';

// Function name: login
const login = async (loginData: LoginRequest): Promise<LoginResponse> => {
  // call the login api
  console.log('loginData', loginData);
  const rep = await axiosClient.post('/auth/login', {
    username: 'emilys',
    password: 'emilyspass',
  });

  if (rep) {
    // Format the response data to match the schema
    const { accessToken, ...user } = rep;
    const dataValidate = {
      accessToken,
      user: {
        ...user,
      },
    };

    // validate the response
    const validatedData = LoginResponseSchema.validate(dataValidate, {
      abortEarly: false,
    });

    return validatedData;
  }

  throw new Error('Login failed');
};

export { login };
