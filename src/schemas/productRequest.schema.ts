import * as yup from "yup";

// Schema cho request
export const CreateProductRequestSchema = yup.object().shape({
  title: yup.string().required("Title is required").min(1, "Title must not be empty"),
});

// Kiểu dữ liệu cho request
export type CreateProductRequest = yup.InferType<typeof CreateProductRequestSchema>;
