// src/app/email-generator/page.tsx
'use client';

import React, { useState } from 'react';
import axios from '../../../../utils/axiosConfig';

export default function EmailGenerator() {
  const [topic, setTopic] = useState('');
  const [emailText, setEmailText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerateEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setEmailText('');
    try {
      const response = await axios.post('/ai/generate-email', { topic });
      setEmailText(response.data.email);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Error generating email.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-4">AI Email Generator</h1>
      <form onSubmit={handleGenerateEmail} className="w-full max-w-md bg-white p-6 rounded shadow">
        <input
          type="text"
          placeholder="Enter email topic..."
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="border p-2 mb-4 w-full"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          {loading ? 'Generating...' : 'Generate Email'}
        </button>
      </form>
      {error && <p className="mt-4 text-red-500">{error}</p>}
      {emailText && (
        <div className="mt-6 w-full max-w-md bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Generated Email:</h2>
          <p>{emailText}</p>
        </div>
      )}
    </div>
  );
}
