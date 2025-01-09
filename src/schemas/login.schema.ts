import * as yup from "yup";

// I need to create a schema for the login request data using yup.
// The schema should have the following shape:
// - email: a required string
// - password: a required string
export const LoginRequestSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters long")
    .required("Password is required"),
});

export const LoginResponseSchema = yup.object().shape({
  accessToken: yup.string().required("Access token is required"),
  user: yup.object().shape({
    id: yup.number().required("ID is required"),
    username: yup.string().required("Username is required"),
    email: yup.string().required("Email is required"),
    role: yup.string().required("Role is required"),
  }),
});

export type LoginRequest = yup.InferType<typeof LoginRequestSchema>;
export type LoginResponse = yup.InferType<typeof LoginResponseSchema>;
