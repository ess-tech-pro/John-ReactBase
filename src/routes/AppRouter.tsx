import { useMemo, lazy, Suspense } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ROUTE_PATH } from '../constants/routing'
import MainLayout from '../layouts/MainLayout'
import AuthLayout from '../layouts/AuthLayout'

const Home = lazy(() => import('../pages/home'))
const Login = lazy(() => import('../pages/login'))

const routesConfig = [
	{
		path: ROUTE_PATH.HOME,
		layout: MainLayout,
		component: Home,
	},
	{
		path: ROUTE_PATH.REGISTER,
		layout: AuthLayout,
		component: () => <div>Register</div>,
	},
	{
		path: ROUTE_PATH.LOGIN,
		layout: AuthLayout,
		component: Login,
	},
]

const createAppRouter = () =>
	createBrowserRouter(
		routesConfig.map(({ path, layout: Layout, component: Component }) => ({
			path,
			element: (
				<Layout>
					<Suspense fallback={<div>Loading...</div>}>
						<Component />
					</Suspense>
				</Layout>
			),
		}))
	)

export function AppRouter() {
	const router = useMemo(() => createAppRouter(), [])

	return <RouterProvider router={router} />
}
