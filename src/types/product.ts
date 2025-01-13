// src/types.ts

// Interface cho Product
export interface Product {
	id: number
	title: string
	description: string
	price: number
	thumbnail: string
}

// Interface cho Cart
export interface Cart {
	id: number
	products: Product[]
	total: number
}

// Interface cho response khi gọi API sản phẩm
export interface ProductsResponse {
	products: Product[]
	total: number
}

// Interface cho response khi gọi API giỏ hàng
export interface CartsResponse {
	carts: Cart[]
	total: number
}
