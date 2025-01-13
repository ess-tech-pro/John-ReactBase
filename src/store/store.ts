import { configureStore } from '@reduxjs/toolkit'
import exampleReducer from './slices/exampleSlice'
import loginReducer from './slices/loginSlice'

export const store = configureStore({
	reducer: {
		example: exampleReducer,
		login: loginReducer,
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
