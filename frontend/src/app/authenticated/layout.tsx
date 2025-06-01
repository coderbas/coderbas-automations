// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "My App",
  description: "Your app description here",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* Header */}
        <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
          <nav className="max-w-6xl mx-auto flex items-center justify-between p-4">
            <div className="flex items-center space-x-6">
              <a href="/authenticated/dashboard" className="text-3xl font-bold hover:text-gray-200">
                Coderbas Automations
              </a>
              <a href="/authenticated/dashboard" className="text-lg hover:text-gray-200">
                Dashboard
              </a>
              <a href="/authenticated/email-generator" className="text-lg hover:text-gray-200">
                Email Generator
              </a>
            </div>
            <div className="flex items-center space-x-4">
              <a href="/authenticated/profile" className="text-lg hover:text-gray-200">
                Profile
              </a>
              <a href="/logout" className="text-lg hover:text-gray-200">
                Logout
              </a>
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
            © {new Date().getFullYear()} coderbas automations. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}
