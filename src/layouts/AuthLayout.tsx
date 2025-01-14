import { ReactNode } from 'react'

interface AuthLayoutProps {
	children: ReactNode
}

function AuthLayout({ children }: AuthLayoutProps) {
	return <div className="flex bg-gray-100">{children}</div>
}

export default AuthLayout
