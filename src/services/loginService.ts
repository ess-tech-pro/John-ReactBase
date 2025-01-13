import { LoginRequest, LoginResponse, LoginResponseSchema } from '../schemas'
import axiosClient from './axiosClient'

const login = async (loginData: LoginRequest): Promise<LoginResponse> => {
	console.log('loginData', loginData)
	const rep = await axiosClient.post('/auth/login', {
		username: 'emilys',
		password: 'emilyspass',
	})

	if (rep) {
		// Format the response data to match the schema
		const { accessToken, ...user } = rep
		const dataValidate = {
			accessToken,
			user: {
				...user,
			},
			error: '',
		}

		// validate the response
		const validatedData = LoginResponseSchema.validate(dataValidate, {
			abortEarly: false,
		})

		return validatedData
	}

	throw new Error('Login failed')
}

export { login }
