'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from '../../../../utils/axiosConfig';

export default function Profile() {
  const [profile, setProfile] = useState<any>(null);
  const [message, setMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/public/login');
    } else {
      axios
        .get('/auth/profile', {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setProfile(res.data))
        .catch(() => router.push('/public/login'));
    }
  }, [router]);

  if (!profile) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
        <h1 className="text-3xl font-bold mb-4">Your Profile</h1>
        <p><strong>Username:</strong> {profile.username}</p>
        <p><strong>Email:</strong> {profile.email}</p>
        {/* Add more fields or update form */}
        {message && <p className="mt-4 text-green-600">{message}</p>}
      </div>
    </div>
  );
}
