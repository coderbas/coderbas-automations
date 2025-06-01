'use client';

import { FaEnvelope, FaClock, FaBell } from 'react-icons/fa';

export default function StepBlock({ step, index, onRemove }) {
  const icon = {
    email: <FaEnvelope />,
    delay: <FaClock />,
    notify: <FaBell />,
  }[step.type];

  return (
    <div className="bg-white border rounded p-4 shadow flex items-center justify-between mb-4">
      <div className="flex items-center gap-3">
        <span className="text-xl">{icon}</span>
        <div>
          <p className="font-semibold capitalize">{step.type} Step</p>
          <p className="text-sm text-gray-500">Step {index + 1}</p>
        </div>
      </div>
      <button
        onClick={() => onRemove(index)}
        className="text-red-500 font-bold hover:underline"
      >
        Remove
      </button>
    </div>
  );
}
