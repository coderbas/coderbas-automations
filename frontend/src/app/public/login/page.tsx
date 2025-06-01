'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Next.js 13 App Router
import axios from '../../../../utils/axiosConfig';     // Adjust path if needed

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post('/auth/login', { email, password });
      // Save token in localStorage (or cookies)
      localStorage.setItem('token', res.data.access_token);

      // Redirect to your new authenticated landing page
      router.push('/authenticated/dashboard');
    } catch (error: any) {
      setMessage(error.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded shadow-md w-full max-w-sm"
      >
        <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>

        <label className="block mb-2 font-semibold">Email</label>
        <input
          type="email"
          className="border border-gray-300 rounded w-full p-2 mb-4"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="block mb-2 font-semibold">Password</label>
        <input
          type="password"
          className="border border-gray-300 rounded w-full p-2 mb-4"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700 transition font-semibold"
        >
          Log In
        </button>

        {message && (
          <p className="mt-4 text-center text-red-500">{message}</p>
        )}
      </form>
    </div>
  );
}
