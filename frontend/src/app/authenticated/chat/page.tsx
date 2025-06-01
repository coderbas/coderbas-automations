'use client';

import { useState, useEffect } from 'react';
import axios from '../../../../utils/axiosConfig';
import { useRouter } from 'next/navigation';

export default function ChatWithAI() {
  const router = useRouter();
  const [messages, setMessages] = useState([{ role: 'system', content: 'You are a helpful assistant.' }]);
  const [input, setInput] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) router.push('/public/login');
  }, []);

  const sendMessage = async () => {
    const token = localStorage.getItem('token');
    const updatedMessages = [...messages, { role: 'user', content: input }];
    setMessages(updatedMessages);
    setInput('');

    try {
      const res = await axios.post('/ai/chat', { messages: updatedMessages }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessages([...updatedMessages, { role: 'assistant', content: res.data.response }]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-4">Chat with AI</h1>
      <div className="bg-gray-800 rounded-lg p-6 mb-4 h-96 overflow-y-auto">
        {messages.filter(m => m.role !== 'system').map((msg, idx) => (
          <div key={idx} className={`mb-2 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
            <span className="block px-4 py-2 rounded-lg inline-block"
              style={{ backgroundColor: msg.role === 'user' ? '#2563EB' : '#4B5563' }}>
              {msg.content}
            </span>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 p-2 rounded bg-gray-700"
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
}
