import { ReactNode } from 'react';
import Navbar from '../components/Navbar';

interface MainLayoutProps {
    children: ReactNode;
}

function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Navbar */}
      <header className="bg-blue-600 text-white shadow">
        <div className="container mx-auto px-4 py-4">
          <Navbar />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-6">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-blue-600 text-white">
        <div className="container mx-auto px-4 py-4 text-center">
          ©
          {' '}
          {new Date().getFullYear()}
          {' '}
          My React App. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default MainLayout;
