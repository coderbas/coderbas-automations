'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from '../../../../utils/axiosConfig';

export default function Dashboard() {
  const router = useRouter();
  const [profile, setProfile] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return router.push('/public/login');

    const headers = { Authorization: `Bearer ${token}` };

    Promise.all([
      axios.get('/auth/profile', { headers }),
      axios.get('/auth/analytics', { headers })
    ])
      .then(([profileRes, analyticsRes]) => {
        setProfile(profileRes.data);
        setAnalytics(analyticsRes.data);
        setLoading(false);
      })
      .catch(() => router.push('/public/login'));
  }, []);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 to-gray-800 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold">Hello, {profile.username}</h1>
          <p className="mt-2 text-gray-300">Here's your activity overview:</p>
        </header>

        {/* Analytics Cards */}
        <section className="grid gap-6 grid-cols-1 md:grid-cols-3 mb-12">
          <div className="bg-gray-700 rounded-lg p-6 shadow-lg">
            <h2 className="text-xl mb-2">Emails Generated</h2>
            <p className="text-3xl font-bold text-blue-400">
              {analytics.total_emails_last_30_days || 0}
            </p>
          </div>

          <div className="bg-gray-700 rounded-lg p-6 shadow-lg">
            <h2 className="text-xl mb-2">Active Sessions</h2>
            <p className="text-3xl font-bold text-green-400">12</p>
          </div>

          <div className="bg-gray-700 rounded-lg p-6 shadow-lg">
            <h2 className="text-xl mb-2">Performance Score</h2>
            <p className="text-3xl font-bold text-purple-400">95%</p>
          </div>
        </section>

        {/* Navigation */}
        <section className="grid gap-6 grid-cols-1 md:grid-cols-3">
          <a
            href="/authenticated/email-generator"
            className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:opacity-90 text-white rounded-lg p-6 shadow-lg text-center"
          >
            Generate Emails
          </a>
          <a
            href="/authenticated/workflows"
            className="bg-gradient-to-r from-green-500 to-teal-500 hover:opacity-90 text-white rounded-lg p-6 shadow-lg text-center"
          >
            Manage Workflows
          </a>
          <a
            href="/authenticated/chat"
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 text-white rounded-lg p-6 shadow-lg text-center"
          >
            Chat with AI
          </a>
        </section>
      </div>
    </div>
  );
}
