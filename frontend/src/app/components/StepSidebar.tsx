'use client';

export default function StepSidebar({ onAddStep }) {
  const types = ['email', 'delay', 'notify', 'condition', 'loop'];

  return (
    <aside className="w-64 bg-white p-4 border-r shadow-lg">
      <h3 className="text-xl font-bold mb-6 text-blue-600">➕ Add Steps</h3>
      {types.map((type) => (
        <button
          key={type}
          onClick={() => onAddStep(type)}
          className="block w-full bg-gray-100 hover:bg-blue-100 rounded px-4 py-2 mb-3 text-left capitalize font-medium shadow-sm transition"
        >
          {type === 'condition' && '🧠'}
          {type === 'loop' && '🔁'}
          {type === 'email' && '📧'}
          {type === 'delay' && '⏱️'}
          {type === 'notify' && '🔔'} {type}
        </button>
      ))}
    </aside>
  );
}
