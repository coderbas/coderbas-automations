// components/Layout.js
import Link from 'next/link';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation/Header */}
      <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
        <nav className="max-w-6xl mx-auto flex items-center justify-between p-4">
          <div className="flex items-center space-x-6">
            <Link href="/dashboard" className="text-3xl font-bold hover:text-gray-200">
              BasitApp
            </Link>
            <Link href="/dashboard" className="text-lg hover:text-gray-200">
              Dashboard
            </Link>
            <Link href="/email-generator" className="text-lg hover:text-gray-200">
              Email Generator
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/profile" className="text-lg hover:text-gray-200">
              Profile
            </Link>
            <Link href="/logout" className="text-lg hover:text-gray-200">
              Logout
            </Link>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-grow bg-gray-50">
        <div className="max-w-6xl mx-auto p-8">{children}</div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white">
        <div className="max-w-6xl mx-auto p-4 text-center">
          © {new Date().getFullYear()} BasitApp. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
