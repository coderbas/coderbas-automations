'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from '../../../../utils/axiosConfig';

export default function AnalyticsPage() {
  const [analytics, setAnalytics] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/public/login');
    } else {
      axios.get('/analytics', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setAnalytics(res.data))
      .catch((err) => console.error(err));
    }
  }, [router]);

  if (!analytics) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading analytics...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white p-6 rounded shadow">
        <h1 className="text-3xl font-bold mb-4">Analytics Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 border rounded">
            <h2 className="text-xl font-semibold">Emails Generated (Last 30 Days)</h2>
            <p className="text-3xl font-bold text-blue-600">
              {analytics.total_emails_last_30_days}
            </p>
          </div>
          {/* Add additional stat cards here */}
        </div>
      </div>
    </div>
  );
}
