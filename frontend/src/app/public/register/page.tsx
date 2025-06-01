'use client';
import { useState } from 'react';
import axios from '../../../../utils/axiosConfig';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/auth/register', { username, email, password });
      setMessage(res.data.message);
    } catch (error) {
      setMessage(error.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleRegister} className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-4">Register</h1>

        <label className="block mb-2 font-semibold">Username</label>
        <input
          type="text"
          className="border border-gray-300 rounded w-full p-2 mb-4"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label className="block mb-2 font-semibold">Email</label>
        <input
          type="email"
          className="border border-gray-300 rounded w-full p-2 mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="block mb-2 font-semibold">Password</label>
        <input
          type="password"
          className="border border-gray-300 rounded w-full p-2 mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          Register
        </button>

        {message && <p className="mt-4 text-red-500">{message}</p>}
      </form>
    </div>
  );
}
