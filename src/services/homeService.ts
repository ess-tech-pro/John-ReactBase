import * as yup from 'yup'
import {
	CreateProductRequest,
	CreateProductRequestSchema,
	CreateProductResponse,
	CreateProductResponseSchema,
	ProductResponse,
	ProductResponseSchema,
} from 'schemas'
import axiosClient from './axiosClient'

export const getProducts = async (): Promise<ProductResponse> => {
	try {
		const response = await axiosClient.get('/products')
		const validatedData = await ProductResponseSchema.validate(response, {
			abortEarly: false,
		})
		return validatedData
	} catch (error) {
		if (error instanceof yup.ValidationError) {
			console.error('Validation Errors:', error.errors) // Log danh sách lỗi
			throw new Error(`Validation failed: ${error.errors.join(', ')}`)
		}
		throw error // Ném lại lỗi khác (nếu không phải lỗi validate)
	}
}

export const createProduct = async (
	cartData: CreateProductRequest
): Promise<CreateProductResponse> => {
	try {
		// Validate dữ liệu trước khi gửi lên API
		await CreateProductRequestSchema.validate(cartData, { abortEarly: false }) // abortEarly=false để lấy tất cả lỗi

		// Gửi request với dữ liệu đã validate
		const response = await axiosClient.post('/products/add', cartData)

		// Validate dữ liệu trả về từ API
		const validatedData = await CreateProductResponseSchema.validate(response, {
			abortEarly: false,
		})

		// Trả về dữ liệu từ API
		return validatedData
	} catch (error) {
		if (error instanceof yup.ValidationError) {
			console.error('Validation Errors:', error.errors) // Log danh sách lỗi
			throw new Error(`Validation failed: ${error.errors.join(', ')}`)
		}
		throw error // Ném lại lỗi khác (nếu không phải lỗi validate)
	}
}
