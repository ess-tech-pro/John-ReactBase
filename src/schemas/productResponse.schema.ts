import * as yup from 'yup';

// Schema cho từng product
const ProductSchema = yup.object().shape({
  id: yup.number().required('ID is required'),
  thumbnail: yup.string().required('Thumbnail is required'),
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required'),
  price: yup.number().required('Price is required'),
});

// Schema cho create product response
export const CreateProductResponseSchema = yup.object().shape({
  id: yup.number().required('ID is required'),
  title: yup.string().required('Title is required'),
});

// Schema cho response
export const ProductResponseSchema = yup.object().shape({
  limit: yup.number().required('Limit is required'),
  skip: yup.number().required('Skip is required'),
  total: yup.number().required('Total is required'),
  products: yup.array().of(ProductSchema).required('Products are required'),
});

// Kiểu dữ liệu cho response
export type ProductResponse = yup.InferType<typeof ProductResponseSchema>;

export type CreateProductResponse = yup.InferType<typeof CreateProductResponseSchema>;
