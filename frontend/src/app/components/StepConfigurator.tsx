'use client';
import { useEffect, useState } from 'react';

export default function StepConfigurator({ step, onClose, onSave }) {
  const [form, setForm] = useState(step.config || {});

  useEffect(() => {
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', esc);
    return () => window.removeEventListener('keydown', esc);
  }, [onClose]);

  const updateField = (key: string, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    onSave({ ...step, config: form });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6 relative">
        <h2 className="text-xl font-bold mb-4 capitalize">
          Configure {step.type} Step
        </h2>

        {step.type === 'email' && (
          <>
            <input
              type="text"
              placeholder="Subject"
              value={form.subject || ''}
              onChange={(e) => updateField('subject', e.target.value)}
              className="w-full border p-2 mb-2 rounded"
            />
            <textarea
              placeholder="Email Body"
              rows={4}
              value={form.body || ''}
              onChange={(e) => updateField('body', e.target.value)}
              className="w-full border p-2 mb-2 rounded"
            />
            <input
              type="email"
              placeholder="Recipient Email"
              value={form.to || ''}
              onChange={(e) => updateField('to', e.target.value)}
              className="w-full border p-2 rounded"
            />
          </>
        )}

        {step.type === 'delay' && (
          <input
            type="text"
            placeholder="e.g., 2 hours, 1 day"
            value={form.duration || ''}
            onChange={(e) => updateField('duration', e.target.value)}
            className="w-full border p-2 rounded"
          />
        )}

        {step.type === 'notify' && (
          <>
            <input
              type="text"
              placeholder="Notification message"
              value={form.message || ''}
              onChange={(e) => updateField('message', e.target.value)}
              className="w-full border p-2 mb-2 rounded"
            />
            <select
              value={form.channel || 'email'}
              onChange={(e) => updateField('channel', e.target.value)}
              className="w-full border p-2 rounded"
            >
              <option value="email">Email</option>
              <option value="sms">SMS</option>
              <option value="webhook">Webhook</option>
            </select>
          </>
        )}

        {step.type === 'condition' && (
          <input
            type="text"
            placeholder="If condition (e.g., user.age > 18)"
            value={form.condition || ''}
            onChange={(e) => updateField('condition', e.target.value)}
            className="w-full border p-2 rounded"
          />
        )}

        {step.type === 'loop' && (
          <input
            type="number"
            placeholder="Repeat count"
            value={form.loopCount || ''}
            onChange={(e) => updateField('loopCount', e.target.value)}
            className="w-full border p-2 rounded"
          />
        )}

        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
