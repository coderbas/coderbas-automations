// src/app/components/StepCard.tsx
'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { FaTrash, FaGripLines } from 'react-icons/fa';

export default function StepCard({ step, onClick, onDelete }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: step.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="relative bg-white border rounded-md shadow-md p-4 flex items-start group"
    >
      {/* Drag Handle */}
      <div
        {...listeners}
        {...attributes}
        className="cursor-grab pr-2 text-gray-400 hover:text-gray-600"
        title="Drag"
      >
        <FaGripLines />
      </div>

      {/* Main Click Area */}
      <div
        className="flex-1 cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          onClick(step);
        }}
      >
        <h4 className="text-lg font-semibold flex items-center gap-2">
          {getIcon(step.type)} {capitalize(step.type)}
        </h4>
        <p className="text-sm text-gray-500">
          {step.configured ? '✅ Configured' : '⚠️ Not configured'}
        </p>
      </div>

      {/* Delete Button */}
      <button
        className="absolute top-2 right-2 text-red-600 hover:text-red-800 z-10"
        onClick={(e) => {
          e.stopPropagation();
          onDelete(step.id);
        }}
        title="Delete step"
      >
        <FaTrash />
      </button>
    </div>
  );
}

function getIcon(type: string) {
  switch (type) {
    case 'email':
      return '📧';
    case 'delay':
      return '⏱️';
    case 'notify':
      return '🔔';
    case 'condition':
      return '🧠';
    case 'loop':
      return '🔁';
    default:
      return '❓';
  }
}

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
